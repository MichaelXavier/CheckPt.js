window.NewMediaCollectionView = Backbone.View.extend({
  render: function() {
    this.el = $(this.template());

    //prepend before where the form goes
    $('#new_media_collection').before(this.el);

    var rendered_form = $(this.form_template());
    this.el.click(function() {
      //FIXME: this is refreshing the page. STOP IT
      rendered_form.submit(function(event) {
        // Add a media collection to the app, which should save
        var mc = App.collection.create(serializeForm($(event.target)));
        new MediaCollectionView({model: mc}).render($('#app'));
        $(this).remove(); //The form is no longer needed
        return false;
      });
      $('#new_media_collection').html(rendered_form);
      $(rendered_form).find(':input:first').focus();
    });
  },

  template: _.template($('#new_media_collection_template').html()),
  form_template: _.template($('#new_media_collection_form_template').html())
});
