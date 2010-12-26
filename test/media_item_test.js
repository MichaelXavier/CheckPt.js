var assert    = require('assert'),
    MediaItem = require('../lib/media_item');

function buildItem() {
  this.item = new MediaItem({'name': 'Episode 1'});
}

// TODO: dry out when setup/teardown hooks implemented in expresso
module.exports = {
  // constructor tests
  'constructor - sets name': function() {
    buildItem.apply(this);
    assert.eql("Episode 1", this.item.get('name'));
  },
  'constructor - defaults to incomplete': function() {
    buildItem.apply(this);
    assert.eql(false, this.item.get('completed'));
  },
  'constructor - defaults compled_on to null': function() {
    buildItem.apply(this);
    assert.eql(null, this.item.get('completed_on'));
  },

  // complete tests
  'complete - marks as complete': function() {
    buildItem.apply(this);
    this.item.complete();
    assert.eql(true, this.item.get('completed'));
  },

  'complete - marks the time': function() {
    buildItem.apply(this);
    var when = new Date('Dec 19, 2010');
    this.item.complete(when);
    assert.eql(when, this.item.get('completed_on'));
  },

  'incomplete - marks as incomplete': function() {
    buildItem.apply(this);
    this.item.complete(new Date());
    this.item.incomplete();
    assert.eql(false, this.item.get('completed'));
  },

  'incomplete - clears the time': function(t) {
    buildItem.apply(this);
    this.item.complete(new Date());
    this.item.incomplete();
    assert.eql(null, this.item.get('completed_on'));
  }
};
