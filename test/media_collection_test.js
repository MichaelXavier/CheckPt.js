var testCase        = require('nodeunit').testCase,
    MediaCollection = require('../lib/media_collection');

module.exports = {
  'constructor': testCase({
    'sets name': function(t) {
      t.expect(1);
      t.equals("Curb Your Enthusiasm", MediaCollection("Curb Your Enthusiasm").name);
      t.done();
    },
    'defaults empty items': function(t) {
      t.expect(1);
      t.equals(0, MediaCollection("x").items.length);
      t.done();
    },
    'progress': testCase({
      setUp: function(cb) {
        this.collection = MediaCollection("x");
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
        this.collection.items.push({completed:false});
        this.collection.items.push({completed:true});
        this.collection.items.push({completed:true});
        t.equals(2/3, this.collection.progress());
        t.done();
      },
    }),
    'remaining_list': testCase({
      setUp: function(cb) {
        this.collection = MediaCollection("x");
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
        this.collection.items.push({completed:false});
        this.collection.items.push({completed:true});
        this.collection.items.push({completed:true});
        var remaining = this.collection.remaining_list();
        t.equals(1, remaining.length);
        t.equals(false, remaining[0].completed);
        t.done();
      }
    }),
    'completed_list': testCase({
      setUp: function(cb) {
        this.collection = MediaCollection("x");
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
        this.collection.items.push({completed:false});
        this.collection.items.push({completed:true});
        this.collection.items.push({completed:true});
        var completed = this.collection.completed_list();
        t.equals(2, completed.length);
        t.equals(true, completed.every(function(i) { return i.completed; }));
        t.done();
      }
    }),
  })
};
