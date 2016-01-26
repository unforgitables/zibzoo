angular.module('zibzoo.vendor', [])
  .controller('VendorController', ['$scope', '$stateParams', '$modal', 'vendor', 'Auth', function ($scope, $stateParams, $modal, vendor, Auth) {
    $scope.vendor = vendor;
    $scope.items  = _.chunk($scope.vendor.menu, 2);

    $scope.getVendor = function (params) {
      vendor.getVendors(params)
        .then(function (vendor) {
          $scope.vendor = vendor.data;
        })
        .catch(function (error) {
          console.error('Error getting vendor: ', error);
        });
    };

    $scope.order = function (item) {
      if (Auth.isAuth()) {
        $modal.open({
          templateUrl: 'app/vendor/_order-form.html',
          controller: 'OrderFormController',
          resolve: {
            item: function () {
              return item;
            }
          }
        });
      } else {
        Auth.openModal();
      }
    };

    //$scope.getVendor($stateParams.vendorId);
  }]);
