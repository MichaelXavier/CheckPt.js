var Backbone        = require('backbone')
    MediaCollection = require('./media_collection'),
    RiakSync        = require('./riak_sync');

// Hook up Riak backend
Backbone.sync = RiakSync.sync;

var CheckPt = Backbone.Collection.extend({
  model: MediaCollection, 
  all: function(cb) { RiakSync.all(MediaCollection, cb); } //FIXME: just going to hardcode this for now
});

module.exports = CheckPt;
