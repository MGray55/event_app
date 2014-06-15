/**
 * Created by Michael_Gray1 on 6/6/2014
 * I am the controller for each city grid
 */
angular.module('eventApp').controller('CityCtrl', function ($rootScope, $scope) {
    "use strict";


    $scope.myData = null;

    $scope.data = function (city) {
        $scope.myData = city.events;
    };

    /** Each city gets a ng-grid instance and config */
    $scope.gridOptions = {
        data: 'myData',
        afterSelectionChange: function (theRow, evt) {
            $scope.selectedEvent = theRow.entity.id;
        },
        columnDefs: [
            {field: 'name', displayName: 'Event Name', width: '285px'},
            {field: 'date', displayName: 'Date', cellFilter: 'date', width: '100px'},
            {field: 'venue.name', displayName: 'Venue', width: '200px'}
        ]
    };


});


