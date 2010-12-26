var Backbone  = require('backbone')
    MediaItem = require('./media_item');

var MediaItemCollection = Backbone.Collection.extend({model: MediaItem});

module.exports = MediaItemCollection;
