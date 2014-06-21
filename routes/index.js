exports.index = function(req, res){

  var Firebase = require('firebase')

  var myRootRef = new Firebase('https://cflo-sbd.firebaseio.com/');

  myRootRef.set("hellof world!");
  console.log('here');
  res.render('index', { title: 'Express' });

};
