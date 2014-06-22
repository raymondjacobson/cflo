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
    .when('/edit/:val', {
      templateUrl: 'partials/edit',
      controller: 'edit'
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
	console.log($routeParams);
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

cfloApp.controller('add', function($scope) {
	console.log('add transaction');
	$scope.submitData = function() {
		var seconds = new Date().getTime() / 1000;
		var data = {
			'loc': "transactions_master",
			'name': "milk",
			'date': Math.floor(seconds),
			'recurrance': '7',
			'end_recurrance': '$',

			'amount': '-50',
			'delay_by': '-1',
			'terms': '2/10 n/30',
			'days': '15',

			'loan_principal': '10000',
			'annual_rate': '2015-12-15',
			'maturity_date': '2015-12-15',
			'monthly_payment': '5234'
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
	$scope.editing = $routeParams['val'];
	console.log('edit transaction');
	$scope.submitData = function() {
		var seconds = new Date().getTime() / 1000;
		var data = {
			'loc': "transactions_" + $routeParams['val'],
			'name': "milk",
			'date': Math.floor(seconds),
			'recurrance': '7',
			'end_recurrance': '$',

			'amount': '-50',
			'delay_by': '-1',
			'terms': '2/10 n/30',
			'days': '15',

			'loan_principal': '10000',
			'annual_rate': '2015-12-15',
			'maturity_date': '2015-12-15',
			'monthly_payment': '5234'
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
