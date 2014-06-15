/**
 * Created by Michael_Gray1 on 6/6/2014
 * I am the top level/main controller for the app
 */
angular.module('eventApp').controller('MainCtrl', function ($scope, EventService, $location, $routeParams) {
    "use strict";

    /** Busy flag bound to loading animation */
    $scope.busy = false;

    /** Tab configuration model */
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

    /**
     * To support deep-linking/bookmarks between tabs
     * Set the tab param on the URL
     */
    $scope.onClickTab = function (tab, index) {
        $scope.currentTab = tab.url;

        $location.path("/" + index);
    };

    $scope.isActiveTab = function (tabUrl) {

        return tabUrl == $scope.currentTab;
    };

    /**
     * To support deep-linking/bookmarks between tabs
     * Read the tab param on the URL
     */
    var getCurrentTab = function () {
        var id = parseInt($routeParams.name);
        switch (id) {
        case 0:
            $scope.currentTab = 'all.html';
            break;

        case 1:
            $scope.currentTab = 'upcoming.html';
            break;

        case 2:
            $scope.currentTab = 'local.html';
            break;

        default:
            $scope.currentTab = $scope.currentTab;
            break;
        }
    };

    var initialize = function () {
        getCurrentTab();
    };

    //Initialize the controller on app load:
    initialize();


});
