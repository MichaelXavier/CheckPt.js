//require.paths.unshift('lib');
//var CheckPt  = require('./lib/checkpt');
var CheckPt  = require('./lib/checkpt');

//console.log('CheckPt in temp.js: ' + require('sys').inspect(CheckPt));

/*
var Backbone = require('backbone'),
    db = require('riak-js').getClient(),
    sys = require('sys');//,
    //CheckPt  = require('./lib/checkpt');
*/

//console.log("OVER HERE CHECKPT IS: " + sys.inspect(CheckPt));

var cp = new CheckPt();
var all = {}
cp.all(function(err, mcs) { 
  if (err) {
    console.log('ERR: ' + err);
  } else {
    console.log('MCS: ' + sys.inspect(mcs));
  }
});
/*
db.getAll('media_collections', function(err, results) {
  if (err) {
    console.log('error1: ' + err);
  } else {
    console.log('results (' + typeof(results)  + '): ' + JSON.stringify(results));
    all.raw = results;
    all.mcs = cp.refresh(results);
    console.log("ALL: " + sys.inspect(all));
    console.log("cp: " + sys.inspect(cp));
  }

});
*/

/*

cp.all(function(err, mcs) {
  if (err) {
    console.log('error: ' + err);
  } else {
    console.log('mcs: ' + JSON.stringify(mcs));
    all.data = mcs;
  }
});
*/
