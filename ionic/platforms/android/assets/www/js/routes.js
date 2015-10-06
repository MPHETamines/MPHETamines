
/*
  These are all the routes for the app. 
  tabs, capture, login, about, are all views for the app
  /tabs - is an abstract view at the bottom of the pages
  /capture - is a view for capturing pde
  /login - is a view for user login
  /register - is a view for user register
*/

uwatch.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tab',{
            url:'/tabs',
            abstract:true,
            templateUrl: 'templates/tabs.html',
            catche:false
            
        })
        .state('tab.login',{
            url: '/login',
            views:{
                'tabs-login':{
                    templateUrl:'templates/login.html',
                    controller:'LoginController',
                    catche:false
                }
            }
        })
        .state('tab.register',{
            url: '/login/:register',
            views:{
                'tabs-login':{
                    templateUrl:'templates/register.html',
                    controller:'LoginController',
                    catche:false
                }
            }
        })

        .state('tab.view',{
            url: '/view',
            views:{
                'tabs-view':{
                    templateUrl:'templates/view.html',
                    controller:'CaptureController'
                }
            }
        })
        .state('tab.capture',{
            url: '/capture',
            views:{
                'tabs-capture':{
                    templateUrl:'templates/capture.html',
                    controller:'CaptureController'
                }
            }
        });

    $urlRouterProvider.otherwise('/tabs/login');
});
