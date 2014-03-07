'use strict';
var App = angular.module('clientApp', ['ngResource', 'App.filters']);
App.controller('ClientCtrl', ['$scope', function ($scope) {
    $scope.selectedCompany = [];
    $scope.companyList = [{
        id: 1,
        name: 'Apple'
    }, {
        id: 2,
        name: 'Facebook'
    }, {
        id: 3,
        name: 'Google'
    }];

    $scope.clients = [{
        name: 'Brett',
        designation: 'Software Engineer',
        company: {
            id: 1,
            name: 'Apple'
        }
    }, {
        name: 'Steven',
        designation: 'Database Administrator',
        company: {
            id: 3,
            name: 'Google'
        }
    }, {
        name: 'Jim',
        designation: 'Designer',
        company: {
            id: 2,
            name: 'Facebook'
        }
    }, {
        name: 'Michael',
        designation: 'Front-End Developer',
        company: {
            id: 1,
            name: 'Apple'
        }
    }, {
        name: 'Josh',
        designation: 'Network Engineer',
        company: {
            id: 3,
            name: 'Google'
        }
    }, {
        name: 'Ellie',
        designation: 'Internet Marketing Engineer',
        company: {
            id: 1,
            name: 'Apple'
        }
    }];

    $scope.setSelectedClient = function () {
        var id = this.company.id;
        if (_.contains($scope.selectedCompany, id)) {
            $scope.selectedCompany = _.without($scope.selectedCompany, id);
        } else {
            $scope.selectedCompany.push(id);
        }
        return false;
    };

    $scope.isChecked = function (id) {
        if (_.contains($scope.selectedCompany, id)) {
            return 'icon-ok pull-right';
        }
        return false;
    };

    $scope.checkAll = function () {
        $scope.selectedCompany = _.pluck($scope.companyList, 'id');
    };
}]);

angular.module('App.filters', []).filter('companyFilter', [function () {
    return function (clients, selectedCompany) {
        if (!angular.isUndefined(clients) && !angular.isUndefined(selectedCompany) && selectedCompany.length > 0) {
            var tempClients = [];
            angular.forEach(selectedCompany, function (id) {
                angular.forEach(clients, function (client) {
                    if (angular.equals(client.company.id, id)) {
                        tempClients.push(client);
                    }
                });
            });
            return tempClients;
        } else {
            return clients;
        }
    };
}]);