var db = require('riak-js').getClient();

function getBucket(record) {
  return record.__proto__.constructor.bucket;
}

function saveRecord(record, success, failure) {
  db.save(getBucket(record),
          record.isNew() ? null : record.id,
          {contentType: 'application/json'},
          function(err) { console.log("SAVE: " + err); err ? success() : failure() });//MXDEBUG
}

var RiakSync = {
  all: function(collection_klass, cb) {
    db.getAll(collection_klass.bucket, function(err, results) {
      if (!err) {
        results = new collection_klass(results.map(function(r) { return r.data; }));
      }
      cb(err, results);
    });
  },
  //FIXME: not sure if the callbacks should get arguments
  sync: function(method, model, success, failure) {
    console.log("SAVING " + JSON.stringify(model));//MXDEBUG
    switch(method) {
      case 'create':
      case 'update':
        saveRecord(model, success, failure);
        break;
      case 'delete':
        console.log('DELTE FIXME figure out what its passing based on optional id: ' + JSON.stringify(model));
        failure();
        break;
      case 'read':
        console.log('READ FIXME figure out what its passing based on optional id: ' + JSON.stringify(model));
        db.getAll()
        //success({name:'foo'});//MXDEBUG
        //failure();
        break;//MXDEBUG
      default:
        consolelog('unsupported method ' + JSON.stringify(method));
    };
  }
};

module.exports = RiakSync;
