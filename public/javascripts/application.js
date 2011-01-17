//TODO: recursive toJSON for toplevel, will clean up view immensely
$(function() {
  //--------------- App Setup ---------------
  window.App = new CheckPtView({collection: new CheckPt()});

  App.collection.bind('refresh', function() {
    App.render();
  });

  App.collection.fetch();

  //Icons
  window.Icons = {
    check: [32, 32, 'M2.379,14.729 5.208,11.899 12.958,19.648 25.877,6.733 28.707,9.561 12.958,25.308',
            {fill: "#BADA55", stroke: "none"}],
    x: [32, 32, 'M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248',
            {fill: "#BADA55", stroke: "none"}]

  };
});

function serializeForm($form) {
  return _.reduce($form.find(':input'), function(acc, el) { 
    acc[el.name] = el.value;
    return acc;
  }, {});
}

//FIXME: bind live on when these elements enter the page?
function renderIcon(element, opts) {
  Raphael(element, opts[0], opts[1]).path(opts[2]).attr(opts[3]);
}

function debug_renderIcons() {
  $('.check_icon').each(function() { renderIcon(this, Icons.check); });
  $('.x_icon').each(function() { renderIcon(this, Icons.x); });
}
