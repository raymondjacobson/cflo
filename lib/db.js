exports.getDBUrl = function() {
  db = "https://cflo-sbd.firebaseio.com/";
  return db;
}

exports.establishConnection = function(db){
  var Firebase = require('firebase');
  var myRootRef = new Firebase(db);
  myRootRef.set("cflo!!");
};

exports.getTransactions = function(){

}

exports.modifyTransactions = function(name, timestamp){

}

exports.insertTransaction = function(){

}
