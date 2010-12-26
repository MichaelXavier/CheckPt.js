var assert          = require('assert'),
    MediaCollection = require('../lib/media_collection');

function buildCollection() {
  this.collection = new MediaCollection({'name': "Curb Your Enthusiasm"});
}

module.exports = {
  'constructor - sets name': function() {
    buildCollection.apply(this);
    assert.eql("Curb Your Enthusiasm", this.collection.get('name'));
  },

  'constructor - defaults empty items': function() {
    buildCollection.apply(this);
    assert.eql(0, this.collection.get('items').length);
  },

  'progress - is 0.0 on empty list': function() {
    buildCollection.apply(this);
    assert.eql(0.0, this.collection.progress());
  },

  'progress - returns the ratio of completed to incomplete': function() {
    buildCollection.apply(this);
    //Push some mock MediaItems
    this.collection.add({completed:false});
    this.collection.add({completed:true});
    this.collection.add({completed:true});
    assert.eql(2/3, this.collection.progress());
  },

  'remaining_list - returns empty list on empty collection': function() {
    buildCollection.apply(this);
    assert.eql(0, this.collection.remaining_list().length);
  },

  'remaining_list - returns only the incomplete items': function() {
    buildCollection.apply(this);
    //Push some mock MediaItems
    this.collection.add({completed:false});
    this.collection.add({completed:true});
    this.collection.add({completed:true});
    var remaining = this.collection.remaining_list();
    assert.eql(1, remaining.length);
    assert.eql(false, remaining[0].get('completed'));
  },

  'completed_list - returns empty list on empty collection': function() {
    buildCollection.apply(this);
    assert.eql(0, this.collection.completed_list().length);
  },

  'completed_list - returns only the incomplete items': function() {
    buildCollection.apply(this);
    //Push some mock MediaItems
    this.collection.add({completed:false});
    this.collection.add({completed:true});
    this.collection.add({completed:true});
    var completed = this.collection.completed_list();
    assert.eql(2, completed.length);
    assert.eql(true, completed.every(function(i) { 
      return i.get('completed');
    }));
  }
};
