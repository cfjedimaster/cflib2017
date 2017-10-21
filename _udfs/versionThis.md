---
layout: udf
title:  versionThis
date:   2003-06-12T19:03:16.000Z
library: UtilityLib
argString: "version"
author: Byron Bignell
authorEmail: byronj@bignell.com
version: 2
cfVersion: CF5
shortDescription: Increments the values of a 3 place version number.
description: |
 This UDF increments a standard 3 place (0.0.0) version number from left to right in ascending order.

returnValue: Returns a string.

example: |
 <cfoutput>
 #versionThis('1.9.9')# 
 </cfoutput>

args:
 - name: version
   desc: String in the form of a version number, as in x.x.x.
   req: true


javaDoc: |
 /**
  * Increments the values of a 3 place version number.
  * Version 2 by Raymond Camden
  * 
  * @param version      String in the form of a version number, as in x.x.x. (Required)
  * @return Returns a string. 
  * @author Byron Bignell (byronj@bignell.com) 
  * @version 2, June 12, 2003 
  */

code: |
 function versionThis(str){
     str = replace(str,".","","all") + 1;
     str = left(str,len(str) - 2) & "." & mid(str,len(str)-1,1) & "." & right(str,1);
     return str;
 }

---

