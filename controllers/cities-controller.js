/**
 * Created by Michael_Gray1 on 6/6/2014
 * I am the parent controller for the cities repeater
 */
angular.module('eventApp').controller('CitiesCtrl', function ($rootScope, $scope, EventService) {
    "use strict";

    $scope.cities = {};

    $scope.events = {};

    $scope.gridOptions = {
        data: 'cities',
        afterSelectionChange: function (theRow, evt) {
            $scope.selectedEvent = theRow.entity.id;
        },
        columnDefs: [
            {field: 'name', displayName: 'Event Name', width: '300px'},
            {field: 'date', displayName: 'Date', cellFilter: 'date', width: '93px'},
            {field: 'venue.name', displayName: 'Venue', width: '200px'}
        ]
    };

    /**
     * Get a list of cities from the provider/service.
     * This list is dynamic abd changes with additions/deletions
     * */
    var getCities = function () {
        $scope.busy = true;
        EventService.cities().then(
            function (data) {
                $scope.cities = data;
                $scope.busy = false;
            },
            function (err) {
                $scope.cities = null;
                $scope.busy = false;
            }
        );
    };

    var initialize = function () {
        getCities();
    };

    //Initialize the controller on app load:
    initialize();

});


