var Backbone            = require('backbone')
    MediaItemCollection = require('./media_item_collection');

function partition() {
  return this.get('items').reduce(function(acc, i) {
    acc[i.get('completed') ? 0 : 1 ].push(i);
    return acc;
  }, [[], []]);
}

var MediaCollection = Backbone.Model.extend({
  //In the current backbone HEAD, you can do this:
  //defaults: function() { return {items: []};},
  initialize: function(attrs) {
    if (!this.get('items')) this.set({'items': new MediaItemCollection([])});
  },

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
  }
});

module.exports = MediaCollection;
