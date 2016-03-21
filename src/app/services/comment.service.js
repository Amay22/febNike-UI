(function() {

  angular
    .module('nike')
    .service('commentService', commentService);

  commentService.$inject = ['$http', '$q', 'CONFIG'];

  function commentService($http, $q, CONFIG) {
    var commentServe = this;

    commentServe.getCommentbyTitleId = function(titleId){
        return $http.get(CONFIG.API_END_POINT + '/comments/title/' + titleId)
            .then(successFn, errorFn);
    }

    commentServe.getCommentbyUserId = function(userId){
        return $http.get(CONFIG.API_END_POINT + '/comments/user/' + userId)
            .then(successFn, errorFn);
    }

    commentServe.addComment = function(titleId ,userId , comment){
        return $http.post(CONFIG.API_END_POINT + '/comments/new/' + titleId + '/' + userId, comment)
            .then(successFn, errorFn);
    }

    commentServe.updateComment = function(titleId, userId, comment) {
        return $http.put(serverCommentEndPoint+"/api/update/"+titleId+"/"+userId, comment)
            .then(successFn, errorFn);
    }

    commentServe.deleteComment = function(titleId, userId, commentId) {
        return $http.delete(serverCommentEndPoint+"/api/comments/"+titleId+"/"+userId+"/"+commentId)
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