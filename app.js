var express         = require('express'),
    app             = module.exports = express.createServer(),
    argv            = require('optimist').argv,
    MediaCollection = require('./lib/media_collection'),
    MediaItem       = require('./lib/media_item'),
    router          = require('./lib/router');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'haml');
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
  var mc = new MediaCollection({name: 'MC NAME'});
  mc.push(new MediaItem({name: 'Episode 1', completed: true}));
  mc.push(new MediaItem({name: 'Episode 2', completed: false}));
  res.render('index', {locals: {media_collections: [mc]}});
});

// REST
router.rest(app, 'media_collections', MediaCollection);
router.rest(app, 'media_items', MediaItem);


// Only listen on $ node app.js

if (!module.parent) {
  app.listen(argv.p || 3000);
  console.log("Express server listening on port %d", app.address().port)
}