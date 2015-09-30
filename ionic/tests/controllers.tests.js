'use strict'
describe('Testing the correct login', function() {
  beforeEach(module('starter'));
  var scope,ctrl;

    beforeEach(inject(function($controller, $rootScope) {  
    scope = $rootScope;
    ctrl = $controller("MasterController",{$scope: scope});

    }));

    it(" should say user does not exit", function()
      {
        expect(scope.correctLogin()).toBe("martha@gmail.com");
      });
  });

describe('Testing the valid PDE', function(){
  beforeEach(module('starter'));
  
  it("should say the correct PDE captured", inject(function($controller, $rootScope) {
    var scope = {};
    var myController = $controller('MasterController', {
      $scope: scope
      });
    expect(scope.captureImage()).to.equal(null);

  }));
});

describe('Testing the valid PDE',function(){
  beforeEach(module('starter'));

  it("should say the correct PDE uploaded", inject(function($controller, $rootScope) {
    var myController = $controller('MasterController', {
      $scope: scope
      });
    expect(scope.captureImage())not.toBe(null);
  }));


});