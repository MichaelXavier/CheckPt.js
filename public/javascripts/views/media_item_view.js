// el is the parent container for media_items
window.MediaItemView = Backbone.View.extend({
  initialize: function() {
    this.model.view = this;
    this.model.bind('complete', function() {this.view.trigger('complete')}); //MXDEBUG: must be a better way to delegate
    if (!window.debug_mi) window.debug_mi = this.model;//MXDEBUG
  },

  render: function(container) {
    this.el = $(this.template(this.model.toJSON()));
    if (!window.debug_el) window.debug_el = this.el;//MXDEBUG
    $(container).append(this.el);
    return this;
  },

  events: {
    'click h3' : 'completeCallback',
    'complete' : 'completeCallback'
    //'dblclick' : 'complete'
  },

  className: 'media_item',

  template: _.template($('#media_item_template').html()),

  completeCallback: function() {
    alert('KABLAM');
    this.model.complete(new Date());
  }
});
