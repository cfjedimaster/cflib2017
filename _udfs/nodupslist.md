---
layout: udf
title:  nodupslist
date:   2010-05-30T22:06:12.000Z
library: StrLib
argString: "str[, delim]"
author: Tony Bentley
authorEmail: tony@tonybentley.com
version: 1
cfVersion: CF6
shortDescription: Remove duplicate values from a list.
description: |
 Removes all duplicate values from a list. The function is case sensitive so A,a,a will return A,a.

returnValue: Returns a string.

example: |
 <cfoutput>#nodupslist("a|a|a|a|b|b|B|","|")#</cfoutput>
 
 returns b|B|a

args:
 - name: str
   desc: List to parse.
   req: true
 - name: delim
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Remove duplicate values from a list.
  * 
  * @param str      List to parse. (Required)
  * @param delim      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Tony Bentley (tony@tonybentley.com) 
  * @version 1, May 30, 2010 
  */

code: |
 function nodupslist(str){
     var delim = ",";
     if(arrayLen(arguments) is 2) delim = arguments[2];
     return arrayToList(createObject("java","java.util.HashSet").init(ListToArray(str,delim)).ToArray(),delim);
 }

---

