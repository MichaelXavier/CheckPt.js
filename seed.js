var MediaCollection = require('./lib/media_collection'),
    MediaItem       = require('./lib/media_item'),
    inspect       = require('sys').inspect,//MXDEBUG
    CheckPt         = require('./lib/checkpt');

/*
var mc = new MediaCollection({name:'Curb Your Enthusiasm'});
mc.add({name:'Episode1'});
mc.add({name:'Episode2'});

mc.save();

console.log(JSON.stringify(mc));
*/
/*var cp = new CheckPt();
console.log('cp get: ' + JSON.stringify(cp.fetch()));
*/

var db = require('riak-js').getClient();

var mc1 = new MediaCollection({
  name:'Curb Your Enthusiasm',
  items: [
    new MediaItem({name:'Episode1'}),
    new MediaItem({name:'Episode2'}),
  ]
});

var mc2 = new MediaCollection({
  name:'Oz',
  items: [
    new MediaItem({name:'Episode1'}),
    new MediaItem({name:'Episode2'}),
  ]
});

console.log('Will save to 1: ' + JSON.stringify(mc1));
console.log('Will save to 2: ' + JSON.stringify(mc2));


db.save('media_collections', '1', JSON.stringify(mc1), {contentType: 'application/json'}, function(err) {
  if (err) {
    console.log('ERR: ' + err);
  } else {
    db.save('media_collections', '2', JSON.stringify(mc2), {contentType: 'application/json'}, function(err) {
      if (err) {
        console.log('ERR2: ' + err);
      } else {
        console.log('seed data saved');
      }
    });
  }
});
