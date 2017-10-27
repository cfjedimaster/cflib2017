---
layout: udf
title:  getRandString
date:   2004-02-03T15:44:29.000Z
library: StrLib
argString: "stringLenth"
author: Kenneth Rainey
authorEmail: kip.rainey@incapital.com
version: 1
cfVersion: CF5
shortDescription: Returns a random alphanumeric string of a user-specified length.
tagBased: false
description: |
 getRandString is an easy-to-use random string generator. Pass it a integer, and it returns a random alphanumeric string of the specified length.

returnValue: Returns a string.

example: |
 <cfoutput>#getRandString(15)#</cfoutput>

args:
 - name: stringLenth
   desc: Length of random string to generate.
   req: true


javaDoc: |
 /**
  * Returns a random alphanumeric string of a user-specified length.
  * 
  * @param stringLenth      Length of random string to generate. (Required)
  * @return Returns a string. 
  * @author Kenneth Rainey (kip.rainey@incapital.com) 
  * @version 1, February 3, 2004 
  */

code: |
 function getRandString(stringLength) {
     var tempAlphaList = "a|b|c|d|e|g|h|i|k|L|m|n|o|p|q|r|s|t|u|v|w|x|y|z";
     var tempNumList = "1|2|3|4|5|6|7|8|9|0";
     var tempCompositeList = tempAlphaList&"|"&tempNumList;
     var tempCharsInList = listLen(tempCompositeList,"|");
     var tempCounter = 1;
     var tempWorkingString = "";
     
     //loop from 1 to stringLength to generate string
     while (tempCounter LTE stringLength) {
         tempWorkingString = tempWorkingString&listGetAt(tempCompositeList,randRange(1,tempCharsInList),"|");
         tempCounter = tempCounter + 1;
     }
     
     return tempWorkingString;
 }

oldId: 1025
---

