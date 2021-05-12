angular.module("app")
.controller("homeController", function($scope, ordersService, $rootScope, productService, userService, ordersService, productsRefundService, qnaService, reviewsService) { 
    $scope.$on("$routeChangeSuccess", () => {
        $scope.readProductCount();
        $scope.readUserCount();
        $scope.readOrderCount();
        $scope.readRefundCount();
        $scope.readReviewCount();
        $scope.readQnaCount();
        $scope.bestMain();
      });

     // 상품별 개수 가져오기
     $scope.productCount = [
        {value:""},
        {value:""},
        {value:""},
        {value:""},
        {value:""}
      ];
      $scope.readProductCount = () => {
          productService.readCount(0)
            .then((response) => {
              $scope.productCount[0].value = response.data;
              //console.log($scope.productCount[0].value);
          });
      };
      
       //회원 상태별 인원
    $scope.userCount = [
      {value:""},
      {value:""},
      {value:""}
    ];
    $scope.readUserCount = () => {
        userService.readCount(0)
          .then((response) => {
            $scope.userCount[0].value = response.data;
            //console.log("확인",$scope.userCount[0].value);
        });
    };   
    
    //주문
    $scope.orderCount = [
      {value:""},
      {value:""},
      {value:""}
    ];
    $scope.readOrderCount = () => {
      ordersService.readCount(0)
          .then((response) => {
            $scope.orderCount[0].value = response.data;
            //console.log($scope.orderCount[0].value);
        });
    };  

    //환불
    $scope.refundCount = [
      {value:""},
      {value:""},
      {value:""}
    ];

    $scope.readRefundCount = () => {
      productsRefundService.count(0)
        .then((response) => {
          $scope.refundCount[0].value = response.data;
           //console.log("REFUND",$scope.refundCount[0].value);
        });
    };

    //리뷰
    $scope.reviewCount = [
      {value:""},
      {value:""},
      {value:""}
    ];

    $scope.readReviewCount = () => {
      reviewsService.count(0)
        .then((response) => {
          $scope.reviewCount[0].value = response.data;
          //console.log($scope.reviewCount[0].value);
        });
    };

    //문의
    $scope.qnaCount = [
      {value:""},
      {value:""},
      {value:""}
    ];
    $scope.readQnaCount = () => {
      qnaService.readCount(0)
          .then((response) => {
            $scope.qnaCount[0].value = response.data;
            //console.log($scope.qnaCount[0].value);
        });
    };

    $scope.bestMain = () => {

      productService.bestMain()
        .then((response) => {
          $scope.blist = response.data.blist;
          $scope.nlist = response.data.nlist;
        })
  
    };
  });