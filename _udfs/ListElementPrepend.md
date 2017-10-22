---
layout: udf
title:  ListElementPrepend
date:   2004-09-21T19:20:07.000Z
library: StrLib
argString: "list, string[, delim]"
author: SHUM Ting-hin
authorEmail: gene_shum@iclp.com.hk
version: 2
cfVersion: CF5
shortDescription: Prepends a string to every item in a list.
tagBased: false
description: |
 Prepends a string to every item in a list.

returnValue: Returns a list.

example: |
 <cfset list = "a,b,c">
 <cfoutput>#listElementPrepend(list,"foo")#</cfoutput>

args:
 - name: list
   desc: List to modify.
   req: true
 - name: string
   desc: String to prepend.
   req: true
 - name: delim
   desc: Delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Prepends a string to every item in a list.
  * Version 2 by Raymond Camden
  * 
  * @param list      List to modify. (Required)
  * @param string      String to prepend. (Required)
  * @param delim      Delimiter. Defaults to a comma. (Optional)
  * @return Returns a list. 
  * @author SHUM Ting-hin (gene_shum@iclp.com.hk) 
  * @version 2, September 21, 2004 
  */

code: |
 function listElementPrepend(list,string) {
     var delim = ",";
     var i = "";
     
     if(arrayLen(arguments) gte 3) delim = arguments[3];
     
     for(i=1; i lte listLen(list); i=i+1) {
         list = listSetAt(list, i, string & listGetAt(list,i));
     }
     
     return list;
 }

---

