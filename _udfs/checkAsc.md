---
layout: udf
title:  checkAsc
date:   2004-09-23T13:28:40.000Z
library: StrLib
argString: "str[, denylist]"
author: Tjarko Rikkerink
authorEmail: tjarko@ditadres.com
version: 1
cfVersion: CF5
shortDescription: Only allow ASCII text string.
tagBased: false
description: |
 Only allow the ASCII text characters (33 to 126) for a certain string, you can also give a list of character numbers for the characters you also want to deny in the string.

returnValue: Returns a boolean.

example: |
 <cfset str = "ci.rcle">
 <cfset denylist = "44,46,59,64,124">
 <cfoutput>
     #CheckAsc(str,denylist)#
 </cfoutput>

args:
 - name: str
   desc: String to check.
   req: true
 - name: denylist
   desc: Additional list of codes to deny.
   req: false


javaDoc: |
 /**
  * Only allow ASCII text string.
  * 
  * @param str      String to check. (Required)
  * @param denylist      Additional list of codes to deny. (Optional)
  * @return Returns a boolean. 
  * @author Tjarko Rikkerink (tjarko@ditadres.com) 
  * @version 1, September 23, 2004 
  */

code: |
 function checkAsc(str){ 
     var i = 1;
     var nr = "";
     var denylist = "";
         
     if(arrayLen(arguments) gte 2) denylist = arguments[2];
     while (i LTE len(str)) { 
         nr = asc(mid(str,i,1)); 
         if (nr LT 33 OR nr GT 126 OR listFind(denylist,nr)){
             return false;
         } 
         i = i + 1; 
     } 
 
     return true; 
 }

---

