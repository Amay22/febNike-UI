(function() {
  'use strict';

  angular
    .module('nike', ['ngRoute', 'ui.bootstrap'])
    .config(nikeConfig);

  nikeConfig.$inject = ['$routeProvider'];

  function nikeConfig($routeProvider) {
    $routeProvider
      .when('/user', {
        templateUrl: 'views/user.tmpl.html',
        controller: 'UserController',
        controllerAs: 'userCtrl'
      })
      .when('/title', {
        templateUrl: 'views/title.tmpl.html',
        controller: 'TitleController',
        controllerAs: 'titleCtrl'
      })
      .when('/title/:id', {
        templateUrl: 'views/title-detail.tmpl.html',
        controller: 'TitleDetailController',
        controllerAs: 'titleDetailCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.tmpl.html',
        controller: 'TitleController',
        controllerAs: 'titleCtrl'
      })
      .otherwise({
        redirectTo: '/title'
      });
  }
})();