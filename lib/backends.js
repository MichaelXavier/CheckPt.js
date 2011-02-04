var db   = require('riak-js').getClient(),
    path = require('path'),
    inspect = require('sys').inspect,
    fs   = require('fs');

//Callbacks always take err and result

var riakBackend = {
  // Calllback receives err and an array of results (with keys merged in)
  getAll: function(bucket, cb) {
    db.getAll(bucket, function(err, results) {
      var records = results.map(function(r) {
        // Merge key in as the ID if it isn't already
        if (!r.data.id) r.data.id = r.meta.key;
        return r.data;
      });
      cb(err, records);
    });
  },

  get: function(bucket, key, cb) {
    db.get(bucket, key, cb);
  },

  //Callback receives err and key
  create: function(bucket, val, cb) {
    db.save(bucket, null, val, function(err, record, meta) {
      cb(err, meta.key);
    });
  },

  // Callback receives err
  update: function(bucket, key, val, cb) {
    db.save(bucket, key, val, function(err, result) {
      cb(err);
    });
  },

  delete: function(bucket, key, cb) {
    db.remove(bucket, key, cb);
  },

  // Callback receives err
  truncate: function(bucket, cb) {
    db.keys(bucket, function(err, keys) {
      if (err) {
        cb(err);
      } else {
        keys.forEach(function(k) { db.remove(bucket, k)});
        // Don't really want to bother with tracking events to do this cb the right way
        cb(null);
      }
    });
  }
};

var jsonBackend = {
  getAll: function(bucket, cb) {
    cb(null, bucket.dataset);
  },
  get: function(bucket, key, cb) {
    var pair = lookupRecord(bucket, key);
    if (pair[1]) {
      cb(null, pair[1]);
    } else {
      cb("Could not find record with key " + key, null);
    }
  },
  create: function(bucket, val, cb) {
    var key = bucket.key;
    val.id = key;
    bucket.dataset.push(val);
    bucket.flush();
    bucket.incrementKey();
    cb(null, key);
  },
  update: function(bucket, key, val, cb) {
    var pair = lookupRecord(bucket, key);
    if (pair[1]) {
      bucket.dataset[pair[0]] = val;
      bucket.flush();
      cb(null);
    } else {
      cb("Could not find record with key " + key);
    }
  },
  delete: function(bucket, key, cb) {
    var pair = lookupRecord(bucket, key);
    if (pair[1]) {
      delete bucket.dataset[pair[0]];
      bucket.flush();
      cb(null);
    } else {
      cb("Could not find record with key " + key);
    }
  },
  truncate: function(bucket, cb) {
    bucket.dataset = [];
    bucket.flush();
    cb(null);
  }
};

function lastKey(dataset) {
  if (dataset.length > 0) {
    dataset[dataset.length - 1].id;
  } else {
    return 0;
  }
}

// Returns a pair with the index as the first element, record as the second
// Returns [null, null] otherwise
function lookupRecord(bucket, key) {
  var dataset = bucket.dataset;
  for(var i = 0; i < dataset.length; i++) {
    if (dataset[i].id == key) return [i, dataset[i]];
  }
  return [null, null];
}


function JsonBucket(dataset, file) {
  this.dataset = dataset;
  this.file    = file;
  this.key     = lastKey(this.dataset) + 1;

  this.incrementKey = function() {
    return ++this.key;
  };

  // Async
  //TODO: trap exit and flush
  this.flush = function() {
    fs.writeFile(this.file, JSON.stringify(this.dataset), function(err) {
      if (err) throw err;
    });
  };
}

module.exports = {
  riak: riakBackend,
  json: jsonBackend,
  // Usage: backends.createJsonBucket("appdata.json", function(bucket) {})
  JsonBucket: JsonBucket
};
