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
    var attrs = {'completed': true};
    if (when) attrs['completed_on'] = when;
    console.log('COMPLETE CALLED WITH' + JSON.stringify(attrs));//MXDEBUG
    this.set(attrs);
  },

  incomplete: function() {
    this.set({'completed': false, 'completed_on': null});
  }
});
