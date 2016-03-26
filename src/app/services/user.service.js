(function() {

  angular
    .module('nike')
    .service('userService', userService);

  userService.$inject = ['$http', '$q', 'CONFIG'];

  function userService($http, $q, CONFIG) {
    var userServe = this;

    userServe.login = function(user){
        return $http.post(CONFIG.API_END_POINT + '/users/login', user)
            .then(successFn, errorFn);
    }

    userServe.register = function(user){
        return $http.post(CONFIG.API_END_POINT + '/users/new', user)
            .then(successFn, errorFn);
    }

    userServe.getUserByEmail = function(email){
        var dot = email.lastIndexOf('.');
        return $http.get(CONFIG.API_END_POINT + '/users/email/' + email + '/')
            .then(successFn, errorFn);
    }

    function successFn (response) {
      return response.data;
    }

    function errorFn (response) {
      return $q.reject(response.status);
    }
  }
})();