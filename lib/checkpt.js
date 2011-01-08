var Backbone        = require('backbone')
    MediaCollection = require('./media_collection'),
    inspect = require('sys').inspect,
    db = require('riak-js').getClient();

// Hook up Riak backend
Backbone.sync = function(method, collection, success, error) {
  console.log("SYNC CALLED WITH ARGS " + inspect(arguments));
  if (method == 'read') {
    db.getAll(collection.model.bucket, function(err, results) {
      if (err) {
        error(err);
      } else {
        var temp = results.map(function(r) { return r.data; })
        console.log("TEMP: " + inspect(temp));
        success(temp);
      }
    });
  } else {
    console.log("FAIL");
    error();//TODO: more handlers
  }
}

var CheckPt = Backbone.Collection.extend({
  model: MediaCollection,
  parse: function(response) {
    console.log("PARSE CALLED WITH " + inspect(response));
    //MXDEBUG: am i supposed to refresh here, seems like it should
    //automatically deserialize the json in the array
    //MXDEBUG: error handling
    //this.refresh(response);
    return response.map(function(r) { 
      return response.map(function(r) { 
        var obj = JSON.parse(r); 
        obj.items = new MediaItemCollection(obj.items);
        return obj;
      });
    });
  }
});

module.exports = CheckPt;
