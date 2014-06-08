/**
 * Created by Michael_Gray1 on 6/6/2014
 *
 * I am the controller for the all-events view.
 * Executed when all events view is loaded/re-loaded
 * This executes a data refresh on each subsequent visit
 */
angular.module('eventApp').controller('AllEventsCtrl', function ($scope, EventService, $location, $dialog) {
    "use strict";

    $scope.busy = false;
    $scope.selectedEvent = null;

    $scope.gridOptions = {
        data: 'myData',
        afterSelectionChange: function (theRow, evt) {
            $scope.selectedEvent = theRow.entity;
        },
        columnDefs: [
            {field: 'name', displayName: 'Event Name', width: '230px'},
            {field: 'date', displayName: 'Date', cellFilter: 'date', width: '125px'},
            {field: 'venue.name', displayName: 'Venue', width: '250px'},
            {field: 'venue.city', displayName: 'City', width: '130px'},
            {field: 'venue.state', displayName: 'State', width: '65px'},
            {field: 'venue.id', displayName: 'Action', width: '75px',
                cellTemplate: '<div class="itemRendererContainer">' +
                    '<div ng-click="editEvent()"class="itemRenderer"><img src="img/pencil.png" alt="Edit" height="20" width="20"></div>' +
                    '<div ng-click="deleteEvent(row)" class="itemRenderer"><span aria-hidden="true" data-icon="&#xe016;"></span></div>' +
                    '</div>'}

        ]
    };

    $scope.handleAddEvent = function () {
        $location.path("/add");
    };


    $scope.editEvent = function () {
        if ($scope.selectedEvent !== null) {
            if (angular.isDefined($scope.selectedEvent)) {
                $location.path("/edit/" + $scope.selectedEvent.id);
            }
        }
    };

    $scope.deleteEvent = function (row) {
        $scope.selectedEvent = $scope.myData[row.rowIndex];
        var message = ($scope.selectedEvent.name !== null) ? 'Are you sure you want to remove\n' + $scope.selectedEvent.name + '?' : 'Are you sure you want to remove this event?';
        var msgbox = $dialog.messageBox('Delete Event', message,
            [
                {label: 'Confirm', result: 'yes'},
                {label: 'Cancel', result: 'no'}
            ]);
        msgbox.open().then(function (result) {
            if (result === 'yes') {
                $scope.myData = EventService.remove($scope.selectedEvent.id);
            }
        });
    };

    /**
     *   Retrieve a list of all events from service
     */
    var getAll = function () {
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
        $scope.busy = false;
        getAll();
    };

    //Initialize the controller on app load:
    initialize();

});