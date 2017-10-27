---
layout: udf
title:  FindOccurrences
date:   2002-03-20T13:14:22.000Z
library: StrLib
argString: "tString, tsubString"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 3
cfVersion: CF5
shortDescription: Returns the number of times a pattern exists within a string.
tagBased: false
description: |
 Returns the number of times a pattern exists within a string.

returnValue: Returns the number of occurrences.

example: |
 <CFSET TestString = "this is a test of this function">
 <CFOUTPUT>"is" occurs #FindOccurrences(TestString,"is")# times in TestString</CFOUTPUT>

args:
 - name: tString
   desc: The string to check.
   req: true
 - name: tsubString
   desc: The string to look for.
   req: true


javaDoc: |
 /**
  * Returns the number of times a pattern exists within a string.
  * Modified by Raymond Camden
  * Rewritten based on original UDF by Cory Aiken (corya@fusedsolutions.com)
  * 
  * @param tString      The string to check. 
  * @param tsubString      The string to look for. 
  * @return Returns the number of occurrences. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 3, March 20, 2002 
  */

code: |
 function FindOccurrences(tString,tsubString){
     if(not len(tString) OR not len(tsubString)) return 0;
     else {
         // delete all occurences of tString
         // and then calculate the number of occurences by comparing string sizes
         return ((len(tString) - len(replaceNoCase(tString, tsubString, "", "ALL"))) / len(tsubString));
     }
 }

oldId: 137
---

