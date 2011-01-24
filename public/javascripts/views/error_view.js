window.ErrorView = Backbone.View.extend({
  render: function(message) {
    this.el = $(this.template({message: message}));
    $(this.id).append(this.el);

    this.bind_events();
    this.display_icons();
    return this;
  },

  id: '#errors',

  template: _.template($('#error_template').html()),

  display_icons: function() {
    var opts = Icons.x;
    this.el.find('.x_icon').each(function() {
      Raphael(this, opts[0], opts[1]).path(opts[2]).attr(opts[3]);
    });

    opts = Icons.error;
    this.el.find('.error_icon').each(function() {
      Raphael(this, opts[0], opts[1]).path(opts[2]).attr(opts[3]);
    });
  },

  bind_events: function() {
    this.bind_delete();
  },

  bind_delete: function() {
    var self = this;
    this.el.find('.delete_button').click(function() {
      self.remove();
    });
  }
});
