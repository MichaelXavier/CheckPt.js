//--------------- MediaItemCollection collection ---------------
window.MediaItemCollection = Backbone.Collection.extend({
  model: MediaItem,
  initialize: function(media_item_attrs) {
		this.bind_events();
  },

  bind_events: function() {
    // Delegate remove as a change event to trigger an update on the server
    this.bind('remove', function() {this.trigger("change");});
    this.bind('change', function() {
			this.view.trigger('change');
    });
  }
});
