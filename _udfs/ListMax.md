---
layout: udf
title:  ListMax
date:   2002-12-23T21:01:53.000Z
library: StrLib
argString: "list"
author: Joshua Miller
authorEmail: joshuamil@gmail.com
version: 1
cfVersion: CF5
shortDescription: ListMax returns the greatest value in a list.
description: |
 ListMax returns the greatest value in a listt.

returnValue: Returns a number.

example: |
 <cfoutput>#ListMax("10,11,98,103,2,4,8,178,902,1904")#</cfoutput>

args:
 - name: list
   desc: List to use.
   req: true


javaDoc: |
 /**
  * ListMax returns the greatest value in a list.
  * 
  * @param list      List to use. (Required)
  * @return Returns a number. 
  * @author Joshua Miller (josh@joshuasmiller.com) 
  * @version 1, December 23, 2002 
  */

code: |
 function ListMax(list){
     var delim = ",";
     if(arrayLen(arguments) gte 2) delim = arguments[2];
     return arrayMax(listToArray(list,delim));
 }

---

