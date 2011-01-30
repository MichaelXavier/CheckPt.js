var express         = require('express'),
    app             = module.exports = express.createServer(),
    argv            = require('optimist').argv,
    fs              = require('fs'),
    backends        = require('./lib/backends'),
    inspect         = require('sys').inspect,//FOR DEBUGGING
    backend         = require('./lib/backends').json;


// Configuration

app.configure(function(){
  app.use(express.bodyDecoder());
  app.use(express.methodOverride());
  app.use(express.compiler({ src: __dirname + '/public', enable: ['sass'] }));
  app.use(express.logger());
  app.use(app.router);
  app.use(express.staticProvider(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.set('root', 'development.html');
  var dataset = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  app.set('bucket', new backends.JsonBucket(dataset));
  // For riak
  //app.set('bucket', 'media_collections_development');
});

app.configure('production', function(){
  app.use(express.errorHandler());
  app.set('root', 'index.html');
  app.set('bucket', 'media_collections');
});

// Routes

// Index (loading page
//TODO: see if theres a faster way to do this
app.get('/', function(req, res){
  res.redirect(app.set('root'));
});

// Get all media collections
//TODO: catch parse errors. is there a way to validate json?
app.get('/checkpt', function(req, res){
  backend.getAll(app.set('bucket'), function(err, results) {
    if (err) {
      res.send('EXPLOSIONS! ' + err, 500);
    } else {
      res.send(results);
    }
  });
});

// Get a single MediaCollection
app.get('/media_collections/:id', function(req, res){
  backend.get(app.set('bucket'), req.params.id, function(err, val) {
    if (err) {
      res.send('EXPLOSIONS! ' + err, 500);
    } else {
      res.send(val);
    }
  });
})

// Create a MediaCollection
app.post('/media_collections', function(req, res){
  backend.create(app.set('bucket'), req.body, function(err, key) {
    if (err) {
      res.send('EXPLOSIONS! ' + err, 500);
    } else {
      res.send(key + '');// return it in the body as str, assign it to the model in the view
    }
  });
});

// Update a MediaCollection
app.put('/media_collections/:id', function(req, res){
  backend.update(app.set('bucket'), req.params.id, JSON.stringify(req.body), function(err) {
    if (err) {
      res.send('EXPLOSIONS! ' + err, 500);
    } else {
      res.send(200);
    }
  });
});

// Delete a MediaCollection
app.delete('/media_collections/:id', function(req, res){
  backend.delete(app.set('bucket'),  req.params.id, function(err) {
    if (err) {
      res.send('EXPLOSIONS! ' + err, 500);
    } else {
      res.send(200);
    }
  });
});

//FIXME: for debugging purposes
app.get('/debug/delete_all', function(req, res) {
  backend.truncate(app.set('bucket'), function(err) {
    if (err) {
      res.send('EXPLOSIONS! ' + err, 500);
    } else {
      res.send(200);
    }
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(argv.p || 3000);
  console.log("CheckPt server listening on port %d", app.address().port)
}
