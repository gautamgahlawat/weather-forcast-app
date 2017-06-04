// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {

    //$locationProvider.hashPrefix('');
    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })
    .when('/forecast', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    });
});

// SERVICES
weatherApp.service('cityService',function() {
    this.city = "";
});


//CONTROLLERS
//home controller
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {

    $scope.city = cityService.city;

    $scope.$watch('city', function() {
        cityService.city = $scope.city;
    });
}]);

// forecast-controller
weatherApp.controller('forecastController',['$scope', '$http','cityService','$routeParams', function($scope, $http, cityService,$routeParams) {

    $scope.city = cityService.city;
    var apiKey = "4e0fd1d2f6b0fa24ac1f21ecdd4a9637";

    $scope.days = $routeParams.days || '2';

    //$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily",{
    //    callback: "JSON_CALLBACK"}, {get:{method:"JSONP"}});

    //$scope.weatherResult = $scope.weatherAPI.get({q:$scope.city, cnt: 2});

    //console.log($scope.weatherResult);

    var openweatherURL = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+$scope.city+"&cnt="+$scope.days+"&APPID="+apiKey;

    $http.get(openweatherURL).then(function(response) {
        console.log(response.data.list[0].dt);
        console.log(response);

        $scope.weatherResult = response;
    });

    $scope.convertToDate = function(dt) {
        return new Date(dt*1000);
    };


}]);


// Directives
// weatherApp.directive("weatherReport", function() {
//     return {
//         restrict: 'E',
//         templateUrl: 'directives/weatherReport.htm',
//         replace: true,
//         scope: {

//         }

//     };
// });
