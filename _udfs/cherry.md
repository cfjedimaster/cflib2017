---
layout: udf
title:  Cherry
date:   2017-09-19 16:26:53 -0500
library: MathLib
argString: x,y
author: Raymond Camden
authorEmail: raymondcamden@gmail.com
version: 1.1
cfVersion: CF11
shortDescription: I make Cherries
description: |
 This returns the first blah of the blah that akes a blah to do blah.

returnValue: Returns a string.

example: |
 <cfscript>
 x = 1;
 abort("Foo");
 </cfscript>

args:
 - name: foo
   desc: fooball
   req: true
 - name: goo
   desc: Goo
   req: false

javaDoc: |
 /*
  Capitalizes the first letter in each word.
  Made udf use strlen, rkc 3/12/02
  v2 by Sean Corfield.
  v3 by Chris Jordan
 
  @param string 	 String to be modified. (Required)
  @return Returns a string. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 3, March 9, 2007 
 */

code: |
 function date2ExcelDate(dateString) {
   var rtrnString = '';
   if(isDate(dateString)) {
     return dateDiff("d", createDate( 1899,12,30 ), dateString);
   };

   return rtrnString;
 };

---
