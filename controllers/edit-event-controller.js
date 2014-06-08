/**
 * Created by Michael_Gray1 on 6/6/2014.
 */
angular.module('eventApp').controller('EditEventCtrl', function($scope, $rootScope, EventService, $location, $log, $routeParams, StatesService) {
    "use strict";

    $scope.header_title = 'Edit Event (click to go back)';
    $scope.title = 'Edit Event';
    $scope.busy = false;
    $scope.event = null;

    var id = null;

    $scope.handleEditSaveClick = function ()
    {

        //Gather the details from edit,

        //Call service to update data

        //On success, navigate back to main page

        //On error display an error message to user
    };

    var getEventById = function (event){

        if(angular.isDefined(event) && event !== null){
               EventService.eventById(event).then(function (data) {
                   $scope.event = data;
                   $scope.busy = false;
               }, function (err) {
                   $scope.event = null;
                   $scope.busy = false;
               });
        }
    };

    /** Clears any state search filters */
    $scope.clearSearch = function () {
        $scope.state = null;
        $scope.busy = false;
    };

    var loadStates = function () {
        if($scope.states === null){
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
        //Get the selected event id from the route params
        id = $routeParams.name;
        if(angular.isDefined(id) && id !== null)
        {
            getEventById(id);
        }
        loadStates();
    };

    $scope.goBack = function () {
        $location.path('/');
    };

    //Initialize the controller on app load:
    initialize();

});
