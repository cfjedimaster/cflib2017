---
layout: udf
title:  listTrim
date:   2006-05-08T11:43:01.000Z
library: StrLib
argString: "ThisList[, ThisDelimiter]"
author: Christopher Jordan
authorEmail: cjordan@placs.net
version: 1
cfVersion: CF5
shortDescription: Returns the list which was passed in after having trimmed each list item.
tagBased: false
description: |
 ListTrim accepts a list and an optional delimiter value (defaults to comma if not passed), and then returns the same list of trimmed values.

returnValue: Returns a string.

example: |
 <cfset origList = "ray, jacob, lynn, noah, luke, anakin, walt, 4, 8, 15, 16, 23, 42">
 <cfoutput>#listTrim(origList)#</cfoutput>

args:
 - name: ThisList
   desc: List to trim.
   req: true
 - name: ThisDelimiter
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Returns the list which was passed in after having trimmed each list item.
  * 
  * @param ThisList      List to trim. (Required)
  * @param ThisDelimiter      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Christopher Jordan (cjordan@placs.net) 
  * @version 1, May 8, 2006 
  */

code: |
 function listTrim(ThisList) {
     var i = 0;
     var ThisDelimiter = ",";
     var ThisListItem = "";
     var ThisTrimmedList = "";
         
     // check for passed delimiter
     if(ArrayLen(Arguments) EQ 2){
         ThisDelimiter = Arguments[2];
     }
     for(i = 1; i LTE ListLen(ThisList,ThisDelimiter); i = i + 1){
         ThisListItem    = Trim(ListGetAt(ThisList,i,ThisDelimiter));
         ThisTrimmedList = ListAppend(ThisTrimmedList,ThisListItem,ThisDelimiter);
     }
     return ThisTrimmedList;
 }

oldId: 1430
---

