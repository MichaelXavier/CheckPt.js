window.NewMediaItemView = Backbone.View.extend({
  render: function(container) {
    $(container).find('.new_media_item:first').html(this.template());
  },

  template: _.template($('#new_media_item_form_template').html())
});
