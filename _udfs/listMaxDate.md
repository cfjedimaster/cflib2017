---
layout: udf
title:  listMaxDate
date:   2007-01-17T04:59:58.000Z
library: StrLib
argString: "dtList[, delim]"
author: Ann Terrell
authorEmail: ann@landuseoregon.com
version: 2
cfVersion: CF5
shortDescription: Checks a list of dates for the maximum date.
tagBased: false
description: |
 Checks a list of dates for the maximum date.

returnValue: Returns a date if at least one found, or returns an empty string.

example: |
 ##listMaxDate("1/1/2000,2/4/2003,5/23/1999,4/3/1600,5/6/2004")##: <br>
 #listMaxDate("1/1/2000,2/4/2003,5/23/1999,4/3/1600,5/6/2004")#

args:
 - name: dtList
   desc: List to check.
   req: true
 - name: delim
   desc: List delimeter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Checks a list of dates for the maximum date.
  * v2 by Steven Van Gemert
  * 
  * @param dtList      List to check. (Required)
  * @param delim      List delimeter. Defaults to a comma. (Optional)
  * @return Returns a date if at least one found, or returns an empty string. 
  * @author Ann Terrell (ann@landuseoregon.com) 
  * @version 2, January 16, 2007 
  */

code: |
 function listMaxDate(ThisDateList) {
     var ThisDelimiter = ",";
     var ThisDateListLength = "";
     var ThisMaxDate = "";
     var i = "";
   
     if(ArrayLen(Arguments) GTE 2) ThisDelimiter = Arguments[2];
   
     ThisDateListLength = ListLen(ThisDateList, ThisDelimiter);
     ThisMaxDate = ListFirst(ThisDateList, ThisDelimiter);
   
     for (i=1; i LTE ThisDateListLength; i=i+1){
         if(DateCompare(ThisMaxDate,  ListGetAt(ThisDateList, i, ThisDelimiter)) IS -1) {
             ThisMaxDate = ListGetAt(ThisDateList, i, ThisDelimiter);
         }
     }
   
     return ThisMaxDate;
 }

oldId: 1088
---

