var cfloApp = angular.module('cfloApp', []);

cfloApp.controller('PaneCtrl', function($scope) {
  $scope.panes = [
    {name: 'master'}
  ]
  $scope.addPane = function() {
    $scope.panes.push({name: 'zxvbhn'});
  }
})
