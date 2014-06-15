/**
 * Created with WebStorm.
 * User: Mike Gray
 * Date: 6/5/14
 */
angular.module('eventApp').factory('LocationService', function ($q, EventService, googleMapService, $filter) {
    /*
     * If the device can use geolocation services,
     * calculate the users location and use that info
     * to look up the closest venues
     */

    function getLocaleFromPosition(pos) {
        if (pos == null) {
            return;
        }

        //Get the accuracy (in meters)
        var accuracy = pos.coords.accuracy;
        //If greater than 400 km, ask user for manual address.
        if (accuracy > 400000) {
            //alert ("Location was not specific enough\nPlease enter an address, or zip code");
            return;
        }

        try {
            // fetch coordinates and store into a Google Maps LatLng object
            var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
            //var for looping declared outside of loop
            var f = 0;

            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({'latLng': latlng}, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        //Try to get the zip code for the users location
                        $.each(results, function (key, val) {
                            if (val != null) {
                                //Loop through the address components and search for zip code
                                for (f = 0; f < val.address_components.length; f++) {
                                    if (!isNaN(val.address_components[f].short_name) && val.address_components[f].short_name.length == 5) {
                                        //Use this to get venues close to user

                                        //Break out of the inner loop by returning false.
                                        return( false );
                                    }
                                }

                            }
                        });
                    }
                } else {
                    //If we are in this block, the status is not google.maps.GeocoderStatus.OK.
                    // This most likely means we are over the limit for requests (happened during heavy testing)
                    //Do a defer.reject() and handle the error gracefully
                }
            });

        } catch (error) {
            //Do a defer.reject() and handle the error gracefully
        }
    }


    /*
     * Geolocation lookup error handler.
     * If anything goes wrong, ask the user to manually enter their location
     * Makes subsequent call to open a input control for manual input.
     * Give them useful feedback as well.
     */
    /*
     function geocodeErrorHandler(err) {

     if(err.code == err.POSITION_UNAVAILABLE){
     deferred.reject("That location was not found");
     }
     else if(err.code == err.PERMISSION_DENIED){
     deferred.reject("Geolocation services disabled.");
     }
     else{
     deferred.reject("Your location cannot be determined");
     }
     }
     */


    /**
     * Service to get location from device geolocation
     */
    /*
     this.getNavigatorLocation = function(params) {
     var httpRequest =  navigator.geolocation.getCurrentPosition(locationsSuccess, locationsFailure, opts);
     //var httpRequest = locations.cities(params.state_code);
     return httpRequest(null);
     };
     */

    /**
     * Get the team/club info that is closest to my current position
     */
    /*
     var loadClubDistances = function (fromLatLng, venues) {

     distanceArray = [];

     //var geocoder = new google.maps.Geocoder();
     var leastDistance = 0;
     var leastDistanceObject = 0;
     var dist = 0;
     var toLatLng;

     //40.7127° N, 74.0059° W New York
     //42.1022° N, 75.9117° W Binghamton
     //37.8136° S, 144.9631° E Melbourne
     //41.7633° N, 88.2900° W Aurora, IL
     //41.8819° N, 87.6278° W Chicago, IL
     //36.1215° N, 115.1739° W Las Vegas, NV




     for (var key in venues) {
     //if(key != 'mlb' && key != 'wbc'){

     toLatLng = new google.maps.LatLng(clubLocationsArray[key][0], clubLocationsArray[key][1]);
     dist = google.maps.geometry.spherical.computeDistanceBetween(fromLatLng, toLatLng);

     if(leastDistance == 0 && dist > 0){
     leastDistance = dist;
     leastDistanceObject = clubArray[key];
     }

     if(dist <  leastDistance){
     leastDistance = dist;
     leastDistanceObject = clubArray[key];
     }
     //}
     }

     //Found the closest team and have it's data object
     //Now load the closest team data and display
     loadClosestTeam(leastDistanceObject);
     //}
     }
     */

    /*
     * The user can manually enter an address
     * This function will take a free form address and try to look up info
     */
    var getLocaleFromAddess = function (address) {
        var deferred = $q.defer();
        if (address == null) {
            deferred.reject(null);
        }

        var f = 0; //var for looping declared outside of loop for effeciency
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({'address': address}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {

                    var latlng = new google.maps.LatLng(results[0].geometry.location.Ia, results[0].geometry.location.Ja);
                    //loadClubDistances(latlng);

                    //Try to get the zip code for the users location
                    $.each(results, function (key, val) {
                        //for each( var result in results), function(key, val) {
                        if (val != null) {
                            //Loop through the address components and search for zip code
                            for (f = 0; f < val.address_components.length; f++) {
                                if (!isNaN(val.address_components[f].short_name) && val.address_components[f].short_name.length == 5) {
                                    //Use this to lookup local news and weather
                                    //lookupLocalInfo(val.address_components[f].short_name);
                                    //saveLocalesToStorage(val.address_components[f].short_name, val.formatted_address);
                                    //Break out of the inner loop by returning false.
                                    return( false );
                                }
                                //If all else fails, just go with the full address
                                if (val.formatted_address != null) {
                                    //lookupLocalInfo(val.formatted_address);
                                }
                            }
                        }
                    });


                    return;
                }
            }
            else {
                //If we are in this block, the status is not google.maps.GeocoderStatus.OK.
                // This most likely means we are over the limit for requests (happened during heavy testing)
                // Don't show an alert. User may get too many of these
                // alert("There was a problem finding the location entered\nPlease try again");
            }
        });
        return deferred;


        try {
            var f = 0; //var for looping declared outside of loop for effeciency
            var geocoder = new google.maps.Geocoder();

        } catch (error) {
            //Gracefully handle problem and give feedback to user so they know something happened to their request
            alert("There was a problem finding the location entered\nPlease try again");
        }
    }

    /** Take the combined array of locations and atms, and sort based on distance.
     * Called  */
    var sortLocationsByDistance = function (locations) {
        return $filter('orderBy')(locations, '+distance.value');
    };

    var getClosestEvents = function (locations) {
        var returnValue = [];
        if (locations !== null && angular.isArray(locations) && locations.length > 0) {
            locations = sortLocationsByDistance(locations);

            var distance = locations[0].distance.value;
            returnValue.push(locations[0]);

            for (var x = 1; x < locations.length; x++) {
                //Look for venues in roughly a 70 mile radius
                if (locations[x].distance.value <= distance + 120000) {
                    returnValue.push(locations[x]);
                }
                else {
                    //Since array is sorted by distance, no need to continue loop
                    break;
                }
            }
        }

        return returnValue;
    };

    /*
     For each location object in the locations collection,
     Send off to the google maps API (in one call) to get the distances
     from the currentSearchPosition.
     NOTE: Max of 25 locations allowed by google API
     */

    var calculateDistances = function (currentPosition, locations) {
        if (angular.isDefined(currentPosition) && currentPosition !== null) {

            if (angular.isArray(locations) && locations.length > 0) {
                var promiseArray = [];
                var subRequest = [];
                var distancePromise;


                for (var x = 0; x < locations.length; x++) {

                    subRequest.push(locations[x]);
                    if (x > 0 && x % 24 === 0) {
                        distancePromise = googleMapService.getDistanceToLocations(currentPosition, subRequest);
                        promiseArray.push(distancePromise);
                        subRequest = [];
                    }
                }

                if (subRequest.length > 0) {
                    distancePromise = googleMapService.getDistanceToLocations(currentPosition, subRequest);
                    promiseArray.push(distancePromise);
                }

                //Q offers 'allSettled', that does the same as 'all', but completes whether
                //all promises were success or not.
                //Angular not have (yet) :-(
                //So if any promise fails, the error handler is called.
                return $q.all(promiseArray)
                    .then(function (data) {
                        //getDistanceToLocations - success
                        if (angular.isArray(data)) {
                            var distances = [], x;
                            for (x = 0; x < data.length; x++) {

                                //Combine the items back into a single collection
                                distances = distances.concat(data[x].rows[0].elements);
                            }

                            //Update the distances on each event
                            for (x = 0; x < distances.length; x++) {
                                locations[x].distance = distances[x].distance;
                            }
                            return getClosestEvents(locations);
                        }

                    }, function (error) {
                        //If any promise fails, you'll end up here
                        //Just return the collection of locations un-modified
                        return locations;
                    });
            }

        }
        //Return the collection of locations un-modified
        //if distances can not be calculated
        return locations;
    };

    /**
     * Try to get user's location using device location service
     */

    var getCurrentLocation = function () {

        var deferred = $q.defer();

        var locationsSuccess = function (data) {
            deferred.resolve(data);
        };
        var locationsFailure = function (err) {
            if (err.code == err.POSITION_UNAVAILABLE) {
                deferred.reject("That location was not found");
            }
            else if (err.code == err.PERMISSION_DENIED) {
                deferred.reject("Geolocation services disabled.");
            }
            else {
                deferred.reject("Your location cannot be determined");
            }
        };

        if (navigator.geolocation) {
            //Get the users location
            var opts = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 100000
            };
            navigator.geolocation.getCurrentPosition(locationsSuccess, locationsFailure, opts);
        }
        else {
            deferred.reject("Could not determine your location");
        }
        return deferred.promise;
    };

    /**
     *  Gets events that are near a user's location.
     * @param origin  - Can be a location object, or a zip code string
     * @returns {promise|*}
     */
    var getNearbyEvents = function (origin) {

        var deferred = $q.defer();

        //Get a fresh set of event data:
        EventService.all().then(function (events) {
            if (events !== null && angular.isArray(events)) {
                var dist = 0;
                var distanceArray = null;
                var promiseArray = [];
                var distancePromise;

                //Go through the events and put the google lat/lag on them
                for (var x = 0; x < events.length; x++) {
                    if (!angular.isDefined(events[x].position)) {
                        //Put a lat/lng on the object if it isn't there already
                        //Need to create an array of promises here to do a bunch of work
                        distancePromise = googleMapService.geocode(events[x]);
                        promiseArray.push(distancePromise);
                    }
                }

                if (promiseArray.length > 0) {
                    // Kick off the request to Google...
                    // $q.all() combines multiple promises into a single promise
                    // that is resolved when all of the input promises are resolved.
                    $q.all(promiseArray).then(
                        function (data) {
                            //Each event in the data collection now has a position added.
                            //Calculate the distances from the origin for each
                            calculateDistances(origin, data).then(function (data) {
                                    //Distance to events - success
                                    deferred.resolve(data);
                                },
                                function (err) {
                                    //Distance to events - error
                                    deferred.reject(err);
                                });

                        }, function (err) {
                            //Error getting locale info
                            deferred.reject(err);
                        }
                    );
                }
                else {
                    //We already have lat/lng for each event
                    //Calculate the distances from the origin for each
                    calculateDistances(origin, events).then(function (data) {
                            deferred.resolve(data);
                        },
                        function (err) {
                            deferred.reject(err);
                        });
                }
            }
            else {
                deferred.reject('Events could not be found');
            }
        }, function (err) {
            //Return an error
            deferred.reject('Events could not be found');
        });

        return deferred.promise;
    };

    return {
        getCurrentLocation: getCurrentLocation,
        getNearbyEvents: getNearbyEvents
    };

});
