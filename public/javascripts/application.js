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
    check: [32, 32, 'm 2.379,14.729 4.829,-4.83 5.75,5.749 10.919,-10.915 4.83,4.828 -15.749,15.747',
            {fill: "#BADA55", stroke:'none'}],
    x: [32, 32, 'm 24.778,17.419 -3.502,-3.502 3.501,-3.502 -4.828,-4.83 -3.502,3.502 -3.502,-3.502 -4.828,4.83 3.501,3.502 -3.502,3.502 4.83,4.829 3.501,-3.502 3.501,3.502',
            {fill: "#BADA55", stroke:'none'}]

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
