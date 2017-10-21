---
layout: udf
title:  ArrayAppendUnique
date:   2001-10-29T11:42:13.000Z
library: DataManipulationLib
argString: "a1, val"
author: Craig Fisher
authorEmail: craig@altainteractive.com
version: 1
cfVersion: CF5
shortDescription: Appends a value to an array if the value does not already exist within the array.
description: |
 Takes an Array and a Value as it arguments.  Returns an array with the value appended if the value does not already exist within the array.

returnValue: Returns a modified array or an error string.

example: |
 <CFSCRIPT>
 aX=ArrayNew(1);
 aX[1]="a";
 aX[2]="b";
 aX[3]="c";
 aX=ArrayAppendUnique(aX, "b"); //should do nothing
 aX=ArrayAppendUnique(aX, "d"); //insert d at index 4
 </CFSCRIPT> 
 <CFDUMP var="#aX#">

args:
 - name: a1
   desc: The array to modify.
   req: true
 - name: val
   desc: The value to append.
   req: true


javaDoc: |
 /**
  * Appends a value to an array if the value does not already exist within the array.
  * 
  * @param a1      The array to modify. 
  * @param val      The value to append. 
  * @return Returns a modified array or an error string. 
  * @author Craig Fisher (craig@altainteractive.com) 
  * @version 1, October 29, 2001 
  */

code: |
 function ArrayAppendUnique(a1,val) {
     if ((NOT IsArray(a1))) {
         writeoutput("Error in <Code>ArrayAppendUnique()</code>! Correct usage: ArrayAppendUnique(<I>Array</I>, <I>Value</I>) -- Appends <em>Value</em> to the array if <em>Value</em> does not already exist");
         return 0;
     }
     if (NOT ListFind(Arraytolist(a1), val)) {
         arrayAppend(a1, val);
     }
     return a1;
 }

---

