---
layout: udf
title:  ozPhoneFormatPlus
date:   2005-07-27T15:33:16.000Z
library: StrLib
argString: "phoneNumber"
author: Gary Crouch
authorEmail: gc@anatex.net
version: 1
cfVersion: CF5
shortDescription: Checks a phone number for Australian format.
tagBased: false
description: |
 Checks a phone number for Australian format. It checks for:
 - Numbers and spaces are ok
 - Remove spaces and count len must be less than or equal 10
 - If the number starts with a zero then it must have a 2,3,4,7,8 as the next digit after spaces are removed

returnValue: Return a boolean.

example: |
 <cfoutput>
 ozPhoneFormatPlus("apple") = #ozPhoneFormatPlus("apple")#<br>
 ozPhoneFormatPlus("0234612351") = #ozPhoneFormatPlus("0234612351")#
 </cfoutput>

args:
 - name: phoneNumber
   desc: The phone number to check.
   req: true


javaDoc: |
 /**
  * Checks a phone number for Australian format.
  * 
  * @param phoneNumber      The phone number to check. (Required)
  * @return Return a boolean. 
  * @author Gary Crouch (gc@anatex.net) 
  * @version 1, July 27, 2005 
  */

code: |
 function ozPhoneFormatPlus(phoneNumber){
     //REGX to find chrs thats are not numbers or <spaces>
     var re = "[^0-9\.[:space:]]";
     //Allowed 2nd numbers in an Ausie Phone number starting in zero
     var allowedNumbers = "2,3,4,5,7,8";
     //2nd digit in the string
     var current2ndNumber = mid( replace( trim(phoneNumber), " ", "" ), 2, 1 );
 
     //Numbers and spaces are ok
     if(reFindNoCase(re, trim(phoneNumber))) return false;
     
     //Remove spaces and count len must be less than or equal 10
     if(len( replace( trim(phoneNumber), " ", "" ) ) gt 10) return false;
     
     //If the number starts with a zero then it must have a 2,3,4,7,8 as the next digit
     if (left ( replace( trim(phoneNumber), " ", "" ), 1 ) eq 0 and not listFind( allowedNumbers, current2ndNumber ) ) return false;
     
     //If we got here then we must be ok
     return true;
 }

oldId: 1237
---

