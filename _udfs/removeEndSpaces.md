---
layout: udf
title:  removeEndSpaces
date:   2010-03-07T05:48:46.000Z
library: StrLib
argString: "str"
author: Nick Giovanni
authorEmail: ngiovanni@gmail.com
version: 2
cfVersion: CF5
shortDescription: strips all graph characters (spaces, tabs, line breaks) off the end of a string.
description: |
 strips all graph characters (spaces, tabs, line breaks) off the end of a string.

returnValue: Returns a string.

example: |
 #removeEndSpaces("My text string. #chr(9)# #chr(9)# #chr(13)##chr(10)# #chr(13)##chr(10)#")#

args:
 - name: str
   desc: String to parse.
   req: true


javaDoc: |
 /**
  * strips all graph characters (spaces, tabs, line breaks) off the end of a string.
  * Version 2 by Raymond Camden
  * 
  * @param str      String to parse. (Required)
  * @return Returns a string. 
  * @author Nick Giovanni (ngiovanni@gmail.com) 
  * @version 2, March 6, 2010 
  */

code: |
 function removeEndSpaces(str) {
     return reReplace(str,"\s*$","","all");
  }

---

