angular.module("app")
  .controller("productController", function($scope, productService) {
    $scope.view = "list";
    $scope.getView = () => {
      switch($scope.view) {
        case "list" : return "views/products/list.html";
        case "create" : return "views/products/create.html";
        case "read" : return "views/products/read.html";
        case "update" : return "views/products/update.html";
      }
    };

    $scope.$on("$routeChangeSuccess", () => {
      $scope.getList(1);
      $scope.readProductCount();
    }); 
    
    $scope.getList = (pageNo) => {
      productService.list(pageNo, $scope.categoryVal, $scope.keyword)
        .then((response) => { //jQuery에서는 response 대신 data
          $scope.pager = response.data.pager;
          $scope.products = response.data.products;
          $scope.pageRange = [];
          for(var i = $scope.pager.startPageNo; i <= $scope.pager.endPageNo; i++) {
            $scope.pageRange.push(i);
          }
          $scope.view = "list";
        });
    };

    $scope.keywordButton = (categoryVal, keyword) => {
      $scope.categoryVal = categoryVal;
      $scope.keyword = keyword;
      $scope.getList(1);
    };
    
    $scope.read = (pid) => {
        productService.read(pid)
        .then((response) => {
          $scope.product = response.data;
          $scope.view = "read";
        });
    };

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
        });
        productService.readCount(1)
          .then((response) => {
            $scope.productCount[1].value = response.data;
        });
        productService.readCount(2)
        .then((response) => {
          $scope.productCount[2].value = response.data;
        });
        productService.readCount(3)
        .then((response) => {
          $scope.productCount[3].value = response.data;
        });
        productService.readCount(4)
        .then((response) => {
          $scope.productCount[4].value = response.data;
        });
    };    

    $scope.battachUrl = (pid, i) => {
        return productService.battachUrl(pid, i);
    };

    $scope.createProductForm = () => {
      $scope.product = null;  //기존 상태데이터에 저장되어 있는 데이터 없앰
      $scope.view = "create";
    };

    $scope.createProduct = (product) => {
      if(product && product.productCategoryNo && product.productName && product.productPrice) {
        var formData = new FormData();  //multipart 데이터 객체
        formData.append("productCategoryNo", product.productCategoryNo);
        formData.append("productName", product.productName);
        formData.append("productPrice", product.productPrice);
        
        var imgFlag1 = false;
        var imgFlag2 = false;
        var imgFlag3 = false;
        var imgFlag4 = false;
        var imgFlag5 = false;

        var battach1 = $("#battach1")[0].files[0];
        if(battach1){
          formData.append("battach", battach1);
          imgFlag1 = true;
        }
        var battach2 = $("#battach2")[0].files[0];
        if(battach2){
          formData.append("battach", battach2);
          imgFlag2 = true;
        }
        var battach3 = $("#battach3")[0].files[0];
        if(battach3){
          formData.append("battach", battach3);
          imgFlag3 = true;
        }
        var battach4 = $("#battach4")[0].files[0];
        if(battach4){
          formData.append("battach", battach4);
          imgFlag4 = true;
        }
        var battach5 = $("#battach5")[0].files[0];
        if(battach5){
          formData.append("battach", battach5);
          imgFlag5 = true;
        }

        if(imgFlag1 && imgFlag2 && imgFlag3 && imgFlag4 && imgFlag5){
          productService.create(formData)
          .then((response) => {
              $scope.getList(1, "전체", "");
              $scope.view = "list";
          });
        }else{
          window.alert("사진 첨부 필수입니다.");
        }
      }else{
        window.alert("항목을 모두 입력하세요.");
      }
    };
    
    $scope.cancel = () => {
      $scope.getList($scope.pager.pageNo);
      $scope.view = "list";
    };

    $scope.cancelUpdate = () => {
       $scope.view = "read";
    };

    $scope.updateProductForm = () => {
      $scope.view = "update";
    };

    $scope.updateProduct = (product) => {
      if(product.productNo && product.productName && product.productPrice) {
        var formData = new FormData();  //multipart 데이터 객체
        formData.append("productNo", product.productNo);
        formData.append("productName", product.productName);
        formData.append("productPrice", product.productPrice);
        formData.append("productCategoryNo", product.productCategoryNo);
    

        var battach1 = $("#battach1")[0].files[0];
        var battach2 = $("#battach2")[0].files[0];
        var battach3 = $("#battach3")[0].files[0];
        var battach4 = $("#battach4")[0].files[0];
        var battach5 = $("#battach5")[0].files[0];
        if(battach1){
          formData.append("battach", battach1);
          formData.append("state", 1);
        }
        if(battach2){
          formData.append("battach", battach2);
          formData.append("state", 2);
        }
        if(battach3){
          formData.append("battach", battach3);
          formData.append("state", 3);
        }
        if(battach4){
          formData.append("battach", battach4);
          formData.append("state", 4);
        }
        if(battach5){
          formData.append("battach", battach5);
          formData.append("state", 5);
        }
        
        var stateCk = false;
        if(product.productState === "0" || product.productState === "1"){
          formData.append("productState", product.productState);
          stateCk = true;
        }
        if(stateCk){
        productService.update(formData)
          .then((response) => {
              $scope.read(product.productNo);
          });
        }else{
          window.alert("정확한 값을 입력하세요.");
        }
      } 
    };

    $scope.deleteProduct = (pid) => {
        productService.delete(pid)
        .then((response) => {
          $scope.getList(1);
          $scope.view = "list";
        })
    };


    $scope.categoryList = ["전체", "캔들", "조명", "트리", "기타"];
    $scope.categoryVal = "전체";
    $scope.getCategoryVal = (categoryVal) => {
      if(categoryVal === "전체"){
        $scope.categoryVal = "";  
      }else{
        $scope.categoryVal = categoryVal;
      }
      
      return $scope.categoryVal;
    };

  });
 
