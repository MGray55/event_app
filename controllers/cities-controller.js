/**
 * Created by Michael_Gray1 on 6/6/2014
 * I am the top level/main controller for the app
 */
angular.module('eventApp').controller('CitiesCtrl', function ($rootScope, $scope, EventService, $location, $log, $routeParams) {
    "use strict";

    $scope.cities = {};

    $scope.events = {};

    $scope.gridOptions = {
        //data: $scope.cities,
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

    var getCities = function ()
    {
        $scope.busy = true;
        EventService.cities().then(
            function (data) {
                $scope.cities = data;
                $scope.busy = false;
            },
            function (err){
                $scope.cities = null;
                $scope.busy = false;
            }
        )
    };

    var initialize = function () {
        getCities();
    };

    //Initialize the controller on app load:
    initialize();

});


