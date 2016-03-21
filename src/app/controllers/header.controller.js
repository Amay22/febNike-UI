(function() {
  'use strict';

  angular.module('nike')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$window'];

  function HeaderController ($window) {
    var headerCtrl = this;

    headerCtrl.isLoggedin = function(){
        return $window.sessionStorage.getItem('currentUser') !== null;
    };

    headerCtrl.logout = function(){
        $window.sessionStorage.removeItem('currentUser');
        $window.sessionStorage.removeItem('currentUserId');
    };
  }
})();