//inject any dependancies here
var uwatch = angular.module("uwatch", ["ionic", "ngCordova","firebase"]);
var fb = new Firebase("https://torrid-heat-8946.firebaseio.com/");

uwatch.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //console.log(Media);
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }   
    if(window.Connection){ //check if connection plugin is installed
      checkConnection(); //check type of connection
      getLocation() //for demonstration purpose
    }


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
        information.connection = states[networkState];
        alert('Connection type: ' + states[networkState]);



    //=============  Getting the geoLocation method ========================

  });
});

uwatch.controller("LoginController", function($scope, $state, $firebaseAuth, $ionicLoading, $ionicPopup, $timeout) {

    var loading = function(){
      // Setup the loader
          $ionicLoading.show({
            content: 'Loading',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 0
          });
          
          // Set a timeout to clear loader, however you would actually call the $ionicLoading.hide(); method whenever everything is ready or loaded.
          $timeout(function () {
            $ionicLoading.hide();
          }, 3000);
          
    };

     var alertError = function(errMsg) {
       var alertPopup = $ionicPopup.alert({
         title: 'Error',
         template: errMsg
       });
       alertPopup.then(function(res) {
         console.log(msg);
       });
     };


    var fbAuth = $firebaseAuth(fb);
    $scope.firebaseLogin = function(username, password) {

        fbAuth.$authWithPassword({
            email: username,
            password: password
        }).then(function(authData) {
            loading();
            $state.go("tab.view");
        }).catch(function(error) {
            alertError("Username not registered");
            console.error("ERROR: " + error);
        });

    };

    $scope.firebaseRegister = function(username, password, cpassword) {
      if(password !== cpassword){
        alertError("Password does not match");
        $state.go("tab.register");
      }
      else{
        fbAuth.$createUser({
            email: username,
             password: password
         }).then(function(userData) {
            return fbAuth.$authWithPassword({
                email: username,
                password: password
            });
        }).then(function(authData) {
            loading();
            $state.go("tab.view");
        }).catch(function(error) {
            alertError(error);
            console.error("ERROR: " + error);
        });
      }

    };

    // Password strength
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    $scope.passwordStrength = {
        //css will be added dynamically
    };


    //checks password strength
    $scope.analyze = function(value) {
        if(strongRegex.test(value)) {
            $scope.strength = "Strong password";
            $scope.passwordStrength["background-color"] = "green";
        }
        else if(mediumRegex.test(value)) {
            $scope.strength = "Medium  password";
            $scope.passwordStrength["background-color"] = "orange";
        }
        else {
            $scope.strength = "Weak Password";
            $scope.passwordStrength["background-color"] = "red";
        }

    };
    //checks passwords match
    $scope.analyzeMatch = function(pass, cpass) {
        if(pass != cpass) {
            $scope.strength = "Password does not macth";
            $scope.passwordStrength["background-color"] = "red";
        }
        else {
            $scope.strength = "Passwords match";
            $scope.passwordStrength["background-color"] = "green";
        }
    };

});

uwatch.controller("CaptureController", function($scope, $ionicHistory, $firebaseArray, $ionicPopup, $cordovaCamera) {

    $ionicHistory.clearHistory();

    $scope.images = [];

    var fbAuth = fb.getAuth();
    if(fbAuth) {
        var userReference = fb.child("users/" + fbAuth.uid);
        var syncArray = $firebaseArray(userReference.child("images"));
        $scope.images = syncArray;
    } 
    /*else {
        $state.go("tab.login");
    }*/


//============= check internet connection method =================
  var checkConnection = function() {
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
        information.connection = states[networkState];
        alert('Connection type: ' + states[networkState]);
    };


    //=============  Getting the geoLocation method ========================
    var getLocation = function(){
      var onSuccess = function(position) {
      alert('Latitude: '        + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
      };
      // onError Callback receives a PositionError object
      //
      function onError(error) {
          alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    };



    //=======  Capture Audio using native record ==============
       $scope.captureAudio = function(){
          // capture callback
          var captureSuccess = function(mediaFiles) {

             var path = mediaFiles[0].fullPath; //we are only capturing one pde at a time
                  // do something interesting with the file
          };
          // capture error callback
          var captureError = function(error) {
              navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
          };
          // start audio capture
          navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:1});
        };


    //============ capture image and store in device storage ================
        $scope.captureImage = function(){
            // capture callback
          var captureSuccess = function(mediaFiles) {
             var path = mediaFiles[0].fullPath; //we are only capturing one pde at a time
                  // do something interesting with the file
          };
          // capture error callback
          var captureError = function(error) {
              navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
          };
          // start image capture
          navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
        };

    //========== Capture Video using native controller// capture callback ==========
      $scope.captureVideo = function(){
        var captureSuccess = function(mediaFiles) {
           var path = mediaFiles[0].fullPath; //we are only capturing one pde at a time
                  // do something interesting with the file
        };
        // capture error callback
        var captureError = function(error) {
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
        };
        // start video capture
        navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
      };

});

/*
    $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            var confirmPopup = $ionicPopup.confirm({
                 title: 'Confirmation',
                 template: 'Are you sure you want to upload the image?'
               });
               confirmPopup.then(function(res) {
                 if(res) {
                    syncArray.$add({image: imageData}).then(function() {
                        alert("Image has been uploaded");
                    });
                   console.log('You are sure');
                 } else {
                    alert("Image not uploaded");
                   console.log('You are not sure');
                 }
            });
            
        }, function(error) {
            console.error(error);
        });
    }

*/