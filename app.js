var express         = require('express'),
    app             = module.exports = express.createServer(),
    argv            = require('optimist').argv,
    inspect         = require('sys').inspect,
    MediaCollection = require('./lib/media_collection'),
    CheckPt         = require('./lib/checkpt'),
    db              = require('riak-js').getClient();//FIXME

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

// Index (loading page
app.get('/', function(req, res){
  res.render('index');
});

// Get all media collections
//TODO: catch parse errors. is there a way to validate json?
app.get('/checkpt', function(req, res){
  db.getAll(MediaCollection.bucket, function(err, results) {
    if (err) {
      res.send('EXPLOSIONS! ' + err, 500);
    } else {
      var ret = results.map(function(r) { 
        // Merge key in as the ID if it isn't already
        if (!r.data.id) r.data.id = r.meta.key; 
        return r.data;
      });//DEBUG
      res.send(results.map(function(r) { 
        // Merge key in as the ID if it isn't already
        if (!r.data.id) r.data.id = r.meta.key; 
        return r.data;
      }));
    }
  });
});

// Get a single MediaCollection
//CURRENTLY 1724 req/sec with -c 10 -k -n 1000
//Unfortunately, riak-js likes to be clever and parses this json, only for it to get serialized again
app.get('/media_collections/:id', function(req, res){
  db.get(MediaCollection.bucket, req.params.id, function(err, val) {
    if (err) {
      res.send('EXPLOSIONS! ' + err, 500);
    } else {
      res.send(val);
    }
  });
})

// Create a MediaCollection
//FIXME: make sure ui sends it in data so random post vars don't get included in the serialized model
//FIXME: this will be an ajax response with the key as the body, handle accordingly in the UI
app.post('/media_collections', function(req, res){
  db.save(MediaCollection.bucket, null, req.body, function(err, record, meta) {
    if (err) {
      res.send('EXPLOSIONS! ' + err, 500);
    } else {
      res.send(meta.key);// return it in the body, assign it to the model in the view
    }
  });
});

// Update a MediaCollection
//FIXME: for the time being this will just overwrite the key
app.put('/media_collections/:id', function(req, res){
  db.save(MediaCollection.bucket, req.params.id, JSON.stringify(req.body), function(err, result) {
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
