/**
 * Created by Michael_Gray1 on 6/6/2014
 * I am the controller for the add action
 * (Uses the same view as edit action)
 */
angular.module('eventApp').controller('AddEventCtrl', function ($scope, $location, $filter, EventService, StatesService) {
    "use strict";

    $scope.header_title = 'Add An Event (click to go back)';
    $scope.title = 'Add An Event';
    $scope.states = null;

    $scope.hideDemoFields = false;

    //Model for text search
    $scope.state = null;

    /**
     * Handler for click on state name in repeater
     * @param data
     */
    $scope.stateSelected = function (data) {
        $scope.selectedState = data;
    };

    /** Watcher for when user types filter criteria and applies filter */
    $scope.$watch("state", function (query) {
        if ($scope.states !== null) {
            $scope.counted = $filter("filter")($scope.states, query).length;
            $scope.noFilteredResults = ($scope.counted === 0);
        }

    });

    /** Clears any state search filters */
    $scope.clearSearch = function () {
        $scope.state = null;
        $scope.busy = false;
    };

    /**
     * Click handler for submit button
     * Gets the next available ID number, and
     * requests an insert of a new event
     */
    $scope.handleSubmit = function () {
        //send a new event object to the service
        var event = {venue: {}};
        event.name = $scope.eventName;
        event.venue.name = $scope.venueName;
        event.venue.city = $scope.city;
        event.venue.state = ($scope.selectedState !== null ? $scope.selectedState.code : null);
        event.date = $scope.date;

        //This is purely for demo purposes.
        //We normally would not query the data source for the
        //next available ID, but it would be generated on insert
        //
        //An example of chained promises here:
        EventService.getNextUniqueID().then(function (data) {
            event.id = data;
            EventService.add(event);
            $location.path('/');
        });
    };

    /**
     * Loads the state list from provider/service
     */
    var loadStates = function () {
        if ($scope.states === null) {
            $scope.busy = true;
            StatesService.getStates().then(function (data) {
                $scope.busy = false;
                $scope.states = data;
                $scope.noFilteredResults = false;

            },
                function (err) {
                    $scope.busy = false;
                    $scope.noFilteredResults = true;
                });
        }
    };

    var initialize = function () {
        loadStates();
    };

    /** Route back to the starting view */
    $scope.goBack = function () {
        $location.path('/');
    };

    //Initialize the controller on app load:
    initialize();

});

