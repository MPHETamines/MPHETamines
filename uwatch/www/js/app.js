var uwatch = angular.module('uwatch', ['ionic','ngCordova'])
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
        .state('category',{
            url: '/category',
            templateUrl:'templates/category.html',
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
        })
   /*
      .state('intro', {
        url: '/',
        templateUrl: 'templates/intro.html',
        controller: 'IntroCtrl'
      })
      */
      $urlRouterProvider.otherwise("/tabs/capture");

});