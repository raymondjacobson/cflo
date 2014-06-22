var db = require('../lib/db.js');
var caller = require('../lib/caller.js');

exports.index = function(req, res){
  // Set up firebase connection
  db_url = db.getDBUrl();
  db.establishConnection(db_url);
  caller.processData();
  console.log('here');
  res.render('index', { title: 'Express' });
};
