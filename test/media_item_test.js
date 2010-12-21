var testCase  = require('nodeunit').testCase,
    MediaItem = require('../lib/media_item');

module.exports = {
  'constructor': testCase({
    setUp: function(cb) {
      this.item = new MediaItem({'name': 'Episode 1'});
    },

    'sets name': function(t) {
      t.expect(1);
      t.equals("Episode 1", this.item.get('name'));
      t.done();
    },
    'defaults to incomplete': function(t) {
      t.expect(1);
      t.equals(false, this.item.get('completed'));
      t.done();
    },
    'defaults compled_on to null': function(t) {
      t.expect(1);
      t.equals(null, this.item.get('completed_on'));
      t.done();
    },
  }),

  'complete': testCase({
    setUp: function(cb) {
      this.item = new MediaItem({'name': 'Episode 1'});
      cb();
    },

    'marks as complete': function(t) {
      t.expect(1);
      this.item.complete();
      t.equals(true, this.item.get('completed'));
      t.done();
    },

    'marks the time': function(t) {
      t.expect(1);
      var when = new Date('Dec 19, 2010');
      this.item.complete(when);
      t.equals(when, this.item.get('completed_on'));
      t.done();
    }
  }),

  'incomplete': testCase({
    setUp: function(cb) {
      this.item = new MediaItem({'name': 'Episode 1'});
      this.item.complete(new Date());
      cb();
    },

    'marks as incomplete': function(t) {
      t.expect(1);
      this.item.incomplete();
      t.equals(false, this.item.get('completed'));
      t.done();
    },

    'clears the time': function(t) {
      t.expect(1);
      this.item.incomplete();
      t.equals(null, this.item.get('completed_on'));
      t.done();
    }
  })
};
