window.NewMediaItemView = Backbone.View.extend({
  render: function(container) {
    this.el = $(this.template());
    var collection = this.collection;
    this.el.submit(function() {
      var mi = new MediaItem(serializeForm($(this)))
      collection.add(mi);
      $(this).remove(); //The form is no longer needed
      return false;
    });

    $(container).find('.new_media_item:first').html(this.el);
    $(this.el).find(':input:first').focus();
  },

  template: _.template($('#new_media_item_form_template').html())
});
