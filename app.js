var express         = require('express'),
    app             = module.exports = express.createServer(),
    argv            = require('optimist').argv,
    inspect         = require('sys').inspect,
    MediaCollection = require('./lib/media_collection'),
    MediaItem       = require('./lib/media_item'),
    router          = require('./lib/router'),
    CheckPt         = require('./lib/checkpt'),
    db = require('riak-js').getClient();//FIXME

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
  db.getAll(MediaCollection.bucket, function(err, results) {
    if (err) {
      res.send('EXPLOSIONS! ' + err);
    } else {
      res.render('index', {locals: {checkpt: JSON.stringify(results.map(function(r) { return r.data; }))}});
    }
  });
});

app.get('/:id', function(req, res){
  db.get(MediaCollection.bucket, req.params.id, function(err, val) {
    if (err) { 
      res.send('EXPLOSIONS! ' + err);
    } else {
      res.render('show', {locals: {media_collection: val}});
    }
  });
})

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(argv.p || 3000);
  console.log("Express server listening on port %d", app.address().port)
}
