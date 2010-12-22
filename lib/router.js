function get(app, path, model) {
  //index
  app.get('/' + path, function(req, res) {
    //TODO, wire up data store
  });

  // show
  app.get('/' + path + "/:id", function(req, res) {
    //TODO, wire up data store
  });
}

function post(app, path, model) {
  // create
  app.post('/' + path, function(req, res) {
    //TODO, wire up data store
  });
}
function put(app, path, model) {
  // update
  app.put('/' + path + "/:id", function(req, res) {
    //TODO, wire up data store
  });
}

function del(app, path, model) {
  // update
  app.put('/' + path, function(req, res) {
    //TODO, wire up data store
  });
}

var Router = {
  rest: function(app, path, model, verbs) {
    if (!verbs) verbs = ['get', 'post', 'delete', 'put'];
    verbs.forEach(function(v) {
      switch(v) {
        case 'get':
          get(app, path, model);
          break;
        case 'post':
          post(app, path, model);
          break;
        case 'delete':
          del(app, path, model);
          break;
        case 'put': put(app, path, model);
      }
    })
  }
};

module.exports = Router;
