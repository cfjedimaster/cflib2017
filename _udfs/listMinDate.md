---
layout: udf
title:  listMinDate
date:   2007-01-17T05:12:19.000Z
library: StrLib
argString: "dtList[, delim]"
author: Ann Terrell
authorEmail: ann@landuseoregon.com
version: 2
cfVersion: CF5
shortDescription: Checks a list of dates for the minimum date.
tagBased: false
description: |
 Checks a list of dates for the minimum date.

returnValue: Returns a date.

example: |
 <cfoutput>
 ##listMinDate("1/1/2000,2/4/2003,5/23/1999,4/3/1600,5/6/2004")##: <br>
 #listMinDate("1/1/2000,2/4/2003,5/23/1999,4/3/1600,5/6/2004")#
 </cfoutput>

args:
 - name: dtList
   desc: List to search.
   req: true
 - name: delim
   desc: Delimiter to use. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Checks a list of dates for the minimum date.
  * v2 by Steven Van Gemert
  * 
  * @param dtList      List to search. (Required)
  * @param delim      Delimiter to use. Defaults to a comma. (Optional)
  * @return Returns a date. 
  * @author Ann Terrell (ann@landuseoregon.com) 
  * @version 2, January 16, 2007 
  */

code: |
 function listMinDate(ThisDateList) {
     var ThisDelimiter = ",";
     var ThisDateListLength = "";
     var ThisMinDate = "";
     var i = "";
   
     if(arrayLen(arguments) GTE 2) ThisDelimiter = Arguments[2];
 
     ThisDateListLength = ListLen(ThisDateList, ThisDelimiter);
     ThisMinDate = ListFirst(ThisDateList, ThisDelimiter);
   
     for (i=1; i LTE ThisDateListLength; i=i+1){
          if(DateCompare(ListGetAt(ThisDateList, i, ThisDelimiter), ThisMinDate) IS -1) {
             ThisMinDate = ListGetAt(ThisDateList, i, ThisDelimiter);
            }
       }
   
     return ThisMinDate;
 }

oldId: 1089
---

