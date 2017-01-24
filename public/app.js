console.log('hello')

var app = angular.module('app', [])
.controller("WorkoutListController", function($scope, $http) {
  console.log('hello')
  $scope.data = {};
  $scope.newWorkout = {};
  $scope.sortType = 'totalRatings';
  $scope.reverseSort = false;
  $scope.getWorkouts = function() {
    $http({
      method: 'GET',
      url: '/workouts'
    }).then(function (response) {
        console.log('what is response?-------', response);
        $scope.data.workouts = response.data;
    }, function (response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
  }
  $scope.getWorkouts();
})
.controller()