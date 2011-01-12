// el is the parent container for media_items
window.MediaItemView = Backbone.View.extend({
  initialize: function() {
    this.model.view = this;
  },

  render: function(container) {
    this.el = $(this.template(this.model.toJSON()));
    this.delegateEvents();
    this.bind_events();
    $(container).append(this.el);
    return this;
  },

  events: {
    'dblclick'   : 'toggleComplete'
  },

  className: 'media_item',

  template: _.template($('#media_item_template').html()),

  complete: function() {
    this.model.complete(new Date());
    this.el.addClass('completed_media_item');
  },

  incomplete: function() {
    this.model.incomplete();
    this.el.removeClass('completed_media_item');
  },
  
  toggleComplete: function() {
    if(this.model.get('completed')) {
      this.incomplete();
    } else {
      this.complete();
    }
  },

  bind_events: function() {
    this.bind('complete', this.complete);
    this.bind('incomplete', this.incomplete);
  }
});
