// Disabled until project switched to expresso
/*
var app = require('../app');


module.exports = {
  'GET /': function(assert){
    assert.response(app,
      { url: '/' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res){
        assert.includes(res.body, '<title>Express</title>');
      });
  }
};
*/
module.exports = {noop: function() {}};
