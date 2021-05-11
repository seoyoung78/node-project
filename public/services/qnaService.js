angular.module("app")
  .factory("qnaService", function($http) {
    //변수 선언
    const BASE_URL = "http://localhost:8080/qna";
    //서비스 객체 리턴
    return {
      list: function(state,pageNo=1) { //pageNo가 넘어오지 않으면 디폴트 값은 1
        // console.log(keyword+" "+ pageNo)
        const promise = $http.get(BASE_URL+"/stateval", {params:{state,pageNo}}); //get이 리턴하는 것이 무엇? promise(비동기 처리하는 것)
        return promise;
      },
      read: function(qnaNo) {
        const promise = $http.get(BASE_URL + "/" + qnaNo);
        return promise;
      },
      readCount: function(countNo){
        const promise = $http.get(BASE_URL + "/readCount", {params:{countNo}});
        return promise;
      },
      update: function(qna) {
        const promise = $http.put(BASE_URL, qna);
        return promise;
      },
      delete: function(qnaNo) {
        const promise = $http.delete(BASE_URL + "/" + qnaNo);
        return promise;
      }
    }
  }); 