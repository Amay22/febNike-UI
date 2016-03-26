(function() {

  angular
    .module('nike')
    .service('titleService', titleService);

  titleService.$inject = ['$http', '$q', 'CONFIG', '$window'];

  function titleService($http, $q, CONFIG, $window) {
    var titleServe = this;

    titleServe.getTitleIMDB = function(addTitleId){
      return $http.get('http://www.omdbapi.com/?i='+ addTitleId).then(successFn, errorFn);
    }

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

    titleServe.addTitle = function(title){
        title.Runtime = title.Runtime.replace(' min', '')
        while(title.imdbVotes.indexOf(',') > -1){
            title.imdbVotes = title.imdbVotes.replace(',' , '');
        }
        title.Released = "";
        for (var key in title) {
            title[''+ key.substring(0,1).toLowerCase() + key.substring(1)] = title[key];
        }
        return $http.post(CONFIG.API_END_POINT + '/titles/new/' + $window.sessionStorage.getItem('currentUser') + '/', title)
            .then(successFn, errorFn);
    }

    titleServe.removeTitle = function(titleId){
        return $http.delete(CONFIG.API_END_POINT + '/titles/delete/' + titleId + '/' + $window.sessionStorage.getItem('currentUser') + '/')
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