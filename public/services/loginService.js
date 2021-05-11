angular.module("app")

  .factory("loginService", function($http) {
    //변수 선언
    const BASE_URL = "http://localhost:8080/auth";

    //서비스 객체 리턴
    return {
      login: function(user) {
        const promise = $http.post(BASE_URL + "/login", user); 
        return promise;
      }
    };
  });