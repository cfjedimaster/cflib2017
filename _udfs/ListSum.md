---
layout: udf
title:  ListSum
date:   2001-09-10T12:40:51.000Z
library: MathLib
argString: "listStr[, delim]"
author: Douglas Williams
authorEmail: klenzade@i-55.com
version: 1
cfVersion: CF5
shortDescription: Adds all the numbers in a delimited list returning the sum of the list.
tagBased: false
description: |
 Adds all the numbers in a delimited list returning the sum of the list.

returnValue: Returns a numeric value.

example: |
 <cfset mylist = "5,5,5">
 
 <cfoutput>
 The sum of my list is #listSum(mylist)#
 </cfoutput>

args:
 - name: listStr
   desc: Delimited list of numeric values you want to sum.
   req: true
 - name: delim
   desc: Optional delimiter for the list.  The default is the comma.
   req: false


javaDoc: |
 /**
  * Adds all the numbers in a delimited list returning the sum of the list.
  * 
  * @param listStr      Delimited list of numeric values you want to sum. 
  * @param delim      Optional delimiter for the list.  The default is the comma. 
  * @return Returns a numeric value. 
  * @author Douglas Williams (klenzade@i-55.com) 
  * @version 1.0, September 10, 2001 
  */

code: |
 function listSum(listStr)
 {
   var delim = ",";
   if(ArrayLen(Arguments) GTE 2) 
     delim = Arguments[2];
   return ArraySum(ListToArray(listStr, delim));
 }

oldId: 240
---

