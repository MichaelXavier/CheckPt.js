//TODO: recursive toJSON for toplevel, will clean up view immensely
$(function() {
  //--------------- App Setup ---------------
  window.App = new CheckPtView({collection: new CheckPt()});

  App.collection.bind('refresh', function() {
    App.render();
  });

  App.collection.fetch();
});
