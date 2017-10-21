---
layout: udf
title:  fullUrlEncode
date:   2015-02-11T14:14:23.769Z
library: StrLib
argString: "str"
author: Umbrae
authorEmail: umbrae@gmail.com
version: 2
cfVersion: CF5
shortDescription: Give the fully escaped URL encoding of a string.
description: |
 This function gives the fully escaped URL encoding of a string.

returnValue: Returns a string.

example: |
 #fullurlencode('blah')#
 <br>
 #URLDecode(fullurlencode('this shows the compatibility with URLDecode and special characters. ^!*(-{}|'))#

args:
 - name: str
   desc: String to encode.
   req: true


javaDoc: |
 /**
  * Give the fully escaped URL encoding of a string.
  * 
  * @param str      String to encode. (Required)
  * @return Returns a string. 
  * @author Umbrae (umbrae@gmail.com) 
  * @version 1, August 2, 2005 
  */

code: |
 function fullurlencode(str) {
     var encstr="";
     var len=len(str);
     var i=1;
     for(i=1; i LTE len; i=i+1) {
         var char = FormatBaseN(Asc(Mid(str,i,1)),16);
         if(len(char) == 1) char = "0" & char;
         encstr = encstr & "%" & char;
     }
     return encstr;
 }

---

