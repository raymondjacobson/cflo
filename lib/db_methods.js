getTransactionDBTitle = function(name, timestamp) {
  return name+'_'+timestamp;
}

exports.getDBUrl = function() {
  db = "https://cflo-sbd.firebaseio.com/";
  return db;
}

exports.establishConnection = function(db){
  var Firebase = require('firebase');
  var rootRef = new Firebase(db);
  return rootRef;
};
//depcrecated
exports.getTransactions = function(rootRef, loc){
  var transactions_masterRef = rootRef.child('transactions_' + loc);
  transactions_masterRef.once('value', function(snapshot){
    transactions_master = snapshot.val();
    if(transactions_master != null) {
      return transactions_master;
    }
  });
}
//deprecated
exports.getTransaction = function(rootRef, loc, name){
  var transactions_masterRef = rootRef.child('transactions_' + loc);
  transactions_masterRef = rootRef.child(name);
  transactions_masterRef.once('value', function(snapshot){
    transactions_master = snapshot.val();
    if(transactions_master != null) {
      return transactions_master;
    }
  });
}

exports.modifyTransaction = function(rootRef, loc, name, transaction){
  //console.log(transaction);
  var transactions_masterRef = rootRef.child(loc)
    .child(name);
  for(var key in transaction){
    transactions_masterRef.child(key).set(transaction[key]);
  }
  // transactions_masterRef.transaction(function(value) {
  //   return transaction;
  // });
}

exports.insertTransaction = function(rootRef, loc, name, transaction){
  var transactionsRef = rootRef.child(loc);
  var transactions_masterRef = transactionsRef.child(name);
  for(var key in transaction){
    transactions_masterRef.child(key).set(transaction[key]);
  }
}

exports.copyMasterTransactions = function(rootRef, version){
  console.log(version);
  var transactions_masterRef = rootRef.child('transactions_master');
  var transactions_newRef = rootRef.child('transactions_' + version);
  transactions_masterRef.once('value', function(snapshot){
    transactions_newRef.transaction(function(value) {
      return snapshot.val();
    });
  })
}

exports.commitTransactions = function(rootRef, version){
  var transactions_masterRef = rootRef.child('transactions_master');
  var transactions_newRef = rootRef.child('transactions_' + version);
  transactions_newRef.once('value', function(snapshot){
    transactions_masterRef.transaction(function(value) {
      return snapshot.val();
    });
  })
}
