angular.module("app")
  .controller("userController", function($scope, userService, $rootScope) {
    //처음 실행 시 무조건 첫 페이지
    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1);
      $scope.readUserCount();
    }); 

    //include 시 외부 서버 경로 변경
    $scope.view = "list";
    $scope.getView = () => {
      switch($scope.view) {
        case "list" : return "views/users/list.html";
        case "create" : return "views/users/create.html";
        case "read" : return "views/users/read.html";
        case "update" : return "views/users/update.html";
      }
    };

    $scope.getList = (pageNo) => {
      userService.list(pageNo, $scope.userStateVal, $scope.idKeywordVal)
        .then((response) => { //jQuery에서는 response 대신 data
          $scope.pager = response.data.pager;
          $scope.users = response.data.users;
          $scope.pageRange = [];
          for(var i = $scope.pager.startPageNo; i <= $scope.pager.endPageNo; i++) {
            $scope.pageRange.push(i);
          }
          $scope.view = "list";
        });
    };
    
    $scope.read = (uid) => {
      userService.read(uid)
        .then((response) => {
          $scope.user = response.data;
          $scope.view = "read";
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
        });
        userService.readCount(1)
          .then((response) => {
            $scope.userCount[1].value = response.data;
        });
        userService.readCount(2)
        .then((response) => {
          $scope.userCount[2].value = response.data;
        });
    };    

    $scope.cancel = () => {
      $scope.getList($scope.pager.pageNo);
      $scope.view = "list";
    };

    $scope.cancelUpdate = () => {
      $scope.view = "read";
   };

    $scope.updateUserForm = () => {
      $scope.view = "update";
    };

    $scope.updateUser = (user) => {
      if(user.user_id && user.user_name && user.user_phone && user.zip_code && user.road_address 
          && user.detail_address && user.user_authority && user.user_enable) {        
        userService.update(user)
        .then((response) => {
            $scope.read(user.user_id);
            $scope.view = "read";
        });
      }
    };

    $scope.userStateList = ["전체", "회원", "탈퇴"];
    $scope.userStateVal = "전체";
    $scope.getStateVal = (userStateVal) => {
      if(userStateVal === "전체"){
        $scope.userStateVal = "";  
      }else{
        $scope.userStateVal = userStateVal;
      }
      
      return $scope.userStateVal;
    };

    
    $scope.idKeywordButton = (userStateVal,idKeywordVal) => {
      $scope.userStateVal = userStateVal;
      $scope.idKeywordVal = idKeywordVal;
      $scope.getList(1);
    };


  });