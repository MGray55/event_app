var app = angular.module('eventApp', ['ngRoute', 'ngGrid', 'ui.bootstrap']);
/**
 * Configure routes here:
 */
app.config(function ($routeProvider) {

    $routeProvider.
        when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        }).
        when('/add', {
            templateUrl: 'views/event_form.html',
            controller: 'AddEventCtrl'
        }).
        when('/:name', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        }).
        when('/edit/:name', {
            templateUrl: 'views/event_form.html',
            controller: 'EditEventCtrl'
        }).
        otherwise({
            redirectTo: 'views/not-found.html'
        });
    // enable html5Mode for pushstate ('#'-less URLs)
    // $locationProvider.html5Mode(true);
    // $locationProvider.hashPrefix('!');
});
