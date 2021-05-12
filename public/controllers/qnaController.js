angular.module("app")
.controller("qnaController", function($scope, qnaService, $rootScope) { 
  
  $scope.view = "list"; //처음에는 list가 보여짐
  $scope.getView = () => {
    switch($scope.view) {
      case "list": return "views/qna/list.html"
      case "read": return "views/qna/read.html"
      case "update": return "views/qna/update.html"
    }
  };
  
    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList("전체",1);
      $scope.readQnaCount();
    });
    $scope.stateList = ["전체", "미답변", "답변 완료"];
    $scope.stateVal = "전체";
   
     //상태별 인원
     $scope.qnaCount = [
      {value:""},
      {value:""},
      {value:""}
    ];
    $scope.readQnaCount = () => {
      qnaService.readCount(0)
          .then((response) => {
            $scope.qnaCount[0].value = response.data;
        });
        qnaService.readCount(1)
          .then((response) => {
            $scope.qnaCount[1].value = response.data;
        });
        qnaService.readCount(2)
        .then((response) => {
          $scope.qnaCount[2].value = response.data;        
        });
    };    

    $scope.getList = (stateVal, pageNo) => {
      qnaService.list(stateVal, pageNo)
    .then((response) => { //데이터가 성공적으로 오게 되면 response 객체 얻음
      $scope.pager = response.data.pager; //상태변수에 담음. 왜? 상태변수에 담지 않으면 바인딩을 할 수가 없음. 상태 변수에 반드시 저장!!!!
      $scope.qna = response.data.qna;
      $scope.pageRange = []; //배열 선언
      for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
        $scope.pageRange.push(i);
      }
      $scope.view = "list";
    });
  };

  $scope.read = (stateVal,qnaNo) => {
      qnaService.read(qnaNo)
      .then((response) => {
        $scope.qna = response.data;
        $scope.stateVal=stateVal;
        $scope.view = "read"; //read라는 view를 보여주기
       
      });
  };
 
  $scope.cancel = () => {
      $scope.getList("전체",$scope.pager.pageNo);
      $scope.view = "list";
      $scope.stateVal="전체";
  };

  $scope.updateQnaForm = () => {
    $scope.view = "update";
  };

  $scope.updateQna = (qna) => {
    
     if(qna.answer_content){
      qnaService.update(qna)
        .then((response) => {
          $scope.read("전체", qna.qna_no);
          $scope.view = "read";
        });
      }
  };

  $scope.deleteQna = (qnaNo) => {
    console.log(qnaNo);
    qnaService.delete(qnaNo)
      .then((response) => {
        $scope.getList(1); //1페이지로 돌아옴
        $scope.view = "list";
      });
  };
});