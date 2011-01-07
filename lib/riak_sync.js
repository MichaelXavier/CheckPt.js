var db = require('riak-js').getClient();
    //sys = require('sys'),//MXDEBUG
//var    CheckPt = require('./lib/checkpt');//MXDEBUG

//console.log('CheckPt in riak_sync.js: ' + require('sys').inspect(CheckPt));

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
      //console.log("CHECKPT, HOW DOES IT WORK? " + sys.inspect(CheckPt));
      //var ret = new CheckPt();//MXDEBUG: I want to do this dynamically, but i don't think it works that way
      var ret = null;
      if (!err) {
        //console.log('COLLECTION KLASS ' + sys.inspect(collection_klass));
        //MXDEBUG: figure out how to get it to not deserialize on load
        console.log('results (' + typeof(results)  + '): ' + JSON.stringify(results));//MXDEBUG
        ret = results.map(function(r) { return r.data});//MXDEBUG
        //results = new collection_klass(results.map(function(r) { return r.data; }));
      }
      cb(err, ret);
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
