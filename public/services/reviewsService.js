angular.module("app")
  .factory("reviewsService", function($http) {
      const BASE_URL = "http://localhost:8080/reviews";

      return {
        list: function(pageNo = 1, keyword="") {
          const promise = $http.get(BASE_URL, {params:{pageNo:pageNo, keyword:keyword}}); 
          return promise;
        },

        read: function(reviewNo) {
          const promise = $http.get(BASE_URL + "/" + reviewNo);
          return promise;
        },

        update: function(review) {
          const promise = $http.put(BASE_URL, review);
          return promise;
        },

        delete: function(reviewNo) {
          const promise = $http.delete(BASE_URL + "/" + reviewNo);
          return promise;
        },

        count: function(countNo) {
          const promise = $http.get(BASE_URL + "/readcount", {params: {countNo:countNo}});
          return promise;
        }
      }
  });