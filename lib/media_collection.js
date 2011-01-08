var Backbone            = require('backbone')
    inspect = require('sys').inspect,
    MediaItemCollection = require('./media_item_collection');

function partition() {
  return this.get('items').reduce(function(acc, i) {
    acc[i.get('completed') ? 0 : 1 ].push(i);
    return acc;
  }, [[], []]);
}

//TODO: load id on deserialization
var MediaCollection = Backbone.Model.extend(
  // Instance Properties
  {
    //In the current backbone HEAD, you can do this:
    //defaults: function() { return {items: []};},
    /*initialize: function(media_collections) {
      //I have no idea how any of this works
    },*/

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

    //MXDEBUG: this is supposed to be the default behavior already I think
    /*parse: function(response) {
      return JSON.parse(response);
    }*/
  },
  // Class properties
  { bucket: 'media_collections'}
);

module.exports = MediaCollection;
