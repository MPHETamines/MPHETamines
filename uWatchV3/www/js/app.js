// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'


var myService = angular.module('starter', ['ionic','ngCordova'])

myService.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

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
  This is the main controller for the app, please define all your methods in here 
*/
myService.controller("MasterController", function($scope, $cordovaCamera) {
  //capturing a picture method
    $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
 
        $cordovaCamera.getPicture(options).then(function(imageData) {
            console.log("succesfully took a picture" );
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
            console.log("Error while taking a picture");
        });
    }

 //check internet connection method
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
    }

// Getting the geoLocation method
    $scope.getLocation = function(){
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
      // onError Callback receives a PositionError object
      //
      function onError(error) {
      alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    //define all your methods below this line

});


/*
  These are all the routes for the app. 
  tabs, capture, login, about, are all views for the app
  /tabs - is an abstract view at the bottom of the pages
  /capture - is a view for capturing pde
  /login - is a view for user login
  /about - is a view for details about developers
*/
myService.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('tabs',{
        url:'/tab',
        abstract:true,
        templateUrl: 'templates/tabs.html'

    })
    .state('tabs.capture',{
        url: '/capture',
        views:{
            'tabs-capture':{
                templateUrl:'templates/capture.html',
                controller:'MasterController'
            }
        }
    })
    .state('tabs.view',{
        url:'/view',
        views:{
            'tabs-view':{
                templateUrl:'templates/view.html',
            }
        }
    })

    .state('tabs.login',{
        url:'/login',
        views:{
            'tabs-login':{
                templateUrl:'templates/login.html',
            }
        }
    })
    
    .state('tabs.register',{
        url:'/register',
        views:{
            'tabs-login':{
                templateUrl:'templates/register.html',
            }
        }
    })
    //This is a default view that will load when the app loads
    $urlRouterProvider.otherwise('/tab/capture');
});

