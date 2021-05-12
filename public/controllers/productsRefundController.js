angular.module("app")
  .controller("productsRefundController", function($scope, productsRefundService) {    
    $scope.view = "list";
    $scope.getView = () => {
      switch($scope.view) {
        case "list" : return "views/products_refund/list.html";
        case "create" : return "views/products_refund/create.html";
        case "read" : return "views/products_refund/read.html";
        case "update" : return "views/products_refund/update.html";
      }
    };

    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1, "전체" , "전체");
      $scope.readRefundCount();
    }); 

    $scope.stateList = ["전체", "환불 중", "환불 완료"];
    $scope.stateVal = "전체";

    $scope.reasonList = ["전체", "고객 변심", "상품 불량", "서비스 불만족", "늦은 배송", "기타"]
    $scope.reasonVal = "전체";

    $scope.refundCount = [
      {value:""},
      {value:""},
      {value:""}
    ];

    $scope.readRefundCount = () => {
      productsRefundService.count(0)
        .then((response) => {
          $scope.refundCount[0].value = response.data;
          // console.log($scope.refundCount[0].value);
        });
      productsRefundService.count(1)
        .then((response) => {
          $scope.refundCount[1].value = response.data;
          //console.log($scope.refundCount[1].value);
        });
      productsRefundService.count(2)
        .then((response) => {
          $scope.refundCount[2].value = response.data;
          //console.log($scope.refundCount[2].value);
        });
    };
    
    $scope.getList = (pageNo, stateVal, reasonVal) => {
      productsRefundService.list(pageNo, stateVal, reasonVal)
        .then((response) => { 
          $scope.pager = response.data.pager;
          $scope.refunds = response.data.refunds;
          $scope.pageRange = [];
          for(var i = $scope.pager.startPageNo; i <= $scope.pager.endPageNo; i++) {
            $scope.pageRange.push(i);
          }
          $scope.view = "list";
        });
    };

    $scope.read = (orderNo, stateVal, reasonVal) => {
      productsRefundService.read(orderNo)
        .then((response) => {
          $scope.refund = response.data;
          $scope.view="read"; 
          $scope.stateVal = stateVal;     
          $scope.reasonVal = reasonVal;
        })
    };

    $scope.updateRefundForm = () => {
      $scope.view="update";
    };

    $scope.updateRefund = (refund) => {
      productsRefundService.update(refund)
        .then((response) => {    
          $scope.read(refund.order_no, $scope.stateVal, $scope.reasonVal);
          $scope.view="read"
        });
    };

    $scope.cancel = () => {
      $scope.getList($scope.pager.pageNo, "전체", "전체");
      $scope.view = "list";
      $scope.stateVal = "전체";
      $scope.reasonVal = "전체";
    };
  });