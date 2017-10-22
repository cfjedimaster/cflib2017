---
layout: udf
title:  ListRestRight
date:   2009-12-07T03:48:24.000Z
library: StrLib
argString: "orgList[, listDel]"
author: Antoine Gattolliat
authorEmail: antoine@igloo.be
version: 1
cfVersion: 
shortDescription: Same functionality as CF ListRest starting from right instead of left.
tagBased: false
description: |
 Same functionality as CF ListRest starting from right instead of left.
 Based on Tom Kitta's ListRest2 that works faster than CF ListRest.

returnValue: Returns a string.

example: |
 <cfset foo = ListRestRight("1,2,3,4,5")><!--- foo = 1,2,3,4 --->
 <cfset foo = ListRestRight("")><!--- foo = empty string --->
 <cfset foo = ListRestRight("1")><!--- foo = empty string --->

args:
 - name: orgList
   desc: Original list.
   req: true
 - name: listDel
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Same functionality as CF ListRest starting from right instead of left.
  * 
  * @param orgList      Original list. (Required)
  * @param listDel      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Antoine Gattolliat (antoine@igloo.be) 
  * @version 1, December 6, 2009 
  */

code: |
 function ListRestRight(orgList) {
     var listDel = ',';
     if(arrayLen(arguments) gte 2) listDel = arguments[2];
     if (len(orgList) gt 0) return listDeleteAt(orgList,ListLen(orgList,listDel),listDel);
     return "";
 }

---

