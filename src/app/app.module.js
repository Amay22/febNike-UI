(function() {
  'use strict';

  angular
    .module('nike', ['ngRoute', 'ui.bootstrap'])
    .config(nikeConfig)
    .run(function($rootScope, $location, $window){
       return $rootScope.$on('$routeChangeStart', function(event, next, current) {
          if($location.path() === '/user' && $window.sessionStorage.getItem('currentUser') !== null){
              $location.path('/title');
          }else if($location.path() === '/title-edit' && $window.sessionStorage.getItem('currentRole') !== 'admin'){
              $location.path('/title');
          }
        });
  });

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
      .otherwise({
        redirectTo: '/title'
      });
  }
})();