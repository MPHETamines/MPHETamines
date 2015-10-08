uwatch.controller('MasterController', function($scope,$rootScope,$http,$ionicPopup, $ionicLoading, $state,$timeout, $cordovaFileTransfer,$ionicPlatform, $cordovaBatteryStatus,$cordovaToast,$cordovaProgress) {

    $scope.IP = "172.20.10.3";
   // $scope.IP = "192.168.43.60";
    //$scope.data = {};

    var checkBattery = function(){
      $ionicPlatform.ready(function() {
          $rootScope.$on("$cordovaBatteryStatus:status", function(event, args) {
              if(args.isPlugged) {
                  console.log("Charging -> " + args.level + "%");
              } else {
                  console.log("Battery -> " + args.level + "%");
              }
              
              $rootScope.battery = args.level;
          });
      });
    }

      $http.get('js/config.json').success(function(data){
        //$scope.variables = data.variables;
        $scope.IP = data.ip;
        alert("DATA: "+data);
        $scope.refresh = function(){
            $http.get('js/config.json').success(function(data){
             // $scope.variables = data.variables;
              $scope.IP = data.ip;
              $scope.$broadcast('scroll.refreshComplete');
            })
        };
      });

    //  alert("Your IP address: "+$scope.IP);


//======== POPUP functions =============
   $scope.showConfirm = function(title,template) {
     var confirmPopup = $ionicPopup.confirm({
       title: title,
       template: '<p style="text-align:center">'+template+'</p>'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('resend otp');
       } else {
         console.log('retry verify otp');
       }
     });
   };

  $scope.showPopup = function() {
     var myPopup = $ionicPopup.show({
      title: 'Invalid OTP',
      template: '<p style="text-align:center">Would you like to resend OTP?</p>',
      subTitle: 'OTP is case sensitive',
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Resend</b>',
          type: 'button-positive',
          onTap: function(e) {
              $scope.resendCode();
          }
        },
      ]
    });
    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
   };

//======= Helper functions =============  
    $scope.signupPage = function(){
      $state.go("register");
    };
    $scope.loginPage = function(){
      $state.go("login");
    };
    $scope.encryptString = function(str){
      var enc = CryptoJS.AES.encrypt(str, "uWatch Master Password");
      console.log("Encrypted: "+enc);
      return enc;
    } ;
    $scope.decryptString = function(str){
      var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
      var dec = decrypted.toString(CryptoJS.enc.Utf8)
      console.log("Decrypted: "+dec);
      return dec;

    };
    var showAlert = function(title,template) {
       var alertPopup = $ionicPopup.alert({
         title: '<b>'+title+'</b>',
         template: '<p style="text-align:center">'+template+'</p>'
       });
       alertPopup.then(function(res) {
         console.log(res);
       });
    };
    $scope.resendCode = function(){
      generateCode(); //generate a new OTP
      showToast('OTP resend','short','center');
      //alert($rootScope.email +" : "+ $rootScope.verificationCode)
      sendVerificationCode($rootScope.email, $rootScope.verificationCode);
    };

    
    var showToast = function(message, duration, location) {
      $cordovaToast.show(message, duration, location).then(function(success) {
          console.log("The toast was shown");
      }, function (error) {
          console.log("The toast was not shown due to " + error);
      });
    };

    $scope.verifyCode = function(otp){
      alert(otp + " : "+$rootScope.verificationCode);
      alert($rootScope.username + " "+$rootScope.email + " "+$rootScope.password);
      if(otp == "" || otp == undefined){
        showAlert('Empty OTP', 'Please enter a code emailed to you or resend the code.');
      }
      else if(otp != undefined && otp === $rootScope.verificationCode){
          showToast('Correct code','short','center');
          $scope.signup($rootScope.username,$rootScope.email,$rootScope.password);
      }else{
            $scope.showPopup();
      }
    }


