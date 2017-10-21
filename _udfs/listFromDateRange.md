---
layout: udf
title:  listFromDateRange
date:   2006-02-13T13:03:36.000Z
library: StrLib
argString: "date1, date2[, thisDelimiter]"
author: Christopher Jordan
authorEmail: cjordan@placs.net
version: 1
cfVersion: CF5
shortDescription: ListFromDateRange returns a list of dates given a starting and ending date.
description: |
 ListFromDateRange can be given a starting and ending date and will return an inclusive list of dates between those two dates. The resulting list will be comma delimited unless a different delimiter is specifically specified as the optional third argument.

returnValue: Returns a list.

example: |
 <cfset thisDate_1 = now()>
 <cfset thisDate_2 = dateAdd("d",5,thisDate_1)>
 <cfoutput>Result from listFromDateRange: #listFromDateRange(thisDate_1,thisDate_2)#<br></cfoutput>
 <cfloop index="i" list="#listFromDateRange(thisDate_1,thisDate_2)#">
     <cfoutput>Date This Itteration: #i#<br></cfoutput>
 </cfloop>

args:
 - name: date1
   desc: First date to use.
   req: true
 - name: date2
   desc: Second date to use.
   req: true
 - name: thisDelimiter
   desc: List delimiter to use for result. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * ListFromDateRange returns a list of dates given a starting and ending date.
  * 
  * @param date1      First date to use. (Required)
  * @param date2      Second date to use. (Required)
  * @param thisDelimiter      List delimiter to use for result. Defaults to a comma. (Optional)
  * @return Returns a list. 
  * @author Christopher Jordan (cjordan@placs.net) 
  * @version 1, February 13, 2006 
  */

code: |
 function listFromDateRange (date1,date2) {
     var i                 = 0;
     var numberOfDays    = 0;
     var thisDate         = "";
     var theList            = "";
     var temp            = "";
     var thisDelimiter    = ",";
 
     if(arraylen(arguments) eq 3) thisDelimiter = trim(arguments[3]);
     
     if (date1 GT date2) {
         temp    = date1;
         date1    = date2;
         date2    = temp;
     }
 
     numberOfDays = dateDiff("d",date1,date2);
     
     for(i = 0; i lte NumberOfDays; i = i + 1){
         thisDate = dateAdd("d",i,date1);
         theList = listAppend(theList,thisDate,thisDelimiter);
     }
     
     return theList;
 }

---

