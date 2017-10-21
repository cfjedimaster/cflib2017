---
layout: udf
title:  findAll
date:   2008-07-29T22:59:11.000Z
library: StrLib
argString: "substring, string[, start]"
author: Jeremy Rottman
authorEmail: rottmanj@hsmove.com
version: 2
cfVersion: CF5
shortDescription: Finds all occurrences of a substring in a string.
description: |
 Finds all occurrences of a substring in a string, from a specified start position. The search is case-sensitive. Returns an array of each starting position.

returnValue: Returns an array.

example: |
 <cfset mySTR = "123445566445566123445566123">
 <cfset thisSTR = findAll("4455",mySTR)>
 <cfdump var="#thisSTR#"/>

args:
 - name: substring
   desc: String to search for.
   req: true
 - name: string
   desc: String to parse.
   req: true
 - name: start
   desc: Starting position. Defaults to 1.
   req: false


javaDoc: |
 /**
  * Finds all occurrences of a substring in a string.
  * Fix by RCamden to make start optional.
  * 
  * @param substring      String to search for. (Required)
  * @param string      String to parse. (Required)
  * @param start      Starting position. Defaults to 1. (Optional)
  * @return Returns an array. 
  * @author Jeremy Rottman (rottmanj@hsmove.com) 
  * @version 2, July 29, 2008 
  */

code: |
 function findALL(substring,string) {
     var findArray = arrayNew(1);    
     var start = 1;    
     var posStart = "";
     var i = 1;
     var newPos = "";
     
     if(arrayLen(arguments) gte 3) start = arguments[3];
 
     posStart = find(substring,string,start);
     
     if(posStart GT 0){
         findArray[i] = posStart;
         while(posStart gt 0 ){
             posStart = posStart + 1;
             newPos = find(substring,string,posStart);
             if(newPos gt 0){
                 i = i + 1;
                 findArray[i] = newPos;
                 posStart = newPos;
             }else{
                 posStart = 0;
             }
         }
     }else{
         return 0;
     }
     return findArray;
 }

---

