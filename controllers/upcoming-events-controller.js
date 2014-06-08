/**
 * Created by Michael_Gray1 on 6/6/2014
 *
 * I am the controller for upcoming events
 * Executed when all events view is loaded/re-loaded
 * This executes a data refresh on each subsequent visit
 */
angular.module('eventApp').controller('UpcomingEventsCtrl', function($scope, EventService, $location, $log, $routeParams) {
    "use strict";

    $scope.busy = false;
    $scope.selectedEvent = null;

    $scope.gridOptions = {
        data: 'myData',
        afterSelectionChange: function (theRow, evt) {
            $scope.selectedEvent = theRow.entity.id;
        },
        columnDefs: [
            {field: 'name', displayName: 'Event Name', width: '220px'},
            {field: 'date', displayName: 'Date', cellFilter: 'date', width: '93px'},
            {field: 'venue.name', displayName: 'Venue', width: '200px'},
            {field: 'venue.city', displayName: 'City', width: '150px'},
            {field: 'venue.state', displayName: 'State', width: '90px'}

        ]
    };

    /**
     *   Retrieve a list of upcoming events from service
     */
    var getUpcomingEvents = function () {
        $scope.busy = true;
        EventService.all().then(function (data) {
            $scope.myData = data;
            $scope.busy = false;
        }, function (err) {
            $scope.myData = null;
            $scope.busy = false;
        });
    };

    var initialize = function () {
        $scope.busy = true;
        getUpcomingEvents();
    };

    //Initialize the controller on app load:
    initialize();

});