// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var myService = angular.module("starter", ["ionic", "ngCordova", "firebase"]);
var fb = new Firebase("https://torrid-heat-8946.firebaseio.com/");
//var myService = angular.module('starter', ['ionic','ngCordova'])

myService.run(function($ionicPlatform) {
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
    if(window.Connection){ //check if connaction plugin is installed
      checkConnection();
    }
  });
});

/*

imageApp.controller("SecureController", function($scope, $ionicHistory, $firebaseArray, $cordovaCamera) {

    $ionicHistory.clearHistory();

    $scope.images = [];

    var fbAuth = fb.getAuth();
    if(fbAuth) {
        var userReference = fb.child("users/" + fbAuth.uid);
        var syncArray = $firebaseArray(userReference.child("images"));
        $scope.images = syncArray;
    } else {
        $state.go("firebase");
    }

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
            syncArray.$add({image: imageData}).then(function() {
                alert("Image has been uploaded");
            });
        }, function(error) {
            console.error(error);
        });
    }

});
*/
/*
  This is the main controller for the app, please define all your methods in here 
*/

myService.controller("MasterController", function($ionicPopup, $scope, $state, $ionicHistory, $firebaseArray, $firebaseAuth, $cordovaCamera, $cordovaMedia) {

  //capturing a picture method
    $ionicHistory.clearHistory();
    $scope.images = [];
    var fbAuth = fb.getAuth();
    if(fbAuth) {
        var userReference = fb.child("users/" + fbAuth.uid);
        var syncArray = $firebaseArray(userReference.child("images"));
        $scope.images = syncArray;
    } else {
        $state.go("tabs.login");
    }

//===================== login and register ===========
    var login = function(username, password) {
        var fbAuth = $firebaseAuth(fb);
        fbAuth.$authWithPassword({
            email: username,
            password: password
        }).then(function(authData) {
            $state.go("secure");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    };

    var register = function(username, password) {
        var fbAuth = $firebaseAuth(fb);
        fbAuth.$createUser({email: username, password: password}).then(function(userData) {
            return fbAuth.$authWithPassword({
                email: username,
                password: password
            });
        }).then(function(authData) {
            $state.go("secure");
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    };

//===================================================
/*
//  Dialog box to confirm upload
     var confirmUpload = function() {
       var confirmPopup = $ionicPopup.confirm({
         title: 'Would you like to upload PDE?'
       });
       confirmPopup.then(function(res) {
         if(res) {
           alert('PDE upload success');
         } else {
           alert('PDE was not uploaded');
         }
       });
     };

*/  //popup view
  var loginView = function() {
      $scope.data = {}
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input ng-model="data.username" type="text" placeholder="Username" /><input ng-model="data.password" type="password" placeholder="Password" />',
        title: 'Please login',
        scope: $scope,
        buttons: [
          {
            text: '<b>Login</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.data.username || !$scope.data.password) {
                //don't allow the user to close unless he enters login password
                e.preventDefault();
              } else {
                login($scope.data.username,$scope.data.password);
                alert("logged in");
               // return $scope.data;
              }
            }
          },
          { text: 'Cancel' },
        ]
      });
      myPopup.then(function(res) {
        console.log('Tapped!', res);
      });/*
      $timeout(function() {
         myPopup.close(); //close the popup after 3 seconds for some reason
      }, 12000);*/
     };

//================= capture and upload image ==========
    $scope.uploadPicture = function() {
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
          //confirmUpload();
            if(fbAuth){
              syncArray.$add({image: imageData}).then(function() {
                  alert("Image has been uploaded");
              });
            }else{
              loginView();
            //  $state.go('tabs.login');
            }
        }, function(error) {
           alert(error);
            console.error(error);
        });
    };


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

        alert('Connection type: ' + states[networkState]);
    };

//=============  Getting the geoLocation method ========================
    $scope.getLocation = function(){
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
          var i, path, len;
          for (i = 0, len = mediaFiles.length; i < len; i += 1) {
              path = mediaFiles[i].fullPath;
              // do something interesting with the file
          }
      };
      // capture error callback
      var captureError = function(error) {
          navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
      };
      // start audio capture
      navigator.device.capture.captureAudio(captureSuccess, captureError, {limit:1});
    }


//============ capture image and store in device storage ================
    $scope.captureImage = function(){
        // capture callback
      var captureSuccess = function(mediaFiles) {
          var i, path, len;
          for (i = 0, len = mediaFiles.length; i < len; i += 1) {
              path = mediaFiles[i].fullPath;
              // do something interesting with the file
          }
          if(path)
              alert(path);
      };
      // capture error callback
      var captureError = function(error) {
          navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
      };
      // start image capture
      navigator.device.capture.captureImage(captureSuccess, captureError, {limit:1});
    }

//========== Capture Video using native controller// capture callback ==========
  $scope.captureVideo = function(){
    var captureSuccess = function(mediaFiles) {
        var i, path, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath;
            // do something interesting with the file
        }
    };
    // capture error callback
    var captureError = function(error) {
        navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    };
    // start video capture
    navigator.device.capture.captureVideo(captureSuccess, captureError, {limit:1});
  }

});
