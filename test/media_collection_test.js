var testCase        = require('nodeunit').testCase,
    MediaCollection = require('../lib/media_collection');

function buildCollection(cb) {
  this.collection = new MediaCollection({'name': "Curb Your Enthusiasm"});
  cb();
}

function deleteCollection(cb) {
  this.collection = null;
  cb();
}

//TODO: dry up setup
module.exports = {
  'constructor': testCase({
    setUp: function(cb) {
      this.collection = new MediaCollection({'name': "Curb Your Enthusiasm"});
      cb();
    },

    'sets name': function(t) {
      t.expect(1);
      t.equals("Curb Your Enthusiasm", this.collection.get('name'));
      t.done();
    },

    'defaults empty items': function(t) {
      t.expect(1);
      t.equals(0, this.collection.get('items').length);
      t.done();
    },

    tearDown: function(cb) {
      this.collection = null;
      cb();
    }
  }),
  'progress': testCase({
    setUp: function(cb) {
      this.collection = new MediaCollection({'name': "Curb Your Enthusiasm"});
      cb();
    },

    'is 0.0 on empty list': function(t) {
      t.expect(1);
      t.equals(0.0, this.collection.progress());
      t.done();
    },

    'returns the ratio of completed to incomplete': function(t) {
      t.expect(1);
      //Push some mock MediaItems
      this.collection.push({completed:false});
      this.collection.push({completed:true});
      this.collection.push({completed:true});
      t.equals(2/3, this.collection.progress());
      t.done();
    },

    tearDown: function(cb) {
      this.collection = null;
      cb();
    }
  }),

  'remaining_list': testCase({
    setUp: function(cb) {
      this.collection = new MediaCollection({'name': "Curb Your Enthusiasm"});
      cb();
    },

    'returns empty list on empty collection': function(t) {
      t.expect(1);
      t.equals(0, this.collection.remaining_list().length);
      t.done();
    },

    'returns only the incomplete items': function(t) {
      t.expect(2);
      //Push some mock MediaItems
      this.collection.push({completed:false});
      this.collection.push({completed:true});
      this.collection.push({completed:true});
      var remaining = this.collection.remaining_list();
      t.equals(1, remaining.length);
      t.equals(false, remaining[0].completed);
      t.done();
    },

    tearDown: function(cb) {
      this.collection = null;
      cb();
    }
  }),

  'completed_list': testCase({
    setUp: function(cb) {
      this.collection = new MediaCollection({'name': "Curb Your Enthusiasm"});
      cb();
    },
    'returns empty list on empty collection': function(t) {
      t.expect(1);
      t.equals(0, this.collection.completed_list().length);
      t.done();
    },
    'returns only the incomplete items': function(t) {
      t.expect(2);
      //Push some mock MediaItems
      this.collection.push({completed:false});
      this.collection.push({completed:true});
      this.collection.push({completed:true});
      var completed = this.collection.completed_list();
      t.equals(2, completed.length);
      t.equals(true, completed.every(function(i) { return i.completed; }));
      t.done();
    }
  })
};
