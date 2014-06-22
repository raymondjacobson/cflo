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

exports.getTransactions = function(rootRef){
  var transactions_masterRef = rootRef.child('transactions_master');
  transactions_masterRef.once('value', function(snapshot){
    transactions_master = snapshot.val();
    if(transactions_master != null) {
      // TODO how to print transaction information
      // for (var key in transactions_master){
      //   console.log(transactions_master[key].name);
      // }
      return transactions_master;
    }
  });
}

exports.modifyTransaction = function(rootRef, loc, name, timestamp, transaction){
  var transactions_masterRef = rootRef.child(loc)
    .child(getTransactionDBTitle(name, timestamp));

  // TODO SET based on transaction properties
  transactions_masterRef.transaction(function(value) {
    return {'name': 'changed', 'birth': 'changed'};
  });
  // transactions_masterRef.child('name').set('changed');
  // transactions_masterRef.child('birth').set('changed');
}

exports.insertTransaction = function(rootRef, loc, transaction){
  var transactionsRef = rootRef.child(loc);
  var transactions_masterRef = transactionsRef.child(
    getTransactionDBTitle(transaction['name'], transaction['timestamp']));

  // TODO SET based on transaction properties
  transactions_masterRef.child('name').set('ray');
  transactions_masterRef.child('birth').set('10');
}

exports.copyMasterTransactions = function(rootRef, version){
  var transactions_masterRef = rootRef.child('transactions_master');
  var transactions_newRef = rootRef.child('transactions_' + version);
  transactions_masterRef.once('value', function(snapshot){
    transactions_newRef.transaction(function(value) {
      return snapshot.val();
    });
  })
}
