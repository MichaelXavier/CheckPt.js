var CheckPt  = require('./lib/checkpt');
    inspect = require('sys').inspect,
    cp = new CheckPt();

var res = cp.fetch({
  success: function(collection, response) {
    //success cb
    console.log("SUCCESS!");
    console.log("COLL" + inspect(collection));
  },
  error: function(collection, response) {
    //failure cb
    console.log("FAILURE!");
    console.log("COLL" + inspect(collection));
    console.log("RESP" + inspect(response));
  }
});

console.log("cp: " + inspect(cp));
