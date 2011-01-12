window.MediaCollectionView = Backbone.View.extend({
  render: function(container) {
		this.el = $(this.template(this.model.toJSON()));
		this.model.view = this;
		var items = this.model.get('items');
		items.view = this;
		var view_el = this.el;// for passing into the forEach scope
    items.forEach(function(media_item) {
      new MediaItemView({model: media_item}).
				render(view_el.children('.media_items'));
    });
    $(container).append(this.el);
		this.bind('change', this.change);//FIXME: WHYYYY wont delegateEvents work?
    return this;
  },

	events: {
		'change': 'update_progress_bar'
	},

  className: 'media_collection',

  template: _.template($('#media_collection_template').html()),

	update_progress_bar: function() {
		alert('change detected in MC view');
		alert(this.model.progress());//TODO: update a progress bar
	}
});
