//--------------- CheckPt collection ---------------
window.CheckPt = Backbone.Collection.extend({
  model: MediaCollection,
  url: '/checkpt',
  // Evidently I cannot use the default because response returns an array of strings
  parse: function(json_strings) {
    return json_strings.map(function(j) {
      var json = JSON.parse(j);
      json.items = new MediaItemCollection(json.items);
      return json;
    });
  }
  // FIXME: calling Backbone.Collection.prototype.toJSON.call(this)
  // returns undefined :(
});

