// el is the parent container for media_items
window.MediaItemView = Backbone.View.extend({
  initialize: function() {
    this.model.view = this;
  },

  render: function(container) {
    this.el = $(this.template(this.model.toJSON()));
    this.delegateEvents();//FIXME: events are doublefiring for some reason
    $(container).append(this.el);
    return this;
  },

  events: {
    'complete'   : 'complete',
    'incomplete' : 'incomplete',
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
  }
});
