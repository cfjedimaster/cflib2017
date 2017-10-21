---
layout: udf
title:  listMin
date:   2006-01-20T22:54:57.000Z
library: StrLib
argString: "list[, delim]"
author: Steven Van Gemert
authorEmail: svg@placs.net
version: 1
cfVersion: CF5
shortDescription: ListMin returns the smallest value in a list.
description: |
 ListMin returns the smallest value in a list.

returnValue: Returns a number.

example: |
 <cfoutput>
 #istMin("1,2,3,4")#
 </cfoutput>

args:
 - name: list
   desc: The list to check.
   req: true
 - name: delim
   desc: List delimeter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * ListMin returns the smallest value in a list.
  * 
  * @param list      The list to check. (Required)
  * @param delim      List delimeter. Defaults to a comma. (Optional)
  * @return Returns a number. 
  * @author Steven Van Gemert (svg@placs.net) 
  * @version 1, January 20, 2006 
  */

code: |
 function listMin(list){
     var delim = ",";
     if(arrayLen(arguments) gte 2) delim = arguments[2];
     return arrayMin(listToArray(list,delim));
 }

---

