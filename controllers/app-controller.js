/**
 * Created by Michael_Gray1 on 6/6/2014
 * I am the top level/main controller for the app
 */
angular.module('eventApp').controller('MainCtrl', function($rootScope, $scope, EventService, $location, $log, $routeParams) {
    "use strict";

    $scope.busy = false;

   /*
    $scope.editEvent = function ()
    {
        if($scope.selectedEvent !== null){
            //alert('Editing ' + $scope.selectedEvent);
            if (angular.isDefined($scope.selectedEvent)) {
                $location.path("/edit/" + $scope.selectedEvent);
            }
        }
    };

    $scope.deleteEvent = function ()
    {
        if($scope.selectedEvent !== null){
            alert('Deleting ' + $scope.selectedEvent);
        }
    };
    */

    $scope.tabs = [
        {
            title: 'All Events',
            url: 'all.html'
        },
        {
            title: 'Upcoming Events',
            url: 'upcoming.html'
        },
        {
            title: 'Local Events',
            url: 'local.html'
        }
    ];

    /** The active tab on load */
    $scope.currentTab = 'all.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;

        //If data no loaded for selected tab, get it now...
    };

    $scope.isActiveTab = function (tabUrl) {
        return tabUrl == $scope.currentTab;
    };


    var initialize = function () {
        $scope.busy = false;
    };

    //Initialize the controller on app load:
    initialize();

});
