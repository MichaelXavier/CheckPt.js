// el is the parent container for media_items
window.MediaItemView = Backbone.View.extend({
  initialize: function() {
    this.model.view = this;
  },

  render: function(container) {
    this.el = $(this.template(this.model.toJSON()));
    this.container = container;
    this.delegateEvents();
    this.bind_events();
    this.update_status();
    this.display_icons();
    $(container).append(this.el);
    return this;
  },

  events: {
    'dblclick'   : 'toggle_complete'
  },

  className: 'media_item',

  template: _.template($('#media_item_template').html()),

  complete: function() {
    this.model.complete(new Date());
    this.el.addClass('completed_media_item');
    this.update_status();
  },

  incomplete: function() {
    this.model.incomplete();
    this.el.removeClass('completed_media_item');
    this.update_status();
  },

  toggle_complete: function() {
    if (this.model.get('completed')) {
      this.incomplete();
    } else {
      this.complete();
    }
  },

  update_status: function() {
    if (this.model.get('completed')) {
      this.el.find('.complete_status').show();
      this.el.find('.incomplete_status').hide();
    } else {
      this.el.find('.complete_status').hide();
      this.el.find('.incomplete_status').show();
    }
  },

  //TODO: figure out how to have private methods local to the context of this model
  //TODO: refactor this
  display_icons: function() {
    var opts = Icons.check;
    this.el.find('.check_icon').each(function() { 
      Raphael(this, opts[0], opts[1]).path(opts[2]).attr(opts[3]); 
    });
    opts = Icons.x;
    this.el.find('.x_icon').each(function() {
      Raphael(this, opts[0], opts[1]).path(opts[2]).attr(opts[3]); 
    });
  },

  bind_events: function() {
    this.bind('complete', this.complete);
    this.bind('incomplete', this.incomplete);
  }
});
