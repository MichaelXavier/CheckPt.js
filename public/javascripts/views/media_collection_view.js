// el is the parent container for media collections
window.MediaCollectionView = Backbone.View.extend({
  render: function() {
    var media_collection_el = $(this.template(this.model.toJSON()));
    this.model.get('items').forEach(function(media_item) {
      new MediaItemView({
        model:     media_item
      }).render(media_collection_el.children('.media_items'));
    });
    $(this.el).append(media_collection_el);
    return this;
  },

  className: 'media_collection',

  template: _.template($('#media_collection_template').html())
});
