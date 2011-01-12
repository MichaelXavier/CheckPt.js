//--------------- MediaItemCollection collection ---------------
window.MediaItemCollection = Backbone.Collection.extend({
  model: MediaItem,
  initialize: function(media_item_attrs) {
		this.bind_events();
  },

  bind_events: function() {
    this.bind('change', function() {
			alert('change detected in MIC');
			this.view.trigger('change');
    });
  }
});
