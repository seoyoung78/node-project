angular.module("app") // 생성된 모듈 구성
    .config(function($locationProvider, $routeProvider) {    //화살표 함수 사용x
        //HTML5 모드 활성화 (라우트 전에 활성화 해야 함)
        // $locationProvider.html5Mode({  
        //     enabled: true,
        //     requireBase: true   //root를 어디로 볼 것인가 - <base href> 반드시 작성
        // });

        //라우트 정의 - 같은 DOM 내부에서 이동할 때 사용
        $routeProvider
            .when("/", {templateUrl: "views/home.html", controller: "homeController"})

            .when("/products_refund", {templateUrl: "views/products_refund/index.html", controller: "productsRefundController"}) 
            .when("/reviews", {templateUrl: "views/reviews/index.html", controller: "reviewsController"})
            .when("/products", {templateUrl: "views/products/index.html", controller: "productController"})
            .when("/users", {templateUrl: "views/users/index.html", controller: "userController"})
            .when("/orders", {templateUrl: "views/orders/index.html", controller:"orderController"})
            .when("/qna", {templateUrl: "views/qna/index.html", controller:"qnaController"})

            .otherwise({redirectTo: "/"});  //요청되지 않은 경로로 호출 될 경우 경로 지정
    }); 