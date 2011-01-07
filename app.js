var express         = require('express'),
    app             = module.exports = express.createServer(),
    argv            = require('optimist').argv,
    sys             = require('sys'),
    MediaCollection = require('./lib/media_collection'),
    MediaItem       = require('./lib/media_item'),
    router          = require('./lib/router'),
    CheckPt         = require('./lib/checkpt');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['sass'] }));
  app.use(express.logger());
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
  //FIXME: dummy for testing
  /*
  var mc = new MediaCollection({name: 'MC NAME'});
  mc.add(new MediaItem({name: 'Episode 1', completed: true}));
  mc.add(new MediaItem({name: 'Episode 2', completed: false}));
  */
  var cp = new CheckPt();
  cp.all(function(err, mcs) {
    //console.log("MCS: (" + typeof(mcs) + ") " + sys.inspect(mcs));//MXDEBUG
    //console.log("ITEMS: (" + typeof(mcs) + ") " + sys.inspect(mcs));//MXDEBUG

    console.log("MCS: (" + typeof(mcs.models) + ") " + JSON.stringify(mcs['0']));//MXDEBUG
    if (err) {
      //TODO: flash
      console.log("EXPLOSIONS! " + JSON.stringify(err));
    } else {
      res.render('index', {locals: {media_collections: mcs.models}});
    }
  });
});

// REST
/*
router.rest(app, 'media_collections', MediaCollection);
router.rest(app, 'media_items', MediaItem);
*/


// Only listen on $ node app.js

if (!module.parent) {
  app.listen(argv.p || 3000);
  console.log("Express server listening on port %d", app.address().port)
}
