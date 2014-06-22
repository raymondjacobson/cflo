var cfloApp = angular.module('cfloApp', ['ngRoute']);

cfloApp.config(function($routeProvider) {
	$routeProvider
    .when('/add', {
      templateUrl: 'partials/add',
      controller: 'add'
    })
    .when('/edit', {
      templateUrl: 'partials/edit',
      controller: 'edit'
    })
    .otherwise({
      templateUrl: '/partials/pane',
      controller: 'pane'
    });
});

cfloApp.controller('pane', function($scope) {
  $scope.panes = [
    {name: 'master'}
  ]
  $scope.addPane = function() {
    $scope.panes.push({name: 'zxvbhn'});
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
  $scope.commitPane = function() {
    console.log('commit');
  }
});

cfloApp.controller('add', function($scope) {
	console.log('add transaction');
	$scope.submitData = function() {
		var data = {
			loc: "transaction-master"
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

cfloApp.controller('edit', function($scope) {
});
