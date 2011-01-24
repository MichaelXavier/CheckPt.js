//TODO: recursive toJSON for toplevel, will clean up view immensely
$(function() {
  //--------------- App Setup ---------------
  window.App = new CheckPtView({collection: new CheckPt()});

  App.collection.bind('refresh', function() {
    App.render();
  });

  App.collection.fetch({
    error: function() {
      App.error("Could not load CheckPt data. Please try again later.");
      App.el.html("");
    }
  });

  //Icons
  //TODO: figure out to color icons with CSS
  window.Icons = {
    check: [32, 32, 'm 2.379,14.729 4.829,-4.83 5.75,5.749 10.919,-10.915 4.83,4.828 -15.749,15.747',
            {fill: "#FFFFFF", stroke:'none'}],
    x: [32, 32, 'm 24.778,17.419 -3.502,-3.502 3.501,-3.502 -4.828,-4.83 -3.502,3.502 -3.502,-3.502 -4.828,4.83 3.501,3.502 -3.502,3.502 4.83,4.829 3.501,-3.502 3.501,3.502',
            {fill: "#FFFFFF", stroke:'none'}],
    info: [32, 32, 'M16,1.466C7.973,1.466,1.466,7.973,1.466,16c0,8.027,6.507,14.534,14.534,14.534c8.027,0,14.534-6.507,14.534-14.534C30.534,7.973,24.027,1.466,16,1.466z M14.757,8h2.42v2.574h-2.42V8z M18.762,23.622H16.1c-1.034,0-1.475-0.44-1.475-1.496v-6.865c0-0.33-0.176-0.484-0.484-0.484h-0.88V12.4h2.662c1.035,0,1.474,0.462,1.474,1.496v6.887c0,0.309,0.176,0.484,0.484,0.484h0.88V23.622z',
            {fill: "#FFFFFF", stroke:'none'}],
    error: [32, 32, 'M29.225,23.567l-3.778-6.542c-1.139-1.972-3.002-5.2-4.141-7.172l-3.778-6.542c-1.14-1.973-3.003-1.973-4.142,0L9.609,9.853c-1.139,1.972-3.003,5.201-4.142,7.172L1.69,23.567c-1.139,1.974-0.207,3.587,2.071,3.587h23.391C29.432,27.154,30.363,25.541,29.225,23.567zM16.536,24.58h-2.241v-2.151h2.241V24.58zM16.428,20.844h-2.023l-0.201-9.204h2.407L16.428,20.844z',
            {fill: "#FFFFFF", stroke:'none'}]
  };

  $('.info_icon').each(function() { renderIcon(this, Icons.info); });
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
