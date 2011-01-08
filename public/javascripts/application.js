$(function() {
  //================ VIEWS =================
  window.CheckPtView = Backbone.View.extend({
    render: function() {
      //This is gross, figure out a better place to put this
      //$(this.el);
      //$(this.el).html('Collection: ' + JSON.stringify(this.collection));//FIXME
      $(this.el).html(Mustache.to_html(this.template, this.collection))
      return this;
    },

    el: $('#app'),

    template: '<ul>{{#models}}' +
                '<li>{{#toJSON}}' +
                  '{{name}}\n' +
                  '<ol>{{#items}}' +
                    '<li>{{name}}</li>' +
                  '{{/items}}</ol>' +
                '{{/toJSON}}</li>' +
              '{{/models}}</ul>'
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
    model: MediaItem
  });

  //--------------- MediaCollection model ---------------
  window.MediaCollection = Backbone.Model.extend({
      //In the current backbone HEAD, you can do this:
      //defaults: function() { return {items: []};},
      initialize: function(media_collections) {
        if (!this.get('items')) this.set({'items': new MediaItemCollection([])});
      },

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
    });

  //--------------- CheckPt collection ---------------
  window.CheckPt = Backbone.Collection.extend({
    model: MediaCollection,
    url: '/checkpt'
    /*parse: function(response) {
      //FIXME
      console.log("PARSE CALLED WITH " + JSON.stringify(response));
    }*/
  });

  //--------------- App Setup ---------------
  //window.App = new CheckPtView();

  // Lets go!
  //DEBUG: useless delay for testing purposes
  /*
  setTimeout(function() {
    App.render();
  }, 1000)
  */
});
