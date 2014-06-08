var app = angular.module('eventApp', ['ngRoute', 'ngGrid']);
/**
 * Configure routes here:
 */
app.config(function($routeProvider){

    $routeProvider.
        when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        }).
       when('/edit/:name', {
            templateUrl: 'views/event_form.html',
            controller: 'EditEventCtrl'
        }).
        when('/add', {
            templateUrl: 'views/event_form.html',
            controller: 'AddEventCtrl'
        }).
        otherwise({
            redirectTo: 'views/not-found.html'
        });
    // enable html5Mode for pushstate ('#'-less URLs)
   // $locationProvider.html5Mode(true);
   // $locationProvider.hashPrefix('!');
});
