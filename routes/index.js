var db_methods = require('../lib/db_methods.js');
var caller = require('../lib/caller.js');

exports.index = function(req, res){
  // Call python to process data
  var output = caller.processData();

  // Return to index
  res.render('index', {
    title: 'Express',
    current_standing: 5000,
    transaction_dates: [1, 2, 3, 4],
    transaction_values: [100, 101, 102, 50]
  });
};

exports.insert = function(req, res){
  console.log('ins');
  var loc = req.body.loc

  db_url = db_methods.getDBUrl();
  db_root = db_methods.establishConnection(db_url);
  insert_data = {
    'old_name_loc': req.body.old_name_loc,
    'name': req.body.name,
    'date': req.body.date,
    'recurrance':  req.body.recurrance,
    'end_recurrance': req.body.end_recurrance,
    'amount': req.body.amount,
    'delay_by': req.body.delay_by,
    'terms': req.body.terms,
    'days': req.body.days,
    'loan_principal': req.body.loan_principal,
    'annual_rate': req.body.annual_rate,
    'maturity_date': req.body.maturity_date,
    'monthly_payment': req.body.monthly_payment
  }
  db_methods.insertTransaction(db_root, loc, insert_data['old_name_loc'], insert_data);
  res.send('/ POST OK');
}

exports.copy = function(req, res){
  db_url = db_methods.getDBUrl();
  db_root = db_methods.establishConnection(db_url);
  db_methods.copyMasterTransactions(db_root, req.body.ver);
  res.send('/ POST OK');
}

exports.commit = function(req, res){
  db_url = db_methods.getDBUrl();
  db_root = db_methods.establishConnection(db_url);
  db_methods.commitTransactions(db_root, req.body.ver);
  res.send('/ POST OK');
}

exports.get = function(req, res){
  db_url = db_methods.getDBUrl();
  db_root = db_methods.establishConnection(db_url);
  var transactions_masterRef = db_root.child('transactions_' + req.query.ver);
  transactions_masterRef.once('value', function(snapshot){
    transactions_master = snapshot.val();
    if(transactions_master != null) {
      res.send(transactions_master);
    }
  });
}

exports.getTrans = function(req, res){
  db_url = db_methods.getDBUrl();
  db_root = db_methods.establishConnection(db_url);
  var transactions_masterRef = db_root.child('transactions_' + req.query.ver);
  transactions_masterRef = transactions_masterRef.child(req.query.trans);
  transactions_masterRef.once('value', function(snapshot){
    transactions_master = snapshot.val();
    if(transactions_master != null) {
      res.send(transactions_master);
    }
  });
}

exports.modify = function(req, res){
  var loc = req.body.loc

  db_url = db_methods.getDBUrl();
  db_root = db_methods.establishConnection(db_url);
  insert_data = {
    'old_name_loc': req.body.old_name_loc,
    'name': req.body.name,
    'date': req.body.date,
    'recurrance':  req.body.recurrance,
    'end_recurrance': req.body.end_recurrance,
    'amount': req.body.amount,
    'delay_by': req.body.delay_by,
    'terms': req.body.terms,
    'days': req.body.days,
    'loan_principal': req.body.loan_principal,
    'annual_rate': req.body.annual_rate,
    'maturity_date': req.body.maturity_date,
    'monthly_payment': req.body.monthly_payment
  }
  // console.log(db_root, loc, insert_data['old_name_loc'], insert_data);
  db_methods.modifyTransaction(db_root, loc, insert_data['old_name_loc'], insert_data);
  res.send('/ POST OK');
}
