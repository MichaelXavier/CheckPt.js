//--------------- MediaCollection model ---------------
window.MediaCollection = Backbone.Model.extend({
  //In the current backbone HEAD, you can do this:
  //defaults: function() { return {items: []};},
  //TODO: if you dynamically set the items attr, bind probably won't work

  initialize: function(attrs) {//FIXME: not positive 1st arg is right...
    var media_collection = this;
    attrs.items.bind('change', function() {
      media_collection.trigger('change');
    });
    this.bind_events();
  },

  validate: function(attrs) {
    if (!this.get('name')) return "Name required";
  },

  progress: function() {
    var rem = this.remaining_list(),
				com = this.completed_list();
    return com.length == 0 ? 0.0 : com.length / (com.length + rem.length);
  },

  remaining_list: function() {
    return this.get('items').filter(function(i) {return !i.get('completed');});
  },

  completed_list: function() {
    return this.get('items').filter(function(i) {return i.get('completed');});
  },

  add: function(item) {
    this.get('items').add(item);
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
          //debugger;//MXDEBUG
          console.log("Failed to save media collection" + resp);//TODO: UI
        }
      });
    });
  }
});
