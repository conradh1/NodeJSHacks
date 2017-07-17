var searchEngineApp = angular.module('SearchEngineApp', ['ui.router']);

searchEngineApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('home', {
                url: '/home?keywords',
		templateUrl: 'home.html',
                controller: 'searchCtrl',
                params: {
                    keywords: {
                        value: '',
                        squash: true
                    }
                },
                reloadOnSearch: false
    })

    .state({name: 'results',
	    url: '/results?keywords',
          contorller: 'resultsCtrl',
          templateUrl: 'results.html'
    })

    $urlRouterProvider.otherwise('/home');
})

searchEngineApp.controller('searchCtrl', function($http, $scope, $state, $stateParams) {

	console.log("Called controller!");

    // function to process the form
    $scope.submit = function() {

        console.log("Called submit!");
        //$state.go('results', {keywords: $scope.keywords});
        $state.go('.', {keywords: $scope.keywords});
        $scope.showKeywords = function() {
			return "Results: " + $scope.keywords;
		};
		return $http.get('/home/'+$scope.keywords, { cache: true }).then(function(resp) {
			console.log("Get called...");
			$scope.cgList = resp.data;
        });
    };
});