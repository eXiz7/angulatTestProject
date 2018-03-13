'use strict';

angular.module('testApp').config(($routeProvider, $locationProvider) => {
      $routeProvider.
        when('/items', {
          template: '<item-list></item-list>'
        }).
        when('/statistic', {
          template: '<item-statistic></item-statistic>'
        }).
        otherwise('/items');
        $locationProvider.html5Mode(true);
    }
  );
