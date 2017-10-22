---
layout: udf
title:  CFChartDateFormat
date:   2002-10-18T16:49:43.000Z
library: DateLib
argString: "date"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Formats a date/time value for use on the y-axis in CFCHART.
tagBased: false
description: |
 Formats a date/time value for use on the y-axis in CFCHART.  CFCHART expects date/time values in epoch seconds, adjusted to UTC offset, and multiplied by 1000.  Very strange, but it works.

returnValue: Returns a numeric value.

example: |
 <CFCHART FORMAT="Flash" LABELFORMAT="Date" SCALEFROM="12/31/1998">
   <CFCHARTSERIES TYPE="Scatter" SERIESLABEL="New Years Eve Party Hosts">
     <CFCHARTDATA ITEM="Zack" VALUE="#cfchartDateFormat("12/31/1972")#">
     <CFCHARTDATA ITEM="Becky" VALUE="#cfchartDateFormat("12/31/1996")#">
     <CFCHARTDATA ITEM="Joe" VALUE="#cfchartDateFormat("12/31/1984")#">
     <CFCHARTDATA ITEM="Lynda" VALUE="#cfchartDateFormat("12/31/2002")#">    
   </CFCHARTSERIES>
 </CFCHART>

args:
 - name: date
   desc: Date/time value you want formatted for CFCHART.
   req: true


javaDoc: |
 /**
  * Formats a date/time value for use on the y-axis in CFCHART.
  * 
  * @param date      Date/time value you want formatted for CFCHART. (Required)
  * @return Returns a numeric value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, October 18, 2002 
  */

code: |
 function cfchartDateFormat() {
   var datetime = 0;
   if (ArrayLen(Arguments) eq 0) {
     datetime = Now();
   }
   else {
     datetime = arguments[1];
   }
   return numberFormat(DateDiff("s", DateConvert("utc2Local", "January 1 1970 00:00"), datetime) * 1000);
 }

---

