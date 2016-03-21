(function() {

  angular
    .module('nike')
    .service('titleService', titleService);

  titleService.$inject = ['$http', '$q', 'CONFIG'];

  function titleService($http, $q, CONFIG) {
    var titleServe = this;

    titleServe.getAllTitles = function(){
        return $http.get(CONFIG.API_END_POINT +'/titles')
            .then(successFn, errorFn);
    }

    titleServe.getTitleById = function(id){
        return $http.get(CONFIG.API_END_POINT + '/titles/' + id)
                .then(successFn, errorFn);
    }

    titleServe.getTitleByGenre = function(genre){
        return $http.get(CONFIG.API_END_POINT + '/titles/genre/' + genre)
                .then(successFn, errorFn);
    }

    titleServe.getTitleByYear = function(year){
        return $http.get(CONFIG.API_END_POINT + '/titles/year/' + year)
                .then(successFn, errorFn);
    }

    titleServe.getTitleByType = function(type){
        return $http.get(CONFIG.API_END_POINT + '/titles/type/' + type)
                .then(successFn, errorFn);
    }

    titleServe.getTitleByTitle = function(title){
        return $http.get(CONFIG.API_END_POINT + '/titles/title/' + title)
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