(function() {
  'use strict';

  angular
    .module('nike')
    .controller('TitleController', TitleController);

  TitleController.$inject = ['titleService', 'ratingService', '$window', '$uibModal', '$route'];

  function TitleController (titleService , ratingService, $window, $uibModal, $route) {
    var titleCtrl = this;

    titleCtrl.filterTypes = [];
    titleCtrl.filterGenres = [];
    titleCtrl.filterYears= [];

    init();

    function init(){
        titleService.getAllTitles().then(successFn, errorFn);
    }

    titleCtrl.sortTitle = function(sortType){
        titleCtrl.titles = _.sortBy(titleCtrl.titles, sortType).reverse();
    };

    titleCtrl.filterTitles = function(filterType) {
        if(filterType === 'type'){
            titleService.getTitleByType(titleCtrl.selectedType).then(successFn, errorFn)
        }else if(filterType === 'year'){
            titleService.getTitleByYear(titleCtrl.selectedYear).then(successFn, errorFn)
        }else if(filterType === 'genre'){
            titleService.getTitleByGenre(titleCtrl.selectedGenre).then(successFn, errorFn)
        }
    }

    titleCtrl.searchTitle = function() {
        titleService.getTitleByTitle(titleCtrl.searchTitleInput).then(successFn, errorFn)
    }


    titleCtrl.getTopRated = function() {
        ratingService.getTopRated().then(successFn, errorFn)
    }

    titleCtrl.isAdmin = function(){
        return $window.sessionStorage.getItem('currentUserRole') === 'admin';
    };

    titleCtrl.deleteTitle = function(id){
      titleService.removeTitle(id);
    };

    titleCtrl.getTitleIMDB = function(){
      titleService.getTitleIMDB(titleCtrl.AddTitle)
      .then(function(result) {
          if(result.Response == 'False'){
            alert('IMDB Retrieval Error: '+result.Error);
          }else{
            titleCtrl.open(result);
          }
        })
      .catch(function(error) {
        console.log(error);
      });
    }


      titleCtrl.open = function (result) {
        var modalInstance = $uibModal.open({
          templateUrl: 'AddTitleModal',
          controller: 'AddTitleController as AddTitleCtrl',
          resolve: { title: result}
        });
      }

    function successFn (data) {
        titleCtrl.titles = data;
        titleCtrl.filterTypes = _.uniq(_.map(data, function(o) { return o.type}));
        titleCtrl.filterGenres = _.uniq(_.map(data, function(o) { return o.genre}));
        titleCtrl.filterYears = _.uniq(_.map(data, function(o) { return o.year}));
    }

    function errorFn (error) {
        console.log(error);
    }
  }
})();