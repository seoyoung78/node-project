
angular.module("app")
.factory("productService", function($http){
    //변수 선언
    const BASE_URL = "http://localhost:8080/products";
    //서비스 객체 리턴
    return {
        list: function(pageNo=1, categoryVal, keyword){
           const promise = $http.get(BASE_URL, {params:{pageNo, categoryVal, keyword}});
           return promise;
        },

        read: function(pid){
            const promise = $http.get(BASE_URL + "/" + pid);
            return promise;
        },

        readCount: function(cno){
            const promise = $http.get(BASE_URL + "/readcount", {params:{cno}});
            return promise;
        },

        battachUrl: function(pid, i){
            // const promise = $http.get(BASE_URL + "/battach/" + pid);
            // return promise;
            return BASE_URL + "/battach/" + pid + "/" + i;
        },

        create: function(formData){
            const promise = $http.post(BASE_URL, formData, {headers:{"Content-Type":undefined}});
            return promise;
        },

        update: function(formData) {
            const promise = $http.put(BASE_URL, formData, {headers:{"Content-Type":undefined}});
            return promise;
        },
        
        delete: function(pid) {
            const promise = $http.delete(BASE_URL + "/" + pid);
            return promise;
        },

        bestMain: function () {
            const promise = $http.get(BASE_URL + "/pcount");
            return promise;
        }    
    };
});