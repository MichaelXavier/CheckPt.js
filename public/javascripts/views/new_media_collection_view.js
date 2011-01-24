window.NewMediaCollectionView = Backbone.View.extend({
  render: function() {
    this.el = $(this.template());

    //prepend before where the form goes
    $('#new_media_collection').before(this.el);

    var rendered_form = $(this.form_template()),
        callback      = this.response_callback;
    this.el.click(function() {
      rendered_form.submit(function(event) {
        // Add a media collection to the app, which should save
        var mc = App.collection.create(serializeForm($(event.target)), {
          error: callback,
          success: callback
        });
        $(this).remove(); //The form is no longer needed
        return false;
      });
      $('#new_media_collection').html(rendered_form);
      $(rendered_form).find(':input:first').focus();
    });
  },

  template: _.template($('#new_media_collection_template').html()),
  form_template: _.template($('#new_media_collection_form_template').html()),

  //FIXME: this is wrong but sync is coming back as erroneous
  response_callback: function(model, response) {
    if (response.status == 200) {
      //Response body will be the DB key
      //FIXME: for some reason if I don't do both, the record is still
      //considered new
      model.attributes.id = response.responseText;
      model.id = response.responseText;
      new MediaCollectionView({model: model}).render($('#app'));
    }
  }
});
