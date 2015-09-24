/*
===    Install dependencies: ===
1. install 
npm install karma –save-dev  
npm install karma-cli -g  
npm install jasmine –save-dev  
npm install karma-chrome-launcher –save-dev 
bower install angular-mocks#1.2.26  

2. karma init  

3. karma start  

4. karma run  
*/

module.exports = function(config) {  
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: ‘’,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [‘jasmine’],

    // list of files / patterns to load in the browser
    files: [
    //Angular source
    ‘lib/ionic/js/ionic.bundle.js’,
    ‘lib/angular-mocks/angular-mocks.js’,
    ‘lib/angular-local-storage/dist/angular-local-storage.js’,
    ‘lib/ngCordova/dist/ng-cordova.js’,
    ‘lib/ionic/js/angular-ui/angular-ui-router.js’,
    ‘lib/angular-animate/angular-animate.js’,
    ‘lib/angular-sanitize/angular-sanitize.js’,

    //App code
    ‘js/app.js’,
    ‘js/controllers.js’,
    ‘js/services.js’,

    //Test files
    ‘test/controllers.js’
    ],

    // list of files to exclude
    exclude: [
      ‘karma.conf.js’
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: ‘dots’, ‘progress’
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [‘progress’],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [‘Chrome’],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};

describe(“AuthCtrl Unit Tests”, function () {

    var $scope, ctrl, $timeout, $timeout, $http; //, $location;

    beforeEach(function () {
        module(uwatch);

        inject(function ($rootScope, $controller, $q, _$timeout_) {
            $scope = $rootScope.$new();
            $timeout = _$timeout_;

            ctrl = $controller(‘AppCtrl’, {
                $scope: $scope
            });
        });
    });

    it(“should have a $scope variable”, function() {
        expect($scope).toBeDefined();
    });

});
