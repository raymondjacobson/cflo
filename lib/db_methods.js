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
  var transactionRef = rootRef.child('transactions');
  transactionRef.once('value', function(snapshot){
    transactions = snapshot.val();
    if(transactions != null) {
      // TODO how to print transaction information
      // for (var key in transactions){
      //   console.log(transactions[key].name);
      // }
      return transactions;
    }
  });
}

exports.modifyTransaction = function(rootRef, name, timestamp, transaction){
  var transactionRef = rootRef.child('transactions')
    .child(getTransactionDBTitle(name, timestamp));

  // TODO SET based on transaction properties
  transactionRef.child('name').set('changed');
  transactionRef.child('birth').set('changed');
}

exports.insertTransaction = function(rootRef, transaction){
  var transactionsRef = rootRef.child('transactions');
  var transactionRef = transactionsRef.child(
    getTransactionDBTitle(transaction['name'], transaction['timestamp']));

  // TODO SET based on transaction properties
  transactionRef.child('name').set('ray');
  transactionRef.child('birth').set('10');
}
