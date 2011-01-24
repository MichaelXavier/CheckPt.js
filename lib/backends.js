var db = require('riak-js').getClient(),
    fs = require('fs');

//Callbacks always take err and result

var riakBackend = {
  getAll: function(bucket, cb) {
    db.getAll(bucket, cb);
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

//TODO
//var jsonBackend = {
//};

module.exports = {
  riak: riakBackend,
  //json: jsonBackend,
  // Usage: new JsonBucket("appdata.json")
  JsonBucket: function(file) {
    this.dataset = [];
    this.file = file;
  }
};
