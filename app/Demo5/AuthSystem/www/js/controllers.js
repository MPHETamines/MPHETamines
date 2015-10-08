uwatch.controller('MasterController', function($scope,$rootScope,$http,$ionicPopup ,$state,$timeout, $cordovaFileTransfer) {

    $scope.IP = "172.20.10.3";
    //$scope.data = {};
    
    $scope.signupPage = function(){
      $state.go("register");
    }
    $scope.loginPage = function(){
      $state.go("login");
    }

//=========== GENERATE RANDOM VERIFICATION CODE ============
    var generateCode=function(){
        //var verificationCode = "";
         $rootScope.verificationCode = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 8; i++ )
            $rootScope.verificationCode += possible.charAt(Math.floor(Math.random() * possible.length));
       //return verificationCode;
    }

//========== SEND EMAIL WITH VERIFICATON CODE =========
    var sendVerificationCode = function(_email,verificationCode){
        var request = $http({
            method: "POST",
            url: "http://"+$scope.IP+"/auth/mail.php",
            crossDomain : true,
            data: {
                email: _email,
                code: verificationCode
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        /* Successful HTTP post request or not */
        request.success(function(data) {
          console.log(data);
        });
    }


    $scope.getUserData = function(username,email,password,cpassword){
      
        generateCode(); //generates OTP

        if(password !== cpassword){
          alert("password does not macth")
        }else{
          $rootScope.username = username;
          $rootScope.email = email;
          $rootScope.password = password;
          $state.go("otp");
          
        }

    }
//============= SIGN UP / REGISTER =============
    $scope.signup = function(username,email,password) {
       // generateCode();
        //$rootScope.verificationCode = "abcde";
        if(username !== "" && password !== "" && email !== "" ){

            var hPass = sha512_256(password); 
          
              var request = $http({
                  method: "POST",
                  url: "http://"+$scope.IP+"/auth/signup.php", //insert user in a session variable
                  crossDomain : true,
                  data: {
                      email: email,
                      password: hPass,
                      username: username
                  },
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
              });
              /* Successful HTTP post request or not */
               request.success(function(data) {
                  if(data == "1"){
                    //sendVerificationCode(email,$rootScope.verificationCode);
                    $state.go("tab.capture");
                    //$scope.responseMessage = "Successfully Created Account";
                  }
                  else if(data == "2"){
                    alert("Failed to creat account");
                  //$scope.responseMessage = "Create Account failed";
                  }
                  else if(data == "0") {
                    alert("User already exists");
                  //$scope.responseMessage = "Email Already Exist";
                  }
                  alert(data);
                  
              });
        }
    }


//============= SIGN UP / REGISTER =============
    $scope.storeUser = function() {
      alert("Storing user");
      var request = $http({
          method: "POST",
          url: "http://"+$scope.IP+"/auth/signup.php", //insert user from session variable
          crossDomain : true,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      /* Successful HTTP post request or not */
        request.success(function(data) {
          if(data == "1"){
            //sendVerificationCode(email,$rootScope.verificationCode);
            $state.go("capture");
            //$scope.responseMessage = "Successfully Created Account";
          }
          else if(data == "2"){
            alert("Failed to creat account");
          //$scope.responseMessage = "Create Account failed";
          }
          else if(data == "0") {
            alert("User already exists");
          //$scope.responseMessage = "Email Already Exist";
          }
          alert(data);

      });
    }


    $scope.loginFunction = function(email, password) {
        if(password !== "" && email !== "" ){
            $scope.email = email;
            var hPass = sha512_256(password);
            //alert(hPass);
            var request = $http({
                method: "POST",
                url: "http://"+$scope.IP+"/auth/login.php",
                crossDomain : true,
                data: {
                    email: email,
                    password: hPass
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Successful HTTP post request or not */
            request.success(function(data) {
                if(data == "0"){
                    alert("Success login");
                    $state.go("tab.capture");
                }
                else if(data == "1" ) {
                    alert("Login failed");
                 //$scope.responseMessage = "Email Already Exist";
                }
                else if(data == "999"){
                    alert("Something went wrong");
                }
            });
        }
    }

    $scope.logoutFunction = function() {

      var request = $http({
          method: "POST",
          url: "http://"+$scope.IP+"/auth/logout.php",
          crossDomain : true,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      /* Successful HTTP post request or not */
      request.success(function(data) {
          if(data == "0"){
              alert("Logout success");
              $state.go("login");
          }
          else if(data == "1" ) {
              alert("Logout failed");
           //$scope.responseMessage = "Email Already Exist";
          }
          else{
            alert("Something went wrong");
          }
      });
    }

    $scope.compareCode = function(otp){
        if( (otp != "" || otp != undefined) && otp === $rootScope.verificationCode){
            alert("Correct OTP");
            $scope.signup($rootScope.username,$rootScope.email,$rootScope.password);
           // $state.go("tab.capture");
        }else{
              alert("Incorrect OTP");
            //  alert($scope.username +" : "+$scope.email + " : " +$scope.password);
            //$scope.otp = "";
           // $scope.verified = false;
          //  $scope.showConfirm();
        }
    }


  $scope.sendOption = function(category){
      if(category == undefined){
        alert("Please choose an option");
      }else{
        sendDataToDatabase($rootScope.filename,"Hatfiled","image",category);
        uploadFileToServer($rootScope.path);
        $state.go("tab.capture");
      }
      
  }
    


    var sendDataToDatabase = function(path,tags,type,category) {
      var hPath = sha512_256(path);

      //var eFile = CryptoJS.AES.encrypt(path,"i love ice cream");
      //alert("Path: "+hPath);
      //alert("Encr: "+eFile);
      var request = $http({
          method: "POST",
          url: "http://"+$scope.IP+"/auth/filedata.php",
          crossDomain : true,
          data: {
              filetype: type,
              hash: hPath,
              link: path,
              tags: tags,
              category: category
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      /* Successful HTTP post request or not */
      request.success(function(data) {
          if(data == "1"){
              alert("File details uploaded Successfully");
          }
         else if(data == "2"){
              alert("Failed to upload file details");
          }
          else if(data == "999"){
              alert("User does not exit");
          }else{
            alert("Something went wrong");
          }
      });

    }




  var uploadFileToServer = function(targetPath) {
      //var android = "192.168.43.60"; 
      var url = "http://"+$scope.IP+"/auth/upload.php";
        var filename = targetPath.split("/").pop();
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false
        };
        $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
            alert("Upload success");
           // alert(JSON.stringify(result.response));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
            alert(JSON.stringify(err));
        }, function (progress) {
            // constant progress updates
            $timeout(function () {
            //  $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            })
        });
    }


  $scope.captureImage = function(){
    var captureSuccess = function(mediaFiles) {
        $rootScope.path = mediaFiles[0].fullPath;
        var p = $rootScope.path.split("/");
        $rootScope.filename = p[p.length-1];
        $state.go("category");
    };
    var captureError = function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };
    navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
  }

  $scope.captureAudio = function(){
      var captureSuccess = function(mediaFiles) {
       $rootScope.path = mediaFiles[0].fullPath;
        var p = $rootScope.path.split("/");
        $rootScope.filename = p[p.length-1];
        $state.go("category");
      };
      var captureError = function(error) {
          navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
      };
      navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:1});
  }

  $scope.captureVideo = function(){
    var captureSuccess = function(mediaFiles) {
        $rootScope.path = mediaFiles[0].fullPath;
        var p = $rootScope.path.split("/");
        $rootScope.filename = p[p.length-1];
        $state.go("category");
    };
    var captureError = function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };
    navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
  }

  $scope.getLocation = function(){
      var onSuccess = function(position) {
        alert('Latitude: '      + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
      };
      function onError(error) {
          alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };


    $scope.checkConnection = function() {
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';
        //information.connection = states[networkState];
        alert('Connection type: ' + states[networkState]);
    };


    $scope.isVerified = function(){
       if($scope.verified == false){
          alert("not verified");
          $state.go("otp");
       } 
       else{
        alert("verified");
       }
    }

});
