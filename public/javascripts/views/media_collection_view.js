window.MediaCollectionView = Backbone.View.extend({
  //TODO: break this up
  //TODO: i think i can use find instead of children here
  render: function(container) {
		this.el = $(this.template(this.model.toJSON()));
    this.progress_bar = this.el.children('.ui-progressbar');
    this.progress_bar.progressbar({value: this.progress()});
		this.model.view = this;
		var items = this.model.get('items');
		items.view = this;
		var view_el = this.el;// for passing into the forEach scope
    items.forEach(function(media_item) {
      new MediaItemView({model: media_item}).
				render(view_el.children('.media_items'));
    });
    $(container).append(this.el);
		this.bind('change', this.update_progress_bar);
    return this;
  },

  className: 'media_collection',

  template: _.template($('#media_collection_template').html()),

  //TODO: flip colors of the triangles (left always, right if 100%
	update_progress_bar: function() {
    this.progress_bar.progressbar('value', this.progress());
	},

  progress: function() {return this.model.progress() * 100;}
});
