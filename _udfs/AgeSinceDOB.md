---
layout: udf
title:  AgeSinceDOB
date:   2002-11-18T08:58:38.000Z
library: DateLib
argString: "dob"
author: Alexander Sicular
authorEmail: as867@columbia.edu
version: 1
cfVersion: CF5
shortDescription: Given the date of birth, returns age.
tagBased: false
description: |
 Given the date of birth, returns age. ie: 23y or 11m or 6d. Also see GetCurrentAge, which will only return a strict year result.

returnValue: Returns a string.

example: |
 <cfoutput>ageSinceDOB(1/26/1979)=#ageSinceDOB("1/26/1979")#</cfoutput>

args:
 - name: dob
   desc: Date of birth.
   req: true


javaDoc: |
 /**
  * Given the date of birth, returns age.
  * 
  * @param dob      Date of birth. (Required)
  * @return Returns a string. 
  * @author Alexander Sicular (as867@columbia.edu) 
  * @version 1, November 18, 2002 
  */

code: |
 function ageSinceDOB(dob) {
   
   var ageYR = DateDiff('yyyy', dob, NOW());
   var ageMO = DateDiff('m', dob, NOW());
   var ageWK = DateDiff('ww', dob, NOW());
   var ageDY = DateDiff('d', dob, NOW());
   var age = "";
   
   if ( isDate(dob) ){    
     if (now() LT dob){
       age = "NA";
     }else{  
       if (ageYR LT 2) {
         age = ageMO & "m";
           if (ageMO LT 1) {
             age = ageWK & "w";
           }
           if (ageWK LT 1) {
             age = ageDY & "d";
           }
       }else{
         age = ageYR & "y";
       }  
     }  
   }else{    
     age = "NA";
   }  
   return age;
 }

oldId: 802
---

