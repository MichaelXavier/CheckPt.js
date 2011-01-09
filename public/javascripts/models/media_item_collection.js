//--------------- MediaItemCollection collection ---------------
window.MediaItemCollection = Backbone.Collection.extend({
  model: MediaItem,
  initialize: function(media_item_attrs) {
    this.models = media_item_attrs.map(function(item_attrs) {
      return new MediaItem(item_attrs);
    });
  }
});
