/**
 * Created by Michael_Gray1 on 6/6/2014
 *
 * I am the controller for nearby events
 * Executed when all events view is loaded/re-loaded
 * This executes a data refresh on each subsequent visit
 *
 * - get current location
 * - put lat/lng on each event if it doesn't have one already
 * - calculate distance to each event
 * - sort events by distance.
 * - display closest events
 */
angular.module('eventApp').controller('NearbyEventsCtrl', function ($scope, LocationService) {
    "use strict";

    $scope.busy = false;
    $scope.selectedEvent = null;
    $scope.currentLocation = null;
    $scope.myData = null;

    //Zip code validation length
    $scope.minZipLength = 5;
    $scope.zipCode = null;
    $scope.isZipCodeValid = false;
    $scope.errorMessage = null;

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
            {field: 'venue.state', displayName: 'State', width: '90px'},
            {field: 'distance.text', displayName: 'Distance', width: '90px'}
        ]
    };

    /**
     * @returns true if user input of zip code is valid
     */
    $scope.getZipButtonEnabled = function () {
        var returnValue = true;
        if ($scope.busy === true || !$scope.isZipCodeValid) {
            returnValue = false;
        }
        return returnValue;
    };

    /**
     *  Changes depending if the button is enabled or not
     * @returns String of less styles
     */
    $scope.getZipButtonStyle = function () {
        var returnValue = "gray mapSearch noshow";
        if ($scope.getZipButtonEnabled() === true) {
            returnValue = "green mapSearch noshow";
        }
        return returnValue;
    };

    /**
     * Checks to make sure postal code entered is numeric and 5 chars .
     * User input is restricted to numeric characters before this validation check.
     * @see numeric-input-directive.js
     *
     * @param zip  - Postal code as a string or number
     * Expected is a string from UI.
     */
    $scope.validateZip = function (zip) {
        $scope.isZipCodeValid = false;
        if (angular.isDefined(zip) && zip !== null) {
            if (angular.isString(zip)) {
                var regexp = new RegExp("([^0-9])", "g");
                var hasNonNumericChars = regexp.test(zip);
                $scope.isZipCodeValid = ((zip.length === $scope.minZipLength) && !hasNonNumericChars);
            } else if (_.isNumber(zip)) {
                $scope.isZipCodeValid = (String(zip).length === $scope.minZipLength);
            }
        }
    };

    /**
     *   Retrieve a list of upcoming events from service
     */
    var getNearbyEvents = function (location) {
        $scope.busy = true;
        LocationService.getNearbyEvents(location).then(
            function (data) {
                $scope.myData = data;
                $scope.busy = false;
            },
            function (err) {
                $scope.myData = null;
                $scope.busy = false;
            }
        );
    };

    /**
     * This will attempt to get the user's location
     * User can also enter a zip code to search
     */
    var getCurrentLocation = function () {
        $scope.busy = true;
        LocationService.getCurrentLocation().then(
            function (data) {
                $scope.currentLocation = data;

                //Now get events that are close to the user
                getNearbyEvents(data);
            }, function (err) {
                $scope.currentLocation = null;
                $scope.busy = false;
                //Tell the user their location could not be
                //found, so they need to enter a search location.
                $scope.errorMessage = "We couldn't determine your location. Please enter a zip code";
            }
        );
    };

    /**
     * Zip search button handler
     * @param zip
     */
    $scope.searchByZip = function (zip) {
        getNearbyEvents(zip);
    };

    /**
     * Current locations search button handler
     * @param zip
     */
    $scope.searchByMyLocation = function () {
        getCurrentLocation();
    };

    var initialize = function () {
        getCurrentLocation();
    };

    //Initialize the controller on app load:
    initialize();

});
