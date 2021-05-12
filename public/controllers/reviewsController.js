angular.module("app")
  .controller("reviewsController", function($scope, reviewsService) {
    $scope.view = "list";
    $scope.getView = () => {
      switch($scope.view) {
        case "list" : return "views/reviews/list.html";
        case "read" : return "views/reviews/read.html";
        case "update" : return "views/reviews/update.html";
      }
    };

    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1, "");
      $scope.readReviewCount();
    }); 

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
        reviewsService.count(1)
        .then((response) => {
          $scope.reviewCount[1].value = response.data;
          //console.log($scope.reviewCount[1].value);
        });
        reviewsService.count(2)
        .then((response) => {
          $scope.reviewCount[2].value = response.data;
          //console.log($scope.reviewCount[2].value);
        });
    };

    $scope.getList = (pageNo, keyword) => {
      reviewsService.list(pageNo, keyword)
        .then((response) => { //jQuery에서는 response 대신 data
          $scope.pager = response.data.pager;
          $scope.reviews = response.data.reviews;
          $scope.pageRange = [];
          for(var i = $scope.pager.startPageNo; i <= $scope.pager.endPageNo; i++) {
            $scope.pageRange.push(i);
          }
          $scope.view = "list";
        });
    };

    $scope.read = (reviewNo, keyword) => {
      reviewsService.read(reviewNo)
        .then((response) => {
          $scope.review = response.data;
          $scope.view = "read";
          $scope.keyword = keyword;
        });
    };

    $scope.updateReviewForm = () => {
      $scope.view = "update";
    };

    $scope.updateReview = (review) => {
      if(review.review_content) {
        reviewsService.update(review)
        .then((response) => {
            $scope.read(review.review_no, "");
            $scope.view = "read";
        });
      }
    };

    $scope.cancel = () => {
      $scope.getList($scope.pager.pageNo, "");
      $scope.view = "list";
    };

    $scope.deleteReview = (reviewNo) => {
      reviewsService.delete(reviewNo)
      .then((response) => {
        $scope.getList(1, "");
        $scope.view = "list";
      })
    };
  });