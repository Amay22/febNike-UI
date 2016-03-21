(function() {
  'use strict';

  angular
    .module('nike')
    .constant('CONFIG', {
      API_END_POINT: 'http://localhost:8080/febNike/api'
    });
})();