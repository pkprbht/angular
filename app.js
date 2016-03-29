var myApp = angular.module('myApp',['ngRoute','ngResource','ui.bootstrap']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/musictrack', {
      templateUrl: 'musictrack.html',
      controller: 'musictrackCtr'
    }).
    when('/addmusictrack', {
      templateUrl: 'addmusictrack.html',
      controller: 'addmusictrackCtr'
    }).
    when('/editmusictrack/:id', {
      templateUrl: 'editmusictrack.html',
      controller: 'editmusictrackCtr'
    }).
    when('/genre', {
      templateUrl: 'genre.html',
      controller: 'genreCtr'
    }).
    when('/addgenre', {
      templateUrl: 'addgenre.html',
      controller: 'addgenreCtr'
    }).
    when('/editgenre/:id', {
      templateUrl: 'editgenre.html',
      controller: 'editgenreCtr'
    }).
    otherwise({
      redirectTo: '/musictrack'
    });
}]);

myApp.controller('genreCtr', ['$scope', '$resource', function($scope, $resource) {
    var track = $resource('http://104.197.128.152:8000/v1/genres');
    $scope.alltrack = track.query();
}]); 

myApp.controller('addgenreCtr', ['$scope', '$resource', function($scope, $resource) {
    var track = $resource('http://104.197.128.152:8000/v1/genres');
    $scope.add = function() {
      track.save({"name" : $scope.track.name});
      $scope.message = 'genre added';
    }; 
}]); 

myApp.controller('editgenreCtr', ['$scope', '$resource', '$routeParams', function($scope, $resource, $routeParams) {
    var id = $routeParams.id;
    var tracks = $resource('http://104.197.128.152:8000/v1/genres/'+id);
    $scope.track = tracks.get();
    
    $scope.save = function() {
      tracks.save({"name" : $scope.track.name});
      $scope.message = 'genre saved';
    }; 
}]); 


myApp.controller('musictrackCtr', ['$scope', '$resource', function($scope, $resource) {
    var track = $resource('http://104.197.128.152:8000/v1/tracks');
    $scope.alltrack = track.query();

    $scope.begin = 0;
    $scope.limit = 5;

}]); 

myApp.controller('addmusictrackCtr', ['$scope', '$resource', function($scope, $resource) {
    var gerne = $resource('http://104.197.128.152:8000/v1/genres');
    $scope.gernes = gerne.query();

    var track = $resource('http://104.197.128.152:8000/v1/tracks');
    $scope.add = function() {
      track.save({"title" : $scope.track.title, "rating" : $scope.track.rating, "genres": $scope.track.genre});
      $scope.message = 'track added';
    }; 
}]); 

myApp.controller('editmusictrackCtr', ['$scope', '$resource', '$routeParams', function($scope, $resource, $routeParams) {

    var gerne = $resource('http://104.197.128.152:8000/v1/genres');
    $scope.gernes = gerne.query();

    var id = $routeParams.id;
    var tracks = $resource('http://104.197.128.152:8000/v1/tracks/'+id);
    $scope.track = tracks.get();
    
    $scope.save = function() {
      tracks.save({"title" : $scope.track.title, "rating" : $scope.track.rating, "genres": $scope.track.genre});
      $scope.message = 'track saved';
    }; 
}]); 



myApp.directive('pkRate', function() {
  return {
    restrict: 'EA',
    template: '<ul class="star-rating"><li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toupdate($index)"><i class="fa fa-star fa-5x"></i></li></ul>',
    scope: {
      rate: '=ngModel'
    },
    link: function(scope) {
      scope.max = 5;
      function rateUpdate() {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          scope.stars.push({
            filled: i < scope.rate
          });
        }
      };
      scope.toupdate = function(i) {
        scope.rate = i + 1;  
      };
      scope.$watch('rate', function(oldVlu, newVlu) {
        if (newVlu) {
          rateUpdate();
        }
      });
    }
  };
});

