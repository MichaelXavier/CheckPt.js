window.NewMediaCollectionView = Backbone.View.extend({
  render: function() {
    this.el = $(this.template());

    //prepend before where the form goes
    $('#new_media_collection').before(this.el);

    //TODO: i think this will continually re-render a blank form every time the
    //element is clicked, which is what we want
    var rendered_form = $(this.form_template());
    this.el.click(function() {
      $('#new_media_collection').html(rendered_form);
    });
  },

  template: _.template($('#new_media_collection_template').html()),
  form_template: _.template($('#new_media_collection_form_template').html())
});
