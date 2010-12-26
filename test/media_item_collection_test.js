var assert              = require('assert'),
    MediaItem           = require('../lib/media_item')
    MediaItemCollection = require('../lib/media_item_collection');

function buildCollection() {
  this.collection = new MediaItemCollection([]);
}

module.exports = {
  'add - instantiates MediaItems from attrs': function() {
    buildCollection.apply(this);
    this.collection.add({name: "Episode 1"});
    assert.eql("Episode 1", this.collection.at(0).get('name'));
  },

  'add - takes pre-made MediaItems too': function() {
    buildCollection.apply(this);
    this.collection.add(new MediaItem({name: "Episode 1"}));
    assert.eql("Episode 1", this.collection.at(0).get('name'));
  }
};
