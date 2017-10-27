---
layout: udf
title:  string2List
date:   2005-05-26T15:30:43.000Z
library: StrLib
argString: "s[, delim]"
author: Joshua Miller
authorEmail: joshuamil@gmail.com
version: 1
cfVersion: CF5
shortDescription: Converts a string to a list using the specified delimter (defaults to comma). Returns a list.
tagBased: false
description: |
 Converts a string to a list using the specified delimter (defaults to comma). Returns a list.

returnValue: Returns a string.

example: |
 <cfoutput>
 #string2List("ABCDEFGHIJKLMNOPQRSTUVWXYZ")#
 </cfoutput>

args:
 - name: s
   desc: String to modify.
   req: true
 - name: delim
   desc: Delimiter to use for new list. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Converts a string to a list using the specified delimter (defaults to comma). Returns a list.
  * 
  * @param s      String to modify. (Required)
  * @param delim      Delimiter to use for new list. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Joshua Miller (josh@joshuasmiller.com) 
  * @version 1, May 26, 2005 
  */

code: |
 function string2List(s){
     var i=0;
     var l="";
     var delim=",";
     
     if(arrayLen(arguments) gt 2) delim = arguments[3];
     
     for(i=1;i lte Len(s);i=i+1) l = listAppend(l,mid(s,i,1),delim);
 
     return l;
 }

oldId: 1221
---

