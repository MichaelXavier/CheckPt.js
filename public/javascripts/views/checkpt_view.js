window.CheckPtView = Backbone.View.extend({
  render: function() {
    $(this.el).html(this.template(this.collection.toJSON()));
    var media_collections_el = $(this.el).children('.media_collections');
    this.collection.forEach(function(media_collection) {
      new MediaCollectionView({
        model: media_collection,
        el:    media_collections_el
      }).render();
    });
    return this;
  },

  el: $('#app'),

  template: _.template($('#checkpt_template').html())
});
