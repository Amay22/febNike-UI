(function() {
  'use strict';

  angular
    .module('nike')
    .controller('TitleDetailController', TitleDetailController);

  TitleDetailController.$inject = ['titleService','commentService', 'ratingService', '$routeParams', '$window' ];

  function TitleDetailController (titleService, commentService, ratingService, $routeParams , $window) {
    var titleDetailCtrl = this;
    titleDetailCtrl.userRated = 1;

    init();

    function init(){
        titleService.getTitleById($routeParams.id).then(successFn, errorFn);
        // Get Average Rating
        ratingService.getAverageRatingbyTitleId($routeParams.id)
            .then(function(data) {
                titleDetailCtrl.averageRating = data;
            })
            .catch(function(error) {
                console.log(error);
            });
        // Get All Comments
        commentService.getCommentbyTitleId($routeParams.id)
            .then(function(data) {
                titleDetailCtrl.allComments = data;
            })
            .catch(function(error) {
                console.log(error);
            });
        if($window.sessionStorage.getItem('currentUser') !== null){
            ratingService.getRatingbyTitleId($routeParams.id, $window.sessionStorage.getItem('currentUserId'))
            .then(function(data) {
                titleDetailCtrl.userRated = data.rating;
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    }

    titleDetailCtrl.addRating = function(){
        if(titleDetailCtrl.isLoggedin()){
          var rating = { "rating": parseInt(titleDetailCtrl.userRated) };
          ratingService.addRating($routeParams.id, $window.sessionStorage.getItem('currentUserId'), rating)
          .then(function(data) {})
          .catch(function(error) {
                console.log(error);
            });
        }
    };

    titleDetailCtrl.addComment = function(){
        if(titleDetailCtrl.isLoggedin()){
          var comment = { "comments": titleDetailCtrl.addedComment };
          commentService.addComment($routeParams.id, $window.sessionStorage.getItem('currentUserId'), comment)
          .then(function(data) {
            titleDetailCtrl.addedComment = "";
          })
          .catch(function(error) {
                console.log(error);
            });
        }
    };

    titleDetailCtrl.isLoggedin = function(){
        return $window.sessionStorage.getItem('currentUser') !== null;
    };
  }
})();