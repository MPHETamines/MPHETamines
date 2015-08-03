
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
                controller:"MasterController"
            }
        }
    })

    .state('tabs.login',{
        url:'/login',
        views:{
            'tabs-login':{
                templateUrl:'templates/login.html',
                controller: 'MasterController'
            }
        }
    })
    
    .state('tabs.register',{
        url:'/register',
        views:{
            'tabs-login':{
                templateUrl:'templates/register.html',
                controller:'MasterController'
            }
        }
    })
    //This is a default view that will load when the app loads
    $urlRouterProvider.otherwise('/tab/capture');
});

