var cfloApp = angular.module('cfloApp', ['ngRoute']);

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

cfloApp.config(function($routeProvider) {
	$routeProvider
    .when('/add', {
      templateUrl: 'partials/add',
      controller: 'add'
    })
    .when('/edit/:val/:trans/', {
      templateUrl: 'partials/edit',
      controller: 'edit'
    })
    .when('/edit/:val/', {
      templateUrl: 'partials/edit-list',
      controller: 'add'
    })
		.when('/:val', {
			templateUrl: 'partials/pane',
			controller: 'pane'
		})
    .otherwise({
      templateUrl: '/partials/pane',
      controller: 'pane'
    });
});

cfloApp.controller('pane', function($scope, $routeParams) {
  $scope.panes = [
    {name: 'master'}
  ]
	if ($routeParams['val']){
		$scope.panes.push({name: $routeParams['val']});
	}
	if ($scope.panes.length > 1)
		$('.add').hide();
  $scope.addPane = function() {
		new_name = makeid()
    $scope.panes.push({name: new_name});
		$.ajax({
			type: 'POST',
			data: JSON.stringify({'ver': new_name}),
			contentType: 'application/json',
			url: '/copy'
		});
    $('.add').hide();
  }
  $scope.removePane = function(name) {
    for (var i=0; i<$scope.panes.length; ++i){
      if ($scope.panes[i].name == name){
        $scope.panes.splice($scope.panes.indexOf(i), 1);
      }
    }
    $('.add').show();
  }
  $scope.commitPane = function(name) {
		$.ajax({
			type: 'POST',
			data: JSON.stringify({'ver': name}),
			contentType: 'application/json',
			url: '/commit'
		});
  }
});

cfloApp.controller('add', function($scope, $routeParams) {
	console.log('add/edit transaction');
  $scope.trans = {};
  $scope.editing = $routeParams['val'];
  $scope.trans_list = {};
  $.get('/get', {'ver': $routeParams['val']} )
  .done(function( data ) {
    $scope.trans_list = data
    console.log($scope.trans_list);
    $scope.$apply();
  });

	$scope.insertData = function(transaction) {
		var seconds = new Date().getTime() / 1000;
		var data = {
			'loc': "transactions_master",
			'name': $scope.trans.name,
			'date': Math.floor(seconds),
			'recurrance': $scope.trans.recurrance,
			'end_recurrance': '-1',

			'amount': $scope.trans.amount,
			'delay_by': $scope.trans.delay_by,
			'terms': $scope.trans.terms,
			'days': $scope.trans.days,

			'loan_principal': $scope.trans.principal,
			'annual_rate': $scope.trans.annual,
			'maturity_date': $scope.trans.maturity,
			'monthly_payment': $scope.trans.monthly
		};
		// post data for server to insert into firebase
		$.ajax({
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			url: '/insert'
		});
	}
});

cfloApp.controller('edit', function($scope, $routeParams) {
  $scope.trans = {};
  $.get('/getTrans', {'ver': $routeParams['val'], 'trans': $routeParams['trans']} )
  .done(function( data ) {
    $scope.trans = data
    $scope.$apply();
  });
	$scope.editing = $routeParams['val'];
	$scope.changeData = function() {
   var seconds = new Date().getTime() / 1000;
   var data = {
       'loc': "transactions_" + $routeParams['val'],
       'name': $scope.trans.name,
       'date': Math.floor(seconds),
       'recurrance': $scope.trans.recurrance,
       'end_recurrance': '-1',

       'amount': $scope.trans.amount,
       'delay_by': $scope.trans.delay_by,
       'terms': $scope.trans.terms,
       'days': $scope.trans.days,

       'loan_principal': $scope.trans.principal,
       'annual_rate': $scope.trans.annual,
       'maturity_date': $scope.trans.maturity,
       'monthly_payment': $scope.trans.monthly
     };
     // post data for server to insert into firebase
     $.ajax({
       type: 'POST',
       data: JSON.stringify(data),
       contentType: 'application/json',
       url: '/modify'
     });
   }
});
