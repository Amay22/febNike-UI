(function() {
  'use strict';

  angular
    .module('nike')
    .controller('TitleController', TitleController);

  TitleController.$inject = ['titleService','$location', 'ratingService'];

  function TitleController (titleService, $location , ratingService) {
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