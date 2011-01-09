// el is the parent container for media_items
window.MediaItemView = Backbone.View.extend({
  render: function(options) {
    $(this.el).append(this.template(this.model.toJSON()));
    return this;
  },

  className: 'media_item',

  template: _.template($('#media_item_template').html())
});
