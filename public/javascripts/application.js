//TODO: recursive toJSON for toplevel, will clean up view immensely
$(function() {
  //================ VIEWS =================
  window.CheckPtView = Backbone.View.extend({
    render: function() {
      $(this.el).html(this.template(this.collection.toJSON()));
      var media_collections_el = $(this.el).children('.media_collections');
      this.collection.forEach(function(media_collection) {
        new MediaCollectionView({
          model: media_collection,
          el:    media_collections_el
        }).render();
      });
      return this;
    },

    el: $('#app'),

    template: _.template($('#checkpt_template').html())
  });

  // el is the parent container for media collections
  window.MediaCollectionView = Backbone.View.extend({
    render: function() {
      var media_collection_el = $(this.template(this.model.toJSON()));
      this.model.get('items').forEach(function(media_item) {
        new MediaItemView({
          model: media_item,
          el:    media_collection_el.children('.media_items')
        }).render();
      });
      $(this.el).append(media_collection_el);
      return this;
    },

    className: 'media_collection',

    template: _.template($('#media_collection_template').html())
  });

  // el is the parent container for media_items
  window.MediaItemView = Backbone.View.extend({
    render: function(options) {
      $(this.el).append(this.template(this.model.toJSON()));
      return this;
    },

    className: 'media_item',

    template: _.template($('#media_item_template').html())
  });

  //================ CORE MODELS =================
  //--------------- MediaItem model ---------------
  window.MediaItem = Backbone.Model.extend({
    initialize: function(attrs) {
      if (!this.get('completed'))    this.set({'completed': false});
      if (!this.get('completed_on')) this.set({'completed_on': null});
    },

    validate: function(attrs) {
      if (!this.get('name')) return "Name required";
    },

    complete: function(when) {
      this.set({'completed': true})
      if (when) this.set({'completed_on': when});
    },

    incomplete: function(when) {
      this.set({'completed': false, 'completed_on': null});
    }
  });

  //--------------- MediaItemCollection collection ---------------
  window.MediaItemCollection = Backbone.Collection.extend({
    model: MediaItem,
    initialize: function(media_item_attrs) {
      this.models = media_item_attrs.map(function(item_attrs) {
        return new MediaItem(item_attrs);
      });
    }
  });

  //--------------- MediaCollection model ---------------
  window.MediaCollection = Backbone.Model.extend({
    //In the current backbone HEAD, you can do this:
    //defaults: function() { return {items: []};},

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
  });

  //--------------- CheckPt collection ---------------
  window.CheckPt = Backbone.Collection.extend({
    model: MediaCollection,
    url: '/checkpt',
    // Evidently I cannot use the default because response returns an array of strings
    parse: function(json_strings) {
      return json_strings.map(function(j) {
        var json = JSON.parse(j);
        json.items = new MediaItemCollection(json.items);
        return json;
      });
    }
    // FIXME: calling Backbone.Collection.prototype.toJSON.call(this)
    // returns undefined :(
  });

  //--------------- App Setup ---------------
  window.App = new CheckPtView({collection: new CheckPt()});

  App.collection.bind('refresh', function() {
    App.render();
  });

  App.collection.fetch();
});
