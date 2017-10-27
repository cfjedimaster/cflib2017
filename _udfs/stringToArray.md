---
layout: udf
title:  stringToArray
date:   2003-06-12T20:18:46.000Z
library: StrLib
argString: "string, count"
author: Aidan Whitehall
authorEmail: aidan@thenetprofits.co.uk
version: 1
cfVersion: CF5
shortDescription: Turns a string to an array of 'count' character chunks.
tagBased: false
description: |
 Accepts a string and a numeric value, chops the string into x character lengths and returns them in an array.

returnValue: Returns an array.

example: |
 <cfscript>
 // Output a continuous CC number with dashes.
 myCC = stringToArray("1234123412341234", 4);
 
 for (i = 1; i lte arrayLen(myCC); i = i + 1) {
    writeOutput(myCC[i] & iif(i eq arrayLen(myCC), de(""), de("-"))); }
 
 </cfscript>

args:
 - name: string
   desc: String to parse.
   req: true
 - name: count
   desc: Number of characters per array index.
   req: true


javaDoc: |
 /**
  * Turns a string to an array of 'count' character chunks.
  * 
  * @param string      String to parse. (Required)
  * @param count      Number of characters per array index. (Required)
  * @return Returns an array. 
  * @author Aidan Whitehall (aidan@thenetprofits.co.uk) 
  * @version 1, June 12, 2003 
  */

code: |
 function stringToArray(string, count) {
    var array = arrayNew(1);
    
    while (len(string)) {
       arrayAppend(array, left(string, min(count, len(string))));
       
       if ((len(string) / count) gt 1) string = right(string, len(string) - count);
       else string = "";
    }
 
    return array;
 }

oldId: 943
---

