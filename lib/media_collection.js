var Backbone = require('backbone');

function partition() {
  return this.get('items').reduce(function(acc, i) {
    acc[i.completed ? 0 : 1 ].push(i);
    return acc;
  }, [[], []]);
}

var MediaCollection = Backbone.Model.extend({
  //In the current backbone HEAD, you can do this:
  //defaults: function() { return {items: []};},
  initialize: function(attrs) {
    if (!this.get('items')) this.set({'items': []});
  },

  validate: function(attrs) {
    if (!this.get('name')) return "Name required";
  },

  progress: function() {
    var is = partition.apply(this);
    return is[0].length == 0 ? 0.0 : is[0].length / (is[0].length + is[1].length);
  },

  push: function(item) {
    var cur = this.get('items');
    cur.push(item);
    this.set({items: cur});
    return item;
  },

  remaining_list: function() {
    return partition.apply(this)[1];
  },

  completed_list: function() {
    return partition.apply(this)[0];
  }
});

module.exports = MediaCollection;
