angular.module("app")
  .factory("ordersService", function($http) {
    //변수 선언
    const BASE_URL = "http://localhost:8080/orders";
    //서비스 객체 리턴
    return {
      list: function(keyword="",pageNo=1) { //pageNo가 넘어오지 않으면 디폴트 값은 1
        const promise = $http.get(BASE_URL+"/", {params:{keyword, pageNo}},); //get이 리턴하는 것이 무엇? promise(비동기 처리하는 것)
        return promise;
      },
      read: function(orderNo) {
        const promise = $http.get(BASE_URL + "/" + orderNo);
        return promise;
      },
      readCount: function(countNo){
        const promise = $http.get(BASE_URL + "/readCount", {params:{countNo}});
        return promise;
      }
    }
  }); 