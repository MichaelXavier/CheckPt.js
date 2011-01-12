//--------------- MediaCollection model ---------------
window.MediaCollection = Backbone.Model.extend({
  //In the current backbone HEAD, you can do this:
  //defaults: function() { return {items: []};},

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
  }
});
