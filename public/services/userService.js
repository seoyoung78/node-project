angular.module("app")
    .factory("userService", function($http){
        //변수 선언
        const BASE_URL = "http://localhost:8080/users";
        //서비스 객체 리턴
        return {
            list: function(pageNo=1, userStateVal, idKeywordVal){
               const promise = $http.get(BASE_URL, {params:{pageNo, userStateVal, idKeywordVal}})
               return promise;
            },
            read: function(uid){
                const promise = $http.get(BASE_URL + "/" + uid);
                return promise;
            },
            readCount: function(countNo){
                const promise = $http.get(BASE_URL + "/readCount", {params:{countNo}});
                return promise;
            },
            update: function(user) {
                const promise = $http.put(BASE_URL, user);
                return promise;
            }
          
        };
    });