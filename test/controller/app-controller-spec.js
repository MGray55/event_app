/**
 * Created with WebStorm.
 * User: Mike Gray
 * Date: 6/11/14
 */
describe("MainCtrl tests", function () {
    'use strict';
    var  createController, $rootScope, $scope,  $location;

    beforeEach(module('eventApp'));

    beforeEach(inject(function ($injector) {
        var $controller = $injector.get('$controller');
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        $location = $injector.get('$location');
        createController = function() {
            return $controller('MainCtrl', {
                $scope: $scope,
                $location: $location
            });
        };

    }));

    describe("When initializing the controller", function () {
        it('Should create the controller instance', function () {

            var ctrl = createController();
            expect(ctrl).toBeDefined();
        });

        it('Should create the tabs and set the default tab', function () {

            expect($scope.currentTab).toBeUndefined();
            expect($scope.tabs).toBeUndefined();

            var ctrl = createController();
            expect(ctrl).toBeDefined();

            expect($scope.tabs).not.toBeUndefined();
            expect($scope.tabs.length).toEqual(3);

            expect($scope.currentTab).not.toBeUndefined();
            expect($scope.currentTab).toEqual('all.html');
        });
    });

    it('Should return the correct state of the currently selected tab', function () {

        var ctrl = createController();
        expect(ctrl).toBeDefined();

        expect($scope.isActiveTab(null)).toEqual(false);
        expect($scope.isActiveTab('all.html')).toEqual(true);
    });

    it('Should update the URL for bookmarking when the tab is clicked', function () {

        var ctrl = createController();
        expect(ctrl).toBeDefined();
        expect($location.path()).toEqual('');

        var mockTab1 = {url:'tab1.html'};
        var mockTab2 = {url:'tab2.html'};

        $scope.onClickTab(mockTab1, 0);
        expect( $scope.currentTab).toEqual('tab1.html');
        expect($location.path()).toEqual('/0');

        $scope.onClickTab(mockTab2, 1);
        expect( $scope.currentTab).toEqual('tab2.html');
        expect($location.path()).toEqual('/1');
    });

});