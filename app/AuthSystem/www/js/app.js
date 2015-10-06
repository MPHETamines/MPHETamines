var uwatch = angular.module('starter', ['ionic','ngCordova'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

uwatch.controller('MasterController', function($scope,$rootScope,$http,$ionicPopup ,$state,$timeout, $cordovaFileTransfer) {

    $scope.IP = "172.20.10.3";
    $scope.data = {};

    $scope.signupPage = function(){
      $state.go("register");
    }
    $scope.loginPage = function(){
      $state.go("login");
    }

    var generateCode=function(){
        //var verificationCode = "";
         $rootScope.verificationCode = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 8; i++ )
            $rootScope.verificationCode += possible.charAt(Math.floor(Math.random() * possible.length));
       //return verificationCode;
    }



    var sendVerificationCode = function(_email,verificationCode){
        var request = $http({
            method: "POST",
            url: "http://"+$scope.IP+"/auth/mail.php",
            crossDomain : true,
            data: {
                email: _email,
                code: $rootScope.verificationCode
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        /* Successful HTTP post request or not */
        request.success(function(data) {

        });
    }


//TODO: RESEND EMAIL, EMAIL IS BLANK - MAKE IT GLOBAL
    $scope.showConfirm = function() {
       var confirmPopup = $ionicPopup.confirm({
         title: 'Incorrect code' ,
         template: 'Resend the verification code?'
       });
       confirmPopup.then(function(res) {
         if(res) {
            sendVerificationCode($scope.data.email,$rootScope.verificationCode);
            console.log('resending: ' + $rootScope.verificationCode+ ' to: '+$scope.email);
         } else {
           console.log('cancel');
         }
       });
     };


    $scope.signup = function(username,email,password,cpassword) {
        generateCode();
        
        if(username !== "" && password !== "" && email !== "" ){
            if(cpassword !== password){
                alert("Password does not match");
            }
            else{
                
                //var en = CryptoJS.AES.encrypt(username,"uwatch");
              //  alert(en);
                var hPass = sha512_256(password);
                
                var request = $http({
                    method: "POST",
                    url: "http://"+$scope.IP+"/auth/signup.php",
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
                        alert("Successfully created account");
                        sendVerificationCode(email,$rootScope.verificationCode);
                        $state.go("otp");
                     //$scope.responseMessage = "Successfully Created Account";
                    }
                    if(data == "2"){
                        alert("Failed to creat account");
                     //$scope.responseMessage = "Create Account failed";
                    }
                    else if(data == "0") {
                        alert("User already exists");
                     //$scope.responseMessage = "Email Already Exist";
                    }
                });
            }
        }
    }


    $scope.loginFunction = function(email, password) {
        if(password !== "" && email !== "" ){
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
                else if(data === "999"){
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
       // alert("Otp: "+ otp + " ver: "+$rootScope.verificationCode);
        if((otp != "" || otp != undefined) && otp === $rootScope.verificationCode){
            alert("Success!");
            $state.go("tab.capture");
        }else{
            $scope.otp = "";
            $scope.showConfirm();
        }
    }

    var sendDataToDatabase = function(path,tags,type) {
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
              tags: tags
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      /* Successful HTTP post request or not */
      request.success(function(data) {
          if(data == "1"){
              alert("File details uploaded Successfully");
              
           //$scope.responseMessage = "Successfully Created Account";
          }
          if(data == "2"){
              alert("Failed to upload file details");
           //$scope.responseMessage = "Create Account failed";
          }
          else if(data == "0") {
              alert("File alread exists");
           //$scope.responseMessage = "Email Already Exist";
          }
          else if(data == "999"){
              alert("User does not exit");
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
        var  path = mediaFiles[0].fullPath;
        var p = path.split("/");
        var filename = p[p.length-1];
        sendDataToDatabase(filename,"Hatfiled","image");
        uploadFileToServer(path);
    };
    var captureError = function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };
    navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
  }

  $scope.captureAudio = function(){
      var captureSuccess = function(mediaFiles) {
        var path = mediaFiles[0].fullPath;
        var p = path.split("/");
        var filename = p[p.length-1];
        sendDataToDatabase(filename,"Hatfiled","audio");
        uploadFileToServer(path);
      };
      var captureError = function(error) {
          navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
      };
      navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:1});
  }

  $scope.captureVideo = function(){
    var captureSuccess = function(mediaFiles) {
          var  path = mediaFiles[0].fullPath;
          var p = path.split("/");
          var filename = p[p.length-1];
          sendDataToDatabase(filename,"Hatfiled","audio");
          uploadFileToServer(path);
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



});

uwatch.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $stateProvider
        .state('tab',{
            url:'/tabs',
            abstract:true,
            templateUrl: 'templates/tabs.html',
            catche:false
            
        })
        
        .state('tab.profile',{
            url: '/profile',
            views:{
                'tabs-profile':{
                    templateUrl:'templates/profile.html',
                    controller:'MasterController',
                    catche:false
                }
            }
        })
        .state('tab.view',{
            url: '/view',
            views:{
                'tabs-view':{
                    templateUrl:'templates/view.html',
                    controller:'MasterController'
                }
            }
        })

        .state('login',{
            url: '/login',
            templateUrl:'templates/login.html',
            controller:'MasterController'
        })

        .state('register',{
            url: '/register',
            templateUrl:'templates/register.html',
            controller:'MasterController'
        })
        .state('otp',{
            url: '/otp',
            templateUrl:'templates/otp.html',
            controller:'MasterController'
        })

        .state('tab.capture',{
            url: '/capture',
            views:{
                'tabs-capture':{
                    templateUrl:'templates/capture.html',
                    controller:'MasterController'
                }
            }
        });
    $urlRouterProvider.otherwise('/login');
});

