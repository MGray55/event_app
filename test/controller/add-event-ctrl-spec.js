/**
 * Created with WebStorm.
 * User: Mike Gray
 * Date: 6/11/14
 */
describe("AddEventCtrl tests", function () {
    'use strict';

    var  createController, $rootScope, $scope, $location, $filter, $q, deferred;

    var statesServiceMock = {
        getStates: function () {
            deferred = $q.defer();
            return deferred.promise;
        }
    };

    beforeEach(module('eventApp'));

    beforeEach(inject(function ($injector) {
        var $controller = $injector.get('$controller');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $location = $injector.get('$location');
        $filter = $injector.get('$filter');
        $q = $injector.get('$q');
        createController = function() {
            return $controller('AddEventCtrl', {
                $scope: $scope,
                $location: $location,
                $filter: $filter,
                StatesService: statesServiceMock
            });
        };

    }));

    describe("When initializing the controller", function () {
        it('Should create the controller and load the states', function () {

            var ctrl = createController();
            expect(ctrl).toBeDefined();

            expect($scope.states).toBeDefined();
            expect($scope.states).toEqual(null);

            deferred.resolve([
                {
                    code: 'AL',
                    desc: 'Alabama'
                },
                {
                    code: 'AK',
                    desc: 'Alaska'
                },
                {
                    code: 'AZ',
                    desc: 'Arizona'
                }
            ]);
            $rootScope.$apply();
            expect($scope.states.length).toEqual(3);
        });

    });

    it('Should navigate back to the home page when back button clicked', function () {

        var ctrl = createController();
        expect(ctrl).toBeDefined();
        expect($location.path()).toEqual('');
        $scope.goBack();
        expect($location.path()).toEqual('/');

    });


});