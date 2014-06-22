var db_methods = require('../lib/db_methods.js');
var caller = require('../lib/caller.js');

exports.index = function(req, res){
  // Set up firebase connection
  db_url = db_methods.getDBUrl();
  db_root = db_methods.establishConnection(db_url);
  db_methods.insertTransaction(db_root, {'name':'trans1', 'timestamp': '1'});
  db_methods.insertTransaction(db_root, {'name':'trans2', 'timestamp': '2'});
  db_methods.insertTransaction(db_root, {'name':'trans3', 'timestamp': '3'});

  db_methods.modifyTransaction(db_root, 'trans1', '1',
    {'data': 'data'});

  db_methods.getTransactions(db_root);

  db_methods.copyMasterTransactions(db_root, 'abc');

  // Call python to process data
  caller.processData();

  // Return to index
  res.render('index', {
    title: 'Express',
    current_standing: 5000,
    transaction_dates: [1, 2, 3, 4],
    transaction_values: [100, 101, 102, 50]
  });
};
