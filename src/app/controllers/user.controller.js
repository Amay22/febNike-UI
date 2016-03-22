(function() {
  'use strict';

  angular
    .module('nike')
    .controller('UserController', UserController);

  UserController.$inject = ['userService', '$http', '$location', '$window'];

  function UserController (userService,  $http, $location, $window) {
    var userCtrl = this;

    userCtrl.login = function(){
        userService.login(userCtrl.info)
            .then(function(data) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
                $window.sessionStorage.setItem('currentUser',  data.token);
                $window.sessionStorage.setItem('currentUserId',  data.id);
                $window.sessionStorage.setItem('currentUserRole',  data.role);
                $location.path('/title');
            }).catch(function(error) {
                alert('Invalid Username Or Password');
                userCtrl.info = null;
            });
    };

    userCtrl.register = function(){
        userService.register(userCtrl.info)
            .then(function(data) {
                $location.path('/user');
            })
            .catch(function(error) {
                console.log(error);
            });
    };
  }
})();