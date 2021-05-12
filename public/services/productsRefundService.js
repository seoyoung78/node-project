angular.module("app")
  .factory("productsRefundService", function($http) {
    const BASE_URL = "http://localhost:8080/products_refund";

      return {
        list: function(pageNo = 1, state, reason) {
          const promise = $http.get(BASE_URL, {params:{pageNo:pageNo, state:state, reason:reason}}); 
          return promise;
        },

        read: function(orderNo) {
          const promise = $http.get(BASE_URL + "/" + orderNo);
          return promise;
        },

        update: function(refund) {
          const promise = $http.put(BASE_URL, refund);
          return promise;
        },
        
        count: function(countNo) {
          const promise = $http.get(BASE_URL + "/readCount", {params:{countNo:countNo}});
          return promise;
        }
      }
  });