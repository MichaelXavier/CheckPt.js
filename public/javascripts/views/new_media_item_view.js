window.NewMediaItemView = Backbone.View.extend({
  render: function(container) {
    this.el = $(this.template());
    this.el.submit(function(event) {
      var mi = new MediaItem(serializeForm($(event.target)));
      this.collection.add(mi);
      event.preventDefault();//FIXME: redundancy makes me sad, also doesn't work
      return false;
    });

    $(container).find('.new_media_item:first').html(this.el);
  },

  template: _.template($('#new_media_item_form_template').html())
});
