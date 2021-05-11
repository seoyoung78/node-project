angular.module("app")
.controller("orderController", function($scope, ordersService, $rootScope) { 
    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList("",1);
      $scope.readOrderCount();
    });

    $scope.view = "list"; //처음에는 list가 보여짐
    $scope.getView = () => {
      switch($scope.view) {
        case "list": return "views/orders/list.html"
        case "read": return "views/orders/read.html"
      }
    };

     //상태별 인원
     $scope.orderCount = [
      {value:""},
      {value:""},
      {value:""}
    ];
    $scope.readOrderCount = () => {
      ordersService.readCount(0)
          .then((response) => {
            $scope.orderCount[0].value = response.data;
            console.log($scope.orderCount[0].value);
        });
        ordersService.readCount(1)
          .then((response) => {
            $scope.orderCount[1].value = response.data;
            console.log($scope.orderCount[1].value);
        });
        ordersService.readCount(2)
        .then((response) => {
          $scope.orderCount[2].value = response.data;
          console.log($scope.orderCount[2].value);
        });
    };    

    $scope.getList = (keyword,pageNo) => {
      console.log(keyword);
        ordersService.list(keyword,pageNo)
      .then((response) => { //데이터가 성공적으로 오게 되면 response 객체 얻음
        $scope.pager = response.data.pager; //상태변수에 담음. 왜? 상태변수에 담지 않으면 바인딩을 할 수가 없음. 상태 변수에 반드시 저장!!!!
        $scope.orders = response.data.orders;
        $scope.pageRange = []; //배열 선언
        for(var i=$scope.pager.startPageNo; i<=$scope.pager.endPageNo; i++){
          $scope.pageRange.push(i);
        }
        $scope.view = "list";
      });
    };

    $scope.read = (keyword,orderNo) => {
      ordersService.read(orderNo)
        .then((response) => {
          $scope.orderProducts = response.data;
          $scope.view = "read"; //read라는 view를 보여주기
          console.log(orderNo);
          $scope.keyword=keyword;
        });
    };

  $scope.cancel = () => {
      $scope.getList($scope.pager.pageNo);
      $scope.view = "list";
  };



});