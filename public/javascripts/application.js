//TODO: recursive toJSON for toplevel, will clean up view immensely
//TODO: move parse stuff into initializer I think so it doesn't have to do a live fetch to recursively parse
$(function() {
  //================ VIEWS =================
  window.CheckPtView = Backbone.View.extend({
    render: function() {
      $(this.el).html(this.template(this.collection.toJSON()));
      return this;
    },

    el: $('#app'),


    template: _.template($('#checkpt-template').html())
  });

  window.MediaCollectionView = Backbone.View.extend({
    render: function(options) {
    },

    className: 'media_collection'
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
        json.items = new MediaItemCollection(json.items.map(function(item_attrs) { return new MediaItem(item_attrs); }));
        return json;
      });
    }
  });

  //--------------- App Setup ---------------
  window.App = new CheckPtView({collection: new CheckPt()});
  App.collection.fetch({
    success: function(collection, resp) {
      App.render();
    },
    error: function(collection, resp) {
      alert('Failed to fetch app: ' + JSON.stringify(resp));
    }
  });
});
