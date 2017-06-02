var app = angular.module('ContactListApp', [])
app.controller('articleController', [
'$scope',
function($scope) {
  $scope.articles = [
    'foo',
    'bar',
    'baz'
  ];
}]);
