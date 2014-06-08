/**
 * Created by Michael_Gray1 on 6/6/2014.
 */
angular.module('eventApp').controller('AddEventCtrl', function ($scope, $rootScope, $location, $filter, StatesService) {
    "use strict";

    $scope.header_title = 'Add An Event (click to go back)';
    $scope.title = 'Add An Event';
    $scope.states = null;

    //Model for text search
    $scope.state = null;
    $scope.stateSelected = function (selectedState) {

    };

    /** Watcher for when user types filter criteria and applies filter */
    $scope.$watch("state", function (query) {
        $scope.counted = $filter("filter")($scope.states, query).length;
        $scope.noFilteredResults = ($scope.counted === 0);
    });

    /** To get rid of flicker that still appears when using ng-show and ng-hide */
    $scope.clearSearchStyle = function () {
        if ($scope.noFilteredResults) {
            return "visible";
        }
        return "invisible";
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
        $scope.busy = false;
        loadStates();
    };

    $scope.goBack = function () {
        $location.path('/');
    };

    //Initialize the controller on app load:
    initialize();

});

