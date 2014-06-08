/**
 * Created by Michael_Gray1 on 6/6/2014.
 * I am the controller for the edit action
 * (Uses the same view as add new action)
 */
angular.module('eventApp').controller('EditEventCtrl', function ($scope, $rootScope, EventService, $location, $log, $routeParams, StatesService) {
    "use strict";

    $scope.header_title = 'Edit Event (click to go back)';
    $scope.title = 'Edit Event';
    $scope.busy = false;
    $scope.event = null;
    $scope.venueName = null;
    $scope.states = null;

    $scope.hideDemoFields = true;

    //Model for text search
    $scope.state = null;
    $scope.venueName = null;
    $scope.eventName = null;
    $scope.date = null;
    $scope.city = null;

    var id = null;

    var setState = function (data) {
        if (data !== null && $scope.states !== null) {
            for (var x = 0; x < $scope.states.length; x++) {
                if ($scope.states[x].code === data.venue.state) {
                    $scope.selectedState = $scope.states[x];
                    //$scope.state
                    break;
                }
            }
        }
    };

    var setFields = function (data) {
        setState(data);
        $scope.eventName = data.name;
        $scope.venueName = data.venue.name;
        $scope.date = data.date;
        $scope.city = data.venue.city;
    };

    var getEventById = function (event) {
        if (angular.isDefined(event) && event !== null) {
            EventService.eventById(event).then(function (data) {
                $scope.event = data;
                setFields(data);
                $scope.busy = false;
            }, function (err) {
                $scope.event = null;
                $scope.busy = false;
            });
        }
    };

    $scope.handleSubmit = function () {
        //send the updated event object to service.
        $scope.event.name = $scope.eventName;
        $scope.event.venue.name = $scope.venueName;
        $scope.event.venue.city = $scope.city;
        $scope.event.venue.state = ($scope.selectedState !== null ? $scope.selectedState.code : null);
        $scope.event.date = $scope.date;
        EventService.update($scope.event);
        $location.path('/');
    };

    /** Clears any state search filters */
    $scope.clearSearch = function () {
        $scope.state = null;
        $scope.busy = false;
    };

    var loadStates = function () {
        if ($scope.states === null) {
            $scope.busy = true;
            StatesService.getStates().then(function (data) {
                    $scope.busy = false;
                    $scope.states = data;

                },
                function (err) {
                    $scope.busy = false;
                });
        }
    };

    var initialize = function () {
        loadStates();
        //Get the selected event id from the route params
        id = $routeParams.name;
        if (angular.isDefined(id) && id !== null) {
            getEventById(id);
        }
    };

    $scope.goBack = function () {
        $location.path('/');
    };


    $scope.goBack = function () {
        $location.path('/');
    };

    //Initialize the controller on app load:
    initialize();
});
