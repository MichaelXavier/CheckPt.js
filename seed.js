var MediaCollection = require('./lib/media_collection'),
    MediaItem       = require('./lib/media_item'),
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

//cleanup
db.remove('metia_collections', '1', function() {
  db.remove('metia_collections', '2', function() {
    var mc1 = new MediaCollection({name:'Curb Your Enthusiasm'});
    mc1.add(new MediaItem({name:'Episode1'}));
    mc1.add(new MediaItem({name:'Episode2'}));

    var mc2 = new MediaCollection({name:'Oz'});
    mc2.add(new MediaItem({name:'Episode3'}));
    mc2.add(new MediaItem({name:'Episode4'}));

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
  });
});
