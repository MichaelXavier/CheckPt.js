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
