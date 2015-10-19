
uwatch.controller('MasterController', function($scope,$rootScope,$http,$ionicPopup, $ionicLoading, $state,$timeout, $cordovaFileTransfer,$ionicPlatform, $cordovaBatteryStatus,$cordovaToast,$cordovaProgress) {

   // $scope.IP = "192.168.42.61";
    //$scope.IP = "192.168.43.60"; //Sumsang
    $scope.IP = "172.20.10.3"; //ios

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
         $rootScope.otp = "";
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
    var encryptString = function(encrypt){
      var enc = CryptoJS.AES.encrypt(encrypt, "uWatch Master Password");
      console.log("Encrypted: "+enc);
  //    alert(enc);
      return enc;
    } ;
    var decryptString = function(encrypted){
      var decrypted = CryptoJS.AES.decrypt(encrypted, "uWatch Master Password");
      var dec = decrypted.toString(CryptoJS.enc.Utf8)
      console.log("Decrypted: "+dec);
//      alert(dec);
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
      showToast('OTP resend','long','bottom');
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
      // alert(otp + " : "+$rootScope.verificationCode);
      // alert($rootScope.username + " "+$rootScope.email + " "+$rootScope.password);
      if(otp == "" || otp == undefined){
        showAlert('Empty OTP', 'Please enter a code emailed to you or resend the code.');
      }
      else if(otp != undefined && otp === $rootScope.verificationCode){
       //   showToast('Correct code','short','bottom');
          $scope.signup($rootScope.username,$rootScope.email,$rootScope.password);
      }else{
            $scope.showPopup();
      }
    }

    $scope.checkBox = function(data){
     
      var check1 = document.getElementById("isChecked1");
      var check2 = document.getElementById("isChecked2");
      alert(check1.checked  + " " + check2.checked);      
    }
    $scope.data = {};

    var setUserData = function(){
        var request = $http({
              method: "POST",
              url: "http://"+$scope.IP+"/auth/userdata.php", //insert user in a session variable
              crossDomain : true,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
          /* Successful HTTP post request or not */
           request.success(function(data) {
         //     $ionicLoading.hide();
            if(data.split('`') != "" || data.split('`') != undefined){
              $rootScope.fullname = data.split('`')[0];
              $rootScope.email = data.split('`')[1];
            }
          });
    }

    $scope.getEmail = function(){
      return $rootScope.email;
    }
    $scope.getFullname = function(){
      return $rootScope.fullname;
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

    var generateNewPassword=function(){
        //var newPassword = "";
        $rootScope.newPassword = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for( var i=0; i < 8; i++ )
            $rootScope.newPassword += possible.charAt(Math.floor(Math.random() * possible.length));
       //return newPassword;
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
          showToast('Email has been successfully sent', 'short', 'bottom')
          console.log(data);
        });
    };


    $scope.getUserData = function(username,email,password,cpassword){
        if(username == "" || username == undefined || password == "" || password == undefined ){
            showToast("Complete all the input fields","long","center");
        }
        else if(password !== cpassword){
            showToast("Password does not match","long","center");
        }else{
          var request = $http({
              method: "POST",
              url: "http://"+$scope.IP+"/auth/isRegistered.php", //insert user in a session variable
              crossDomain : true,
              data: {
                  email: email
              },
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
          /* Successful HTTP post request or not */
           request.success(function(data) {
         //     $ionicLoading.hide();
              if(data == "0"){
                showAlert("Registration failed","Email address provided already exists");
                $state.go("register");
                //$scope.responseMessage = "Successfully Created Account";
              }
              else if(data == "1"){
                generateCode();
                sendVerificationCode(email,$rootScope.verificationCode); //generate verification code and send
                $rootScope.username = username;
                $rootScope.email = email;
                $rootScope.password = password;
                $state.go("otp");
              }
              else{
               alert("Signup Error");
              }
              
          });

        }

    };
//============= SIGN UP / REGISTER =============
    $scope.signup = function(username,email,password) {
        if(username != undefined && password != undefined){
           $ionicLoading.show({
             template: "Signing up ..."
           });  
          var passwordHash = sha512_256(password);
          var request = $http({
              method: "POST",
              url: "http://"+$scope.IP+"/auth/register.php", //insert user in a session variable
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
              $ionicLoading.hide();
              if(data == "1"){
                setUserData();
                showToast('Account successfully created','long', 'bottom');
                $state.go("tab.capture");
              }
              else if(data == "2"){
              //  showToast("Failed to create account","long","center");
                showAlert("Registration","Failed to create account");
              }
              else if(data == "0") {
                showAlert("Registration","Email address is already in use");
                //showToast("Email address is already in use","long","center");
              }
              else{
                showAlert("Registration","Failed to create account");
              // showToast("Failed to create account","long","center");
              }
          });
          $ionicLoading.hide();
        }
    };

    $scope.loginFunction = function(email, password) {
        if(password != undefined && email !== undefined ){
            $ionicLoading.show({
              template:'logging in...'
            });
            //encryptString(password).toString()
            var passwordHash = sha512_256(password);
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
                if(data == "2" ) {
                    showAlert("Login","Username is not registered");
                    //showToast("Username is not registered, please signup","long","center");
                }
                else if(data == "1" ) {
                  showAlert("Login","Username and password do not match");
                  //  showToast("Username and password do not match","long","center");
                }
                else if(data == "0"){
                    showToast('Login success','short','center');
                    setUserData();
                    $state.go("tab.capture");
                }
                else{
                   showAlert("Login","Error while logging in");
                   // showToast("Error while logging in","long","center");
                 }
            });
            $ionicLoading.hide();
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
              $state.go("login");
          }
          else if(data == "1" ) {
              showToast("Session not set","short","center");
          }
          else{
            showToast("Server not reponding","long", "center");
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
       //$ionicLoading.show({
      //     template:'Uploading...'
      // });
      //$cordovaProgress.showSimpleWithLabel(true, "Sending metadata ...");
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
          $cordovaProgress.hide();
          if(data == "1"){
            //  alert("File details uploaded Successfully");
            showToast('File uploaded Successfully','long', 'bottom');
          }
         else if(data == "2"){
              showToast("Failed to upload file metadata","long","center");
          }
          else if(data == "999"){
              showToast("User does not exists","long","center");
          }else{
            showToast("Server is not responding","long","center");
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

        $cordovaProgress.hide();
    }


  $scope.captureImage = function(){
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


    $scope.connection = function() {
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

    $scope.geo = function(){
      var onSuccess = function(position) {
          alert('Latitude: '          + position.coords.latitude          + '\n' +
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
    }


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
          if (status == google.maps.GeocoderStatus.OK) {
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

  $scope.forgotPassword = function() {
      $scope.data = {}
      var myPopup = $ionicPopup.show({
        template: '<input type="email" ng-model="data.email">',
        title: 'Enter email address to recover password',
        subTitle: 'Email address must be registered',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Recover</b>',
            type: 'button-positive',
            onTap: function(e) {
              $ionicLoading.show({
                template: "Please wait..."
              });
              if (!$scope.data.email) {
                e.preventDefault();
                $ionicLoading.hide();
              } else {
                return $scope.data.email;
              }
            }
          },
        ]
      });
      myPopup.then(function(res) {
        // $ionicLoading.hide();
        recoverPassword(res);
        console.log('Tapped!', res);
      });
 };


 var recoverPassword = function(email){
   $ionicLoading.show({
      template: "Please wait..."
    });
   var request = $http({
      method: "POST",
      url: "http://"+$scope.IP+"/auth/recover.php",
      crossDomain : true,
      data: {
          email: email
      },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  /* Successful HTTP post request or not */
  request.success(function(data) {
     $ionicLoading.hide();
      if(data == "0"){
        showToast("Email address is not registered","long","center");
      }
      else if(data == "2"){
        showToast("Email address is not registered","long","center");
      }
      else if(data == "1"){
         // sendVerificationCode(d)
          //var email = data.split("`")[0];
          //var pass = data.split("`")[1];
          generateNewPassword();
          sendAndUpdate(email, $rootScope.newPassword);
          //alert("Sssssss");
          // alert(email +" "+$rootScope.newPassword+ " "+data.split("`")[2]);
          // sendVerificationCode(email, newPassword);
          // alert("Password recovered");
      //    showToast("Password has been recovered","long","center")
      }else{
        showToast("Server problems","long","center");
      }
      
  });

  $ionicLoading.hide();
 
 }

 var sendAndUpdate = function(email, password){
     var hash = sha512_256(password);
     var request = $http({
          method: "POST",
          url: "http://"+$scope.IP+"/auth/sendAndUpdate.php",
          crossDomain : true,
          data: {
              email: email,
              password: password,
              hashPassword: hash
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      /* Successful HTTP post request or not */
      request.success(function(data) {
          if(data == "0"){
            showToast("Failed to update email address","long","center");
          }
         else if(data == "2"){
              showToast("Username is not registered","long","center");
          }
          else if(data == "1"){
              showToast("Successfully updated password","long","center");
          }else{
            showToast("Server is not responding","long","center");
          }
      });
 }

    $scope.updatePassword = function() {
        $scope.data = {}
        var myPopup = $ionicPopup.show({
          template: '<input type="password" ng-model="data.password" placeholder="New password"><input type="password" placeholder="Confirm password" ng-model="data.password1">',
          title: 'Update password',
          subTitle: 'Password must be atleast 6 characters long',
          scope: $scope,
          buttons: [
            { text: 'Cancel' },
            {
              text: '<b>Update</b>',
              type: 'button-positive',
              onTap: function(e) {
                $ionicLoading.show({
                  template: "Please wait..."
                });
                if (!$scope.data) {
                  e.preventDefault();
                } else {
                  return $scope.data;
                }
              }
            },
          ]
        });
        myPopup.then(function(res) {
          updatePass(res.password, res.password1);
          console.log('Tapped!', res);
        });
   };



 var updatePass = function(pass1,pass2){
    if(pass1 != pass2){
      $ionicLoading.hide();
      showToast("Password does not match","long","center");
    }
    else{
         var passwordHash = sha512_256(pass1);
         var request = $http({
              method: "POST",
              url: "http://"+$scope.IP+"/auth/update.php",
              crossDomain : true,
              data: {
                  password: passwordHash
              },
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
          /* Successful HTTP post request or not */
          request.success(function(data) {
             $ionicLoading.hide();
              if(data === "2"){
                  showToast('Email address is not registered','short','bottom');
              }
              else{
                showAlert("Update success","Your password has been Successfully updated.");
              }
          });

      }
    }
   
   $scope.confirmDelete = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Delete account',
       template: 'Are you sure you want to delete account?'
     });
     confirmPopup.then(function(res) {
       if(res) {
          deletAccount();
         console.log('Sure: account deleted');
       } else {
         console.log('You are not sure');
       }
     });
   };
  
  var deletAccount = function(){
        var request = $http({
              method: "POST",
              url: "http://"+$scope.IP+"/auth/delete.php",
              crossDomain : true,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
          });
          /* Successful HTTP post request or not */
          request.success(function(data) {
             $ionicLoading.hide();
              if(data == "2"){
                showToast("Account does not exists","long","center");
              }
              else if(data == "1"){
                showToast("Your account is successfully deleted","long","center");
                $state.go("login");
              }
              else if(data == "0"){
                showToast("Failed to deleted account","long","center");
                showAlert("Delete failed","Account was not deleted");
              }
              else{
                showToast("Server not responding","long","center");
              }
          });
    }  
   
  $scope.getNumFiles = function(){
      numFile();
      return $rootScope.files;
  }

   var numFile= function(){
      var request = $http({
          method: "POST",
          url: "http://"+$scope.IP+"/auth/files.php",
          crossDomain : true,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      /* Successful HTTP post request or not */
      request.success(function(data) {
          if(data == "2"){
            showToast("No files in the db","long","center");
          }
          else if(data != "" && data != undefined){

              $rootScope.files = data;
          }
          else{
            showToast("Upload Error","Server not responding");
          }
      });
   } 
   
});

uwatch.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('login');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
});

uwatch.controller('MainCtrl', function($scope, $state) {
  console.log('MainCtrl');
  
  $scope.toIntro = function(){
    $state.go('intro');
  }

});