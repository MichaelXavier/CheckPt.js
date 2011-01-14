//--------------- CheckPt collection ---------------
window.CheckPt = Backbone.Collection.extend({
  model: MediaCollection,
  url: '/checkpt',

  parse: function(collections) {
    return collections.map(function(raw_coll) {
      raw_coll.items = new MediaItemCollection(raw_coll.items);
      return raw_coll;
    });
  }
  // FIXME: calling Backbone.Collection.prototype.toJSON.call(this)
  // returns undefined :(
});

