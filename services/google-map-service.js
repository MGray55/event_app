/**
 * Created with WebStorm.
 * User: Mike Gray
 * Date: 6/7/14
 *
 * Uses Google Maps API to geolocate addresses, and calculate distances to locations
 */
angular.module('eventApp').service('googleMapService', ['$rootScope', '$q',
    function ($rootScope, $q) {
        'use strict';

        /** Takes an origin object and an array of locations
         * Calls google map API to calculate distances from origin to each location
         * returns a deferred promise
         * @param origin
         * @param events
         * @returns {*}
         */
        this.getDistanceToLocations = function (origin, events) {
            var event, destinations = [], x, start, d = $q.defer();

            try {
                if (angular.isDefined(origin) && angular.isDefined(events) && angular.isArray(events)) {

                    //If string, then it is a zip code
                    if (typeof origin === "string") {
                        start = origin;
                    } else {
                        //There is a specific lat/lng in the object
                        start = new google.maps.LatLng(origin.coords.latitude, origin.coords.longitude);
                    }

                    //Max of 25 requests allowed by google
                    var len = (events.length > 24 ? 25 : events.length);

                    for (x = 0; x < len; x++) {
                        //Location is a google.maps.LatLng object
                        destinations.push(events[x].position[0].geometry.location);
                    }

                    var callback = function (response, status) {
                        if (status === "OK" && angular.isArray(response.rows)) {
                            d.resolve(response);
                        } else {
                            d.reject(status);
                        }
                    };

                    var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix({
                        origins: [start],
                        destinations: destinations,
                        travelMode: google.maps.TravelMode.DRIVING,
                        //Default is METRIC, but using IMPERIAL/miles
                        unitSystem: google.maps.UnitSystem.IMPERIAL,
                        avoidHighways: false,
                        avoidTolls: false
                    }, callback);
                }
            } catch (err) {
                //Something unexpected happened
                d.reject(err);
            }
            return d.promise;
        };

        /**
         * Calls the Google Maps API to get a location object with a provided
         * geocode request containing an Address
         */
        this.geocode = function (request) {
            var d, address;
            d = $q.defer();
            try {
                if (angular.isDefined(request) && angular.isDefined(request.venue)) {
                    //Create the search criteria
                    address = request.venue.city + ', ' + request.venue.state;

                    var callback = function (response, status) {
                        if (status === "OK") {
                            //Put the data on the event object
                            request.position = response;
                            //$rootScope.$apply(function() {
                            d.resolve(request);
                            //});
                            //$rootScope.$apply(function() {
                            //d.reject(status);
                            //});
                        }
                        else
                        {
                            d.reject(status);
                        }
                    };

                    //Send the geocode request
                    var service = new google.maps.Geocoder();
                    service.geocode({
                        address: address
                    }, callback);
                }
            } catch (err) {
                //Something unexpected happened
                d.reject(err);
            }
            return d.promise;
        };

    }
]);