//=========== GENERATE RANDOM VERIFICATION CODE ============
    var generateCode=function(){
        //var verificationCode = "";
         $rootScope.verificationCode = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 8; i++ )
            $rootScope.verificationCode += possible.charAt(Math.floor(Math.random() * possible.length));
       //return verificationCode;
    };

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
          showToast('Verification code send', 'short', 'bottom')
          console.log(data);
        });
    };


    $scope.getUserData = function(username,email,password,cpassword){
        if(username == "" || username == undefined || password == "" || password == undefined ){
            showAlert("Signup alert","Please complete all the input fields.");
        }
        else if(password !== cpassword){
          showAlert("Signup failed","passwords do not macth");
        }else{
          generateCode();
          sendVerificationCode(email,$rootScope.verificationCode); //generate verification code and send
          $rootScope.username = username;
          $rootScope.email = email;
          $rootScope.password = password;
          $state.go("otp");
        }

    };
//============= SIGN UP / REGISTER =============
    $scope.signup = function(username,email,password) {
       $ionicLoading.show({
          template: "Signing up ..."
       });

       $timeout(function(){
          $ionicLoading.hide();
       },3000);

          //Hash email, username and password
          var usernameHash = sha512_256(username);
          var passwordHash = sha512_256(password);
          var emailHash = sha512_256(email); 
          //encrypt email, username and password
          var request = $http({
              method: "POST",
              url: "http://"+$scope.IP+"/auth/signup.php", //insert user in a session variable
              crossDomain : true,
              data: {
                  email: email,
                  password: passwordHash,
                  username: username
              },
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
          /* Successful HTTP post request or not */
           request.success(function(data) {
         //     $ionicLoading.hide();
              if(data == "1"){
                //sendVerificationCode(email,$rootScope.verificationCode);
                showToast('Account Successfully created','short', 'bottom');
                $state.go("tab.capture");
                //$scope.responseMessage = "Successfully Created Account";
              }
              else if(data == "2"){
                showAlert("Signup","Failed to creat account, please try again");
              //$scope.responseMessage = "Create Account failed";
              }
              else if(data == "0") {
                showAlert("Signup", "The provided email address is already in use.");
              //$scope.responseMessage = "Email Already Exist";
              }
              else{
               showAlert("Signup Error", data);
              }
              
          });
    };

    $scope.loginFunction = function(email, password) {
       $ionicLoading.show({
          template:'logging in...'
        });

       $timeout(function(){
          $ionicLoading.hide();
       },3000);
  //      $cordovaProgress.showSimpleWithLabel(true, "Loading") // .hide()
        if(password !== "" && email !== "" ){
            var passwordHash = sha512_256(password);
            var emailHash = sha512_256(email);
            var request = $http({
                method: "POST",
                url: "http://"+$scope.IP+"/auth/login.php",
                crossDomain : true,
                data: {
                    email: email,
                    password: passwordHash
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Successful HTTP post request or not */
            request.success(function(data) {
                $ionicLoading.hide();
                if(data == "0"){
                    showToast('Login success','short','bottom');
                    $state.go("tab.capture");
                }
                else if(data == "1" ) {
                    showAlert("Login","Provided username is not registered, please signup.");
                }
                else if(data == "2" ) {
                    showAlert("Login","Provided username or password is not valid.");
                }
                else {
                    showAlert("Login Error","Something went wrong");
                }
            });

        }
    };

    $scope.logoutFunction = function() {
      $ionicLoading.show({
          template:'logging off...'
        });

       $timeout(function(){
          $ionicLoading.hide();
       },3000);

      var request = $http({
          method: "POST",
          url: "http://"+$scope.IP+"/auth/logout.php",
          crossDomain : true,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      /* Successful HTTP post request or not */
      request.success(function(data) {
          $ionicLoading.hide();
          if(data == "0"){
              $rootScope.username = "";
              $rootScope.email = "";
              $rootScope.password = "";
              $state.go("login");
          }
          else if(data == "1" ) {
              alert("Error: Session not found");
          }
          else{
            alert("Something went wrong");
          }
      });
    };

  $scope.sendOption = function(category){
      if(category == undefined){
        showAlert("Category","Please choose an option from the categories");
      }else{
        uploadFile($rootScope.path);
        sendDataToDatabase($rootScope.filename,"Hatfiled",$rootScope.filetype,category);
        $state.go("tab.capture");
      }
      
  };
    


    var sendDataToDatabase = function(filename,location,filetype,category) {
      // $ionicLoading.show({
      //     template:'Uploading...'
      // });
     // $cordovaProgress.showSimpleWithLabel(true, "Sending metadata ...");
      var request = $http({
          method: "POST",
          url: "http://"+$scope.IP+"/auth/filedata.php",
          crossDomain : true,
          data: {
              filename: filename,
              location: location,
              filetype: filetype,
              hash: sha512_256(filename),
              category: category
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      /* Successful HTTP post request or not */
      request.success(function(data) {
          //$ionicLoading.hide();
       //   $cordovaProgress.hide();
          if(data == "1"){
            //  alert("File details uploaded Successfully");
            showToast('File uploaded Successfully','long', 'bottom');
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

    };

  var uploadFile = function(targetPath) {
      $cordovaProgress.showSimpleWithLabel(true, "Uploading evidence ...");

      var url = "http://"+$scope.IP+"/auth/upload.php";
      //target path may be local or url
     // var targetPath = "/android_asset/www/img/apple.png";
        var filename = targetPath.split("/").pop();
        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false
        };
        $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
            $cordovaProgress.hide();
            console.log("SUCCESS: " + JSON.stringify(result.response));
            showToast('File uploaded Successfully','bottom', 'short');
          //  alert("success");
            //alert(JSON.stringify(result.response));
        }, function(err) {
            $cordovaProgress.hide();
            console.log("ERROR: " + JSON.stringify(err));
            alert(JSON.stringify(err));
        }, function (progress) {
          $cordovaProgress.hide();
            // constant progress updates
            $timeout(function () {
              $scope.downloadProgress = (progress.loaded / progress.total) * 100;
            })
        });
    }


  $scope.captureImage = function(){
    checkBattery();
    if($rootScope.battery < 70){
      alert("Battery too low to capture");
      return;
    }
    var captureSuccess = function(mediaFiles) {
        $rootScope.path = mediaFiles[0].fullPath;
        var p = $rootScope.path.split("/");
        $rootScope.file = mediaFiles[0];
        $rootScope.filename = p[p.length-1];
        $rootScope.filetype = "image";
        $state.go("category");
    };
    var captureError = function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };
    navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
  };

  $scope.captureAudio = function(){
      var captureSuccess = function(mediaFiles) {
       $rootScope.path = mediaFiles[0].fullPath;
        var p = $rootScope.path.split("/");
        $rootScope.file = mediaFiles[0];
        $rootScope.filename = p[p.length-1];
        $rootScope.filetype = "audio";
        $state.go("category");
      };
      var captureError = function(error) {
          navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
      };
      navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:1});
  };

  $scope.captureVideo = function(){
    var captureSuccess = function(mediaFiles) {
        $rootScope.path = mediaFiles[0].fullPath;
        var p = $rootScope.path.split("/");
        $rootScope.file = mediaFiles[0];
        $rootScope.filename = p[p.length-1];
        $rootScope.filetype = "video";
        $state.go("category");
    };
    var captureError = function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };
    navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
  };

  $scope.getLoc = function(){
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


    //======= Getting timestamp method====
  $scope.getTimestamp = function() {
    var date = new Date();
    alert(date.getFullYear() +'/'+ ('0' + (date.getMonth() + 1)).slice(-2) +'/'+ ('0' + date.getDate()).slice(-2) + " " + date.getHours() + ":" + date.getMinutes());
  };


    //=============  Getting the geoLocation method ========================
    $scope.getLocation = function(){
    
        if(navigator.geolocation == false){
          alert("No geoLocation");
        }

        navigator.geolocation.getCurrentPosition(function(pos) {
          geocoder = new google.maps.Geocoder();
          var infowindow = new google.maps.InfoWindow;
          var latlng = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
          
          geocoder.geocode({'latLng': latlng}, function(results, status) 
          {
            if (status == google.maps.GeocoderStatus.OK) 
            {
            if (results[1]) {
              var marker = new google.maps.Marker({
              position: latlng});
              infowindow.setContent(results[1].formatted_address);
              var actualLocation = results[1].formatted_address;
            
              alert(actualLocation);
            } 
            else 
            {
              alert("Geocoder failed due to: " + status);
            }
          }
          });
        });
        
        var onGetCurrentPositionError = function(error) { 
          console.log("Couldn't get geo coords from device");
        } 
            
    };


});
