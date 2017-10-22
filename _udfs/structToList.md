---
layout: udf
title:  structToList
date:   2006-07-25T16:33:25.000Z
library: DataManipulationLib
argString: "s[, delim]"
author: Greg Nettles
authorEmail: gregnettles@calvarychapel.com
version: 2
cfVersion: CF5
shortDescription: Converts struct into delimited key/value list.
tagBased: false
description: |
 Converts a struct into a delimed key/value list. Defult delimiter is &quot;&amp;&quot; but any character can be used by passing it as a second argument.

returnValue: Returns a string.

example: |
 <!--- Create Struct --->
 <cfset user=structNew()>
 <cfset user.firstname="John">
 <cfset user.lastname="Smith">
 <cfset user.age=35>
 <cfdump var="#user#" label="user">
 
 <!--- Call Function --->
 <br>
 Using defult delimiter:
 <br>
 <cfset myList = structToList(user)>
 <cfdump var="#myList#">
 <br><br>
 Using custom delimiter:
 <br>
 <cfset myList2 = structToList(user,"@")>
 <cfdump var="#myList2#">

args:
 - name: s
   desc: Structure.
   req: true
 - name: delim
   desc: List delimeter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Converts struct into delimited key/value list.
  * 
  * @param s      Structure. (Required)
  * @param delim      List delimeter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Greg Nettles (gregnettles@calvarychapel.com) 
  * @version 2, July 25, 2006 
  */

code: |
 function structToList(s) {
     var delim = "&";
     var i = 0;
     var newArray = structKeyArray(arguments.s);
 
     if (arrayLen(arguments) gt 1) delim = arguments[2];
 
     for(i=1;i lte structCount(arguments.s);i=i+1) newArray[i] = newArray[i] & "=" & arguments.s[newArray[i]];
 
     return arraytoList(newArray,delim);
 }

---

