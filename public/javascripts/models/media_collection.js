//--------------- MediaCollection model ---------------
window.MediaCollection = Backbone.Model.extend({
  //In the current backbone HEAD, you can do this:
  //defaults: function() { return {items: []};},
  //TODO: if you dynamically set the items attr, bind probably won't work

  initialize: function(attrs) {//FIXME: not positive 1st arg is right...
    if (!this.attributes.items) this.attributes.items = new MediaItemCollection();
    var media_collection = this;
    this.attributes.items.bind('change', function() {
      media_collection.trigger('change');
    });
    this.bind_events();
  },

  validate: function(attrs) {
    if (!this.attributes.name) return "Name required";
  },

  progress: function() {
    var rem = this.remaining_list(),
				com = this.completed_list();
    return com.length == 0 ? 0.0 : com.length / (com.length + rem.length);
  },

  completed: function() {
    return this.remaining_list().length == 0;
  },

  remaining_list: function() {
    return this.attributes.items.filter(function(i) {return !i.attributes.completed;});
  },

  completed_list: function() {
    return this.attributes.items.filter(function(i) {return i.attributes.completed;});
  },

  add: function(item) {
    this.attributes.items.add(item);
    this.trigger('change');
    if (this.view) this.view.add(item);
  },

  url: function() {
    var id = this.attributes.id
    return id ? '/media_collections/' + id : '/media_collections';
  },

  bind_events: function() {
    this.bind('change', function() {
      //FIXME: not sure if I can pass the options hash to the first one, probably not
      this.save(null, {
        success: function(model, resp) {
          console.log("Successfully saved media collection");//TODO: UI
        },

        error: function(model, resp) {
          console.log("Failed to save media collection" + resp);//TODO: UI
        }
      });
    });
  }
});
