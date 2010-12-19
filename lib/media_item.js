function MediaItem(n) {
  return {
    name: n,
    completed:false,
    completed_on:null,
    complete: function(when) {
      this.completed = true;
      if (when) this.completed_on = when;
    },
    incomplete: function(when) {
      this.completed = false;
      this.completed_on = null;
    }
  };
}

module.exports = MediaItem;
