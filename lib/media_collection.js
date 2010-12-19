function MediaCollection(n) {
  // Returns parittioned items, first completed, second incomplete
  function partition() {
    return this.items.reduce(function(acc, i) {
      acc[i.completed ? 0 : 1 ].push(i);
      return acc;
    }, [[], []]);
  };

  return {
    name: n,
    items: [],
    progress: function() {
      var is = partition.apply(this);
      return is[0].length == 0 ? 0.0 : is[0].length / (is[0].length + is[1].length);
    },
    remaining_list: function() {
      return partition.apply(this)[1];
    },
    completed_list: function() {
      return partition.apply(this)[0];
    }
  };
}

module.exports = MediaCollection;
