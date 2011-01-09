//--------------- MediaCollection model ---------------
window.MediaCollection = Backbone.Model.extend({
  //In the current backbone HEAD, you can do this:
  //defaults: function() { return {items: []};},

  validate: function(attrs) {
    if (!this.get('name')) return "Name required";
  },

  progress: function() {
    var is = partition.apply(this);
    return is[0].length == 0 ? 0.0 : is[0].length / (is[0].length + is[1].length);
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
