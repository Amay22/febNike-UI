(function() {

  angular
    .module('nike')
    .service('ratingService', ratingService);

  ratingService.$inject = ['$http', '$q', 'CONFIG'];

  function ratingService($http, $q, CONFIG) {
    var ratingServe = this;

    ratingServe.getRatingbyTitleId = function(titleId, userId){
        return $http.get(CONFIG.API_END_POINT + '/ratings/' + titleId + '/' + userId)
            .then(successFn, errorFn);
    }

    ratingServe.getRatingbyUserId = function(userId){
        return $http.get(CONFIG.API_END_POINT + '/ratings/user/' + userId)
            .then(successFn, errorFn);
    }

    ratingServe.getAverageRatingbyTitleId = function(titleId){
        return $http.get(CONFIG.API_END_POINT + '/ratings/average/' + titleId)
            .then(successFn, errorFn);
    }

    ratingServe.getTopRated = function(){
        return $http.get(CONFIG.API_END_POINT + '/ratings/toppicks')
            .then(successFn, errorFn);
    }

    ratingServe.addRating = function(titleId ,userId , rating){
        return $http.post(CONFIG.API_END_POINT + '/ratings/new/' + titleId + '/' + userId, rating)
            .then(successFn, errorFn);
    }

    function successFn (response) {
        return response.data;
    }

    function errorFn(response) {
        return $q.reject(response.status);
    }
  }
})();