/**
 * Created by Michael_Gray1 on 6/6/2014.
 */
angular.module('eventApp').controller('AddEventCtrl', function($scope, $rootScope, $location, $filter, $routeParams) {
    "use strict";

    $scope.title = 'Add An Event (click to go back)'

    //Model for text search
    $scope.state = null;
    $scope.stateSelected = function(selectedState) {

    };

    /** Watcher for when user types filter criteria and applies filter */
    $scope.$watch("state", function(query) {
        $scope.counted = $filter("filter")($scope.states, query).length;
        $scope.noFilteredResults = ($scope.counted === 0);
    });

    /** To get rid of flicker that still appears when using ng-show and ng-hide */
    $scope.clearSearchStyle = function() {
        if ($scope.noFilteredResults) {
            return "visible";
        }
        return "invisible";
    };

    /** Clears any state search filters */
    $scope.clearSearch = function() {
        $scope.state = null;
        $scope.busy = false;
    };

    $scope.states = [{
        code: 'AL',
        desc: 'Alabama'
    }, {
        code: 'AK',
        desc: 'Alaska'
    }, {
        code: 'AZ',
        desc: 'Arizona'
    }, {
        code: 'AR',
        desc: 'Arkansas'
    }, {
        code: 'CA',
        desc: 'California'
    }, {
        code: 'CO',
        desc: 'Colorado'
    }, {
        code: 'CT',
        desc: 'Connecticut'
    }, {
        code: 'DE',
        desc: 'Deleware'
    }, {
        code: 'DC',
        desc: 'District Of Columbia'
    }, {
        code: 'FL',
        desc: 'Florida'
    }, {
        code: 'GA',
        desc: 'Georgia'
    }, {
        code: 'HI',
        desc: 'Hawaii'
    }, {
        code: 'ID',
        desc: 'Idaho'
    }, {
        code: 'IL',
        desc: 'Illinois'
    }, {
        code: 'IN',
        desc: 'Indiana'
    }, {
        code: 'IA',
        desc: 'Iowa'
    }, {
        code: 'KS',
        desc: 'Kansas'
    }, {
        code: 'KY',
        desc: 'Kentucky'
    }, {
        code: 'LA',
        desc: 'Louisiana'
    }, {
        code: 'ME',
        desc: 'Maine'
    }, {
        code: 'MD',
        desc: 'Maryland'
    }, {
        code: 'MA',
        desc: 'Massachusetts'
    }, {
        code: 'MI',
        desc: 'Michigan'
    }, {
        code: 'MN',
        desc: 'Minnesota'
    }, {
        code: 'MS',
        desc: 'Mississippi'
    }, {
        code: 'MO',
        desc: 'Missouri'
    }, {
        code: 'MT',
        desc: 'Montana'
    }, {
        code: 'NE',
        desc: 'Nebraska'
    }, {
        code: 'NV',
        desc: 'Nevada'
    }, {
        code: 'NH',
        desc: 'New Hampshire'
    }, {
        code: 'NJ',
        desc: 'New Jersey'
    }, {
        code: 'NM',
        desc: 'New Mexico'
    }, {
        code: 'NY',
        desc: 'New York'
    }, {
        code: 'NC',
        desc: 'North Carolina'
    }, {
        code: 'ND',
        desc: 'North Dakota'
    }, {
        code: 'OH',
        desc: 'Ohio'
    }, {
        code: 'OK',
        desc: 'Oklahoma'
    }, {
        code: 'OR',
        desc: 'Oregon'
    }, {
        code: 'PA',
        desc: 'Pennsylvania'
    }, {
        code: 'RI',
        desc: 'Rhode Island'
    }, {
        code: 'SC',
        desc: 'South Carolina'
    }, {
        code: 'SD',
        desc: 'South Dakota'
    }, {
        code: 'TN',
        desc: 'Tennessee'
    }, {
        code: 'TX',
        desc: 'Texas'
    }, {
        code: 'UT',
        desc: 'Utah'
    }, {
        code: 'VT',
        desc: 'Vermont'
    }, {
        code: 'VA',
        desc: 'Virginia'
    }, {
        code: 'WA',
        desc: 'Washington'
    }, {
        code: 'WV',
        desc: 'West Virginia'
    }, {
        code: 'WI',
        desc: 'Wisconsin'
    }, {
        code: 'WY',
        desc: 'Wyoming'
    }];

    var initialize = function () {
        $scope.busy = false;
    };

    $scope.goBack = function ()
    {
      $location.path('/');
    };

    //Initialize the controller on app load:
    initialize();

});

