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
		var self = this;// for passing into the forEach scope
    items.forEach(function(media_item) {
      self.add(media_item);
    });
    $(container).append(this.el);

    var current_media_collection = this.el,
        model = this.model;
    this.el.find('.add_item:first').click(function() {
      new NewMediaItemView({collection: model}).render(current_media_collection);
    });

    this.bind_events();
    this.display_icons();

    return this;
  },

  add: function(media_item) {
    new MediaItemView({model: media_item}).
      render(this.el.children('.media_items'));
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

  //TODO: figure out how to have private methods local to the context of this model
  //TODO: refactor this
  display_icons: function() {
    var opts = Icons.x;
    this.el.find('.x_icon:empty').each(function() {
      Raphael(this, opts[0], opts[1]).path(opts[2]).attr(opts[3]);
    });
  },

  bind_events: function() {
		this.bind('change', this.update_progress_bar);
    this.bind_delete();
  },

  bind_delete: function() {
    //To smuggle the model into the closure, FIXME: i think call can preven
    //this nonsense
    var model = this.model, el = this.el;
    this.el.find('.ribbon .delete_button').click(function() {
      model.destroy();
      //Looks like delete doesn't conform to backbone's standard with just a
      //200. Just act like it succeeded for now
      el.remove();
    });
  },

  progress: function() {return this.model.progress() * 100;}
});
