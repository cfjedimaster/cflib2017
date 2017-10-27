---
layout: udf
title:  splitList
date:   2006-08-01T14:40:45.000Z
library: StrLib
argString: "orgList[, listDel]"
author: Tom Kitta
authorEmail: tom@tomkitta.com
version: 2
cfVersion: CF5
shortDescription: Split list into two lists of about equal length.
tagBased: false
description: |
 Splits list into two lists of about equal list length. Returns a structure with two new lists. Only about half of the original list is looked at in order
 to increase UDF's speed.

returnValue: Returns a sturct.

example: |
 <cfdump var="#splitList("")#"><!--- Returns two empty strings --->
 <cfdump var="#splitList("1")#"><!--- Returns 1 and empty string --->
 <cfdump var="#splitList("1,2,3")#"><!--- Returns 1,2, and 3 --->
 <cfdump var="#splitList("1,,2,,,3,4,123")#"><!--- Returns 1,,2,,,3, (valid list with 3 elements) and 4,123 --->
 
 <cfdump var="#splitList("1@2@3@4", "@")#">

args:
 - name: orgList
   desc: Original list.
   req: true
 - name: listDel
   desc: List delimeter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Split list into two lists of about equal length.
  * RCamden added variable delim and clean up of trailing delim
  * 
  * @param orgList      Original list. (Required)
  * @param listDel      List delimeter. Defaults to a comma. (Optional)
  * @return Returns a sturct. 
  * @author Tom Kitta (tom@tomkitta.com) 
  * @version 2, August 1, 2006 
  */

code: |
 function splitList(orgList) {
     var ret = structNew();
     var listDel = ",";
     var i = 0;
     var listLen = "";
     var midPoint = "";
     
     if(arrayLen(arguments) gte 2) listDel = arguments[2];
     
     listLength = listLen(orgList,listDel);
     midPoint = round(listLength/2);
 
     ret.part1 = "";
     ret.part2 = orgList;
 
     for (i=1;i lte midPoint;i=i+1) ret.part2 = ListDeleteAt(ret.part2,1, listDel);
     if (listLength gt 0) ret.part1 = left(arguments.orgList,len(arguments.orgList) - Len(ret.part2));
     
     if(right(ret.part1,1) is listDel) ret.part1 = left(ret.part1, len(ret.part1)-1);
     return ret;
 }

oldId: 1502
---

