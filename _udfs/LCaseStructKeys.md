---
layout: udf
title:  LCaseStructKeys
date:   2012-08-26T16:47:15.000Z
library: UtilityLib
argString: "str"
author: Steve 'Cutter' Blades
authorEmail: no.junk@cutterscrossing.com
version: 1
cfVersion: CF5
shortDescription: Lower Case Structure Keys
description: |
 This method will take a structure and lower case all the keys, including those of inner structures. Handy when creating objects for JSON serialization.

returnValue: Returns a struct with its keys lower-cased

example: |
 REQUEST.tmp = {
     "ATEST" = "first test val",
     "anotherTest" = "second test val",
     "WeKeepTesting" = {
         "firstInnerStructKey" = "third test",
         "secondInnerSTRUCTKEY" = {
             "ANOTHERKEY" = "Fourth test Val"
         }
     }
 };
 WriteOutput(SerializeJSON(LCaseStructKeys(REQUEST.tmp)));

args:
 - name: str
   desc: Struct to lower-case the keys of
   req: true


javaDoc: |
 /**
  * Lower Case Structure Keys
  * version 1.0 by Steve 'Cutter' Blades
  * 
  * @param str      Struct to lower-case the keys of (Required)
  * @return Returns a struct with its keys lower-cased 
  * @author Steve 'Cutter' Blades (no.junk@cutterscrossing.com) 
  * @version 1, August 26, 2012 
  */

code: |
 function LCaseStructKeys(str){
     var i = "";
     var tmp = {};
     for(i in str){
         if(isStruct(str[i])){
             str[i] = LCaseStructKeys(str[i]);
         }
         tmp[LCase(i)] = duplicate(str[i]);
     }
     return tmp;
 }

---

