var app = angular.module('eventApp', ['ngRoute', 'ngGrid']);

app.config(function($routeProvider, $locationProvider){

    $routeProvider.
        when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        }).
       /* when('/edit', {
            templateUrl: 'views/event_form.html',
            controller: 'EditEventCtrl'
        }).*/
        when('/add', {
            templateUrl: 'views/event_form.html',
            controller: 'AddEventCtrl'
        }).
        /*when('/edit/:name', {
            templateUrl: 'views/event_form.html',
            controller: 'EditEventCtrl'
        }).*/
        otherwise({
            redirectTo: 'views/notfound'
        });
    // enable html5Mode for pushstate ('#'-less URLs)
   // $locationProvider.html5Mode(true);
   // $locationProvider.hashPrefix('!');
});//.run(function() {

//});

app.controller('MainCtrl', function ($scope, EventService, $location) {

    /**
     *
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

    $scope.editEvent = function ()
    {
        if($scope.selectedEvent !== null){
            //alert('Editing ' + $scope.selectedEvent);
        }
    };

    $scope.deleteEvent = function ()
    {
        if($scope.selectedEvent !== null){
            alert('Deleting ' + $scope.selectedEvent);
        }
    };

    $scope.selectedEvent = null;

    $scope.gridOptions = {
        data: 'myData',
        afterSelectionChange: function (theRow, evt) {
            //alert(theRow.entity.id);
            $scope.selectedEvent = theRow.entity.id;
        },
        columnDefs: [
            {field: 'name', displayName: 'Event Name', width: '220px'},
            {field: 'date', displayName: 'Date', cellFilter: 'date', width: '93px'},
            {field: 'venue.name', displayName: 'Venue', width: '200px'},
            {field: 'venue.city', displayName: 'City', width: '150px'},
            {field: 'venue.state', displayName: 'State', width: '90px'},
            {field: 'venue.id', displayName: 'Action', width: '100px',
                cellTemplate: '<div class="itemRendererContainer">' +
                    '<div class="itemRenderer"><a href="" ng-click="editEvent()">Edit</a></div>' +
                    '<div class="itemRenderer"><a href="" ng-click="deleteEvent()">Delete</a></div>' +
                    '</div>'}

        ]
    };

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

    $scope.handleAddEvent = function (){
        $location.path("/add");
        //$location.path('/newValue');
    };


    var initialize = function () {
        $scope.busy = false;
        getAll();
    };

    //Initialize the controller on app load:
    initialize();

});
