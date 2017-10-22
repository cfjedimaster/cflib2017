---
layout: udf
title:  listRest2
date:   2007-01-03T13:15:48.000Z
library: StrLib
argString: "orgList[, listDel]"
author: Tom Kitta
authorEmail: tom@tomkitta.com
version: 1
cfVersion: CF5
shortDescription: Same functionality as CF stock listRest but faster, at least on CFMX 7.01
tagBased: false
description: |
 Same functionality as CF listRest but faster, for lists with 4000 elements about 1000 (no kidding, on CFMX 7.01) times faster. Stock listRest will crash your server with large lists when used multiple times, use listRest2 and be on the safe side.

returnValue: returns a string.

example: |
 <cfset huh = ListRest2("1,2,3,4,5")><!--- huh = 2,3,4,5 --->
 <cfset huh = ListRest2("")><!--- huh = empty string --->
 <cfset huh = ListRest2("1")><!--- huh = empty string --->

args:
 - name: orgList
   desc: Original list.
   req: true
 - name: listDel
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Same functionality as CF stock listRest but faster, at least on CFMX 7.01
  * 
  * @param orgList      Original list. (Required)
  * @param listDel      List delimiter. Defaults to a comma. (Optional)
  * @return returns a string. 
  * @author Tom Kitta (tom@tomkitta.com) 
  * @version 1, January 3, 2007 
  */

code: |
 function ListRest2(orgList) {
     var listDel = ',';
     if(arrayLen(arguments) gte 2) listDel = arguments[2];
     if (len(orgList) gt 0) return listDeleteAt(orgList,1,listDel);
     return "";
 }

---

