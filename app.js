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

// Get all MediaCollections (CheckPt)
app.get('/', function(req, res){
  db.getAll(MediaCollection.bucket, function(err, results) {
    if (err) {
      res.send('EXPLOSIONS! ' + err, 500);
    } else {
      res.render('index', {locals: {checkpt: JSON.stringify(results.map(function(r) { return r.data; }))}});
    }
  });
});

app.get('/checkpt', function(req, res){
  db.getAll(MediaCollection.bucket, function(err, results) {
    if (err) {
      res.send('EXPLOSIONS! ' + err, 500);
    } else {
      res.send(JSON.stringify(results.map(function(r) { return r.data; })));
    }
  });
});

// Get a single MediaCollection
app.get('/checkpt/:id', function(req, res){
  db.get(MediaCollection.bucket, req.params.id, function(err, val) {
    if (err) {
      res.send('EXPLOSIONS! ' + err, 500);
    } else {
      //FIXME: 404?
      res.render('show', {locals: {media_collection: val}});
    }
  });
})

// Create a MediaCollection
//FIXME: make sure ui sends it in data so random post vars don't get included in the serialized model
//FIXME: this will be an ajax response with the key as the body, handle accordingly in the UI
app.post('/', function(req, res){
  db.save(MediaCollection.bucket, null, req.params.data, function(err, _, meta) {
    if (err) {
      res.send('EXPLOSIONS! ' + err, 500);
    } else {
      res.send(meta.key);
    }
  });
});

// Update a MediaCollection
//FIXME: for the time being this will just overwrite the key
app.put('/:id', function(req, res){
  db.save(MediaCollection.bucket, params.id, req.params.data, function(err) {
    if (err) {
      res.send('EXPLOSIONS! ' + err, 500);
    } else {
      res.send(200);
    }
  });
});

//FIXME: for debugging purposes
app.get('/debug/delete_all', function(req, res) {
  db.keys(MediaCollection.bucket, function(err, keys) {
    keys.forEach(function(k) {db.remove(MediaCollection.bucket, k)});
    res.send(200);
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(argv.p || 3000);
  console.log("Express server listening on port %d", app.address().port)
}
