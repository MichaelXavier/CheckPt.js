var CheckPt  = require('./lib/checkpt');
    inspect = require('sys').inspect,
    cp = new CheckPt();

var res = cp.fetch(
  function(collection, response) {
    //success cb
    console.log("SUCCESS!");
    console.log("COLL" + inspect(collection));
  },
  function(collection, response) {
    //failure cb
    console.log("FAILURE!");
    console.log("COLL" + inspect(collection));
    console.log("RESP" + inspect(response));
  }
);

console.log("cp: " + inspect(cp));

//Yeah this might be a problem...
setTimeout(function() {
  console.log('nap over');
  console.log("cp: " + inspect(cp.first()));
}, 3000)
