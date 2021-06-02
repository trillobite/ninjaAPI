'use strict';
// jshint expr: true
//var sm = require('../server/framework/subscriptionManager');
var chai = require('chai');
var expect = chai.expect;
chai.should();



describe('Subscription Manager', function(){
    describe('statePending', function(){
        describe('verifyCode', function(){
            var num;
            beforeEach(function(){
                num = 5;
            });
            afterEach(function(){
                
            });
            it('should be ten when adding 5 and 5', function(){
                num = add(num, 5);
                num.should.equal(10);
            });
            it('should be twelve when adding 7 to 5', function(){
                add(num, 7).should.equal(12);
            });
        });
    });
});

function add(num1, num2){
    return num1 + num2;
}