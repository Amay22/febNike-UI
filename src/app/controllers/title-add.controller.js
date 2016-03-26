(function() {
  'use strict';

  angular
    .module('nike')
    .controller('AddTitleController', AddTitleController);

    AddTitleController.$inject = ['$scope', '$uibModalInstance', 'title', 'titleService'];

    function AddTitleController($scope, $uibModalInstance, title, titleService) {
      var AddTitleCtrl = this;

      AddTitleCtrl.title = title;

      AddTitleCtrl.ok = function () {
        titleService.addTitle(AddTitleCtrl.title)
        $uibModalInstance.close();
      };

      AddTitleCtrl.cancel = function () {
        $uibModalInstance.dismiss();
      };
  }
})();