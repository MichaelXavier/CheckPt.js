window.CheckPtView = Backbone.View.extend({
  render: function() {
    $(this.el).html(this.template(this.collection.toJSON()));

    // Set up collections
    var media_collections_el = $(this.el).children('.media_collections');
		var view_el = this.el;// for passing into the forEach scope
    this.collection.forEach(function(media_collection) {
      new MediaCollectionView({model: media_collection}).render(view_el);
    });

    //Set up new media collection form button
    new NewMediaCollectionView().render();

    return this;
  },

  el: $('#app'),

  template: _.template($('#checkpt_template').html()),

  error: function(message) {
    new ErrorView().render(message);
  }
});
