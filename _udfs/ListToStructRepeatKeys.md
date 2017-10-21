---
layout: udf
title:  ListToStructRepeatKeys
date:   2005-08-03T15:06:40.000Z
library: DataManipulationLib
argString: "list[, delimiter]"
author: Tony Brandner
authorEmail: tony@brandners.com
version: 2
cfVersion: CF5
shortDescription: Based on ListToStruct() from Rob Brooks-Bilson, this one allows the structure key to be repeated and the value added to a list.
description: |
 Based on ListToStruct() from Rob Brooks-Bilson, this one allows the structure key to be repeated. In the case of multiple values for a particular key, a comma-delimited list is created. Useful for parsing strings such as LDAP DNs, which may contain multiple values for a single key.

returnValue: Returns a struct.

example: |
 <cfset tempIn = "a=1;b=2;b=3;c=4">
 <cfdump var="#ListToStructRepeatKeys(tempIn,";")#">

args:
 - name: list
   desc: List of key and value pairs.
   req: true
 - name: delimiter
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Based on ListToStruct() from Rob Brooks-Bilson, this one allows the structure key to be repeated and the value added to a list.
  * Version 2 - Ray modified the code a bit and fixed a missing var.
  * 
  * @param list      List of key and value pairs. (Required)
  * @param delimiter      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a struct. 
  * @author Tony Brandner (tony@brandners.com) 
  * @version 2, August 3, 2005 
  */

code: |
 function listToStructRepeatKeys(list){
   var myStruct=StructNew();
   var i=0;
   var delimiter=",";
   var tempVar="";
 
   if(arrayLen(arguments) gt 1) delimiter = arguments[2];
 
   for(i=listLen(list, delimiter); i gt 0; i=i-1) {
       tempVar = trim(listGetAt(list, i, delimiter));
       if (structKeyExists(myStruct,listFirst(tempVar, "="))) {
         myStruct[listFirst(tempVar, "=")] = listAppend(myStruct[listFirst(tempVar, "=")],listLast(tempVar, "="));
     } else {
         myStruct[listFirst(tempVar, "=")] = listLast(tempVar, "=");
     }
   }
   return myStruct;
 }

---

