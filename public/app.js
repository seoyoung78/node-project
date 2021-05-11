angular.module("app", ["ngRoute"]) 
    .config(function($logProvider) {    
        $logProvider.debugEnabled(false);
    })
    .run(function($rootScope, $http) {   // 모듈 마다 생성 가능 - 전역 데이터, application 실행할 때마다 자동 실행    
        //세션 저장소에 있는 uid, authToken을 읽기
        $rootScope.uid = sessionStorage.getItem("uid");
        $rootScope.authToken = sessionStorage.getItem("authToken");

        //$rootScpoe.authToken의 값의 변화를 감시
        $rootScope.$watch("authToken", (newValue) => {
            if(newValue) {
                $http.defaults.headers.common.authToken = newValue;
            } else {
                delete $http.defaults.headers.common.authToken;
            }
        });
    })
    
    .controller("mainController", function($rootScope, $scope, $location, $route, $window, loginService) {
        $scope.login = (user) => {
            $scope.user = null;
            loginService.login(user)
              .then ((response) => {
                $rootScope.uid = response.data.uid;
                $rootScope.authToken = response.data.authToken;
      
                //브라우저 상의 Session Storage에 저장 --> 새로고침 해도 데이터 날라가는 것 방지
                sessionStorage.setItem("uid", response.data.uid);
                sessionStorage.setItem("authToken", response.data.authToken);
      
                $location.url("/");
              })
              .catch ((response) => {
                $window.alert("로그인 실패: " + response.data.message);
              })
          };

        $scope.logout = () => {
            $rootScope.uid = null;  //바인딩 되어 있을 경우 더 나은 방법
            $rootScope.authToken = "";
            sessionStorage.removeItem("uid");
            sessionStorage.removeItem("authToken");
        }

        //이전 URL과 동일한 URL일 경우 리프레쉬
        $scope.reloadable = (path) => {
            if($location.url().includes(path)) {
                $route.reload();  //페이지 갱신 효과
            }
        }
    });