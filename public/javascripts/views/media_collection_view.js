window.MediaCollectionView = Backbone.View.extend({
  //TODO: break this up
  //TODO: i think i can use find instead of children here
  render: function(container) {
		this.el = $(this.template(this.model.attributes));
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

    var current_media_collection = this.el;
    this.el.find('.add_item:first').click(function() {
      new NewMediaItemView().render(current_media_collection);
    });

    return this;
  },

  className: 'media_collection',

  template: _.template($('#media_collection_template').html()),

	update_progress_bar: function() {
    var progress = this.progress();
    //Fill left/right triangles
    if (progress > 0) {
      this.el.find('.triangle-l').addClass('triangle-l-complete');
    } else {
      this.el.find('.triangle-l').removeClass('triangle-l-complete');
    }

    if (progress >= 100) {
      this.el.children('.triangle-r').addClass('triangle-r-complete');
    } else {
      this.el.find('.triangle-r').removeClass('triangle-r-complete');
    }

    this.progress_bar.progressbar('value', progress);
	},

  progress: function() {return this.model.progress() * 100;}
});