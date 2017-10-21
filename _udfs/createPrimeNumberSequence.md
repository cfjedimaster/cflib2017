---
layout: udf
title:  createPrimeNumberSequence
date:   2014-10-17T08:27:20.000Z
library: CFMLLib
argString: ""
author: Adam Cameron
authorEmail: dac.cfml@gmail.com
version: 1
cfVersion: CF10
shortDescription: Creates a &quot;generator&quot; for returning prime numbers, in sequence
description: |
 Each call to the function returned from createPrimeNumberSequence() returns the next prime number.

returnValue: Returns a function which when called returns the next prime number

example: |
 component extends="testbox.system.BaseSpec" {
 
     function beforeAll(){
         include "udfs/createPrimeNumberSequence.cfm";
     }
 
     function run(){
         describe("Tests for createPrimeNumberSequence()", function(){
             it("returns primes", function(){
                 var primeSequence = createPrimeNumberSequence();
                 var primes = [];
                 for (var i=1; i++ <= 10;){
                     primes.append(primeSequence());
                 }
                 expect(
                     primes
                 ).toBe([2,3,5,7,11,13,17,19,23,29]);
             });
         });
     }
 
 }

args:


javaDoc: |
 /**
  * Creates a &quot;generator&quot; for returning prime numbers, in sequence
  * 
  * @return Returns a function which when called returns the next prime number 
  * @author Adam Cameron (dac.cfml@gmail.com) 
  * @version 1.1, October 17, 2014 
  */

code: |
 function createPrimeNumberSequence(){
     var primes = [2]
     var potential = 1
 
     return function(){
         while (true) {
             potential += 2
             var upperThresholdToCheck = sqr(potential)
             var potentialIsPrime = true
             for (var prime in primes){
                 request.called++
                 if (potential mod prime == 0) {
                     potentialIsPrime = false
                     break;
                 }
                 if (prime > upperThresholdToCheck) break;
             }
             if (potentialIsPrime) {
                 primes.append(potential)
                 return primes[primes.len()-1]
             }
         }
     }
 }

---

