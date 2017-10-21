---
layout: udf
title:  DateRangeFormat
date:   2004-06-08T19:45:45.000Z
library: DateLib
argString: "[startDate][, endDate][, format]"
author: Bryan Buchs
authorEmail: bbuchs@mac.com
version: 1
cfVersion: CF6
shortDescription: Format a range of dates (&quot;August 3 - 11, 2003&quot;).
description: |
 DateRangeFormat() accepts three arguments: a start date, an end date, and the format mask to be used. Returns a string with redundant date formatting removed (&quot;August 3 - 11, 2003&quot;, &quot;December 23 - August 11, 2003&quot;).

returnValue: Returns a string.

example: |
 <cfoutput>
 <!--- same date --->
 #DateRangeFormat(CreateDate(2003,8,3),CreateDate(2003,8,3),'long')#<br>
 <!--- same month --->
 #DateRangeFormat(CreateDate(2003,8,3),CreateDate(2003,8,11),'long')#<br>
 <!--- same year --->
 #DateRangeFormat(CreateDate(2003,6,3),CreateDate(2003,8,11),'long')#<br>
 <!--- all different  --->
 #DateRangeFormat(CreateDate(2002,6,3),CreateDate(2003,8,11),'long')#<br>
 
 <!--- same date --->
 #DateRangeFormat(CreateDate(2003,8,3),CreateDate(2003,8,3),'short')#<br>
 <!--- same month --->
 #DateRangeFormat(CreateDate(2003,8,3),CreateDate(2003,8,11),'short')#<br>
 <!--- same year --->
 #DateRangeFormat(CreateDate(2003,6,3),CreateDate(2003,8,11),'short')#<br>
 <!--- all different  --->
 #DateRangeFormat(CreateDate(2002,6,3),CreateDate(2003,8,11),'short')#<br>
 </cfoutput>

args:
 - name: startDate
   desc: Initial date. Defaults to now.
   req: false
 - name: endDate
   desc: Ending date. Defaults to now.
   req: false
 - name: format
   desc: Either "long" or "short". Defaults to long.
   req: false


javaDoc: |
 /**
  * Format a range of dates (&quot;August 3 - 11, 2003&quot;).
  * Small bug in last statement was losing end date. RKC
  * 
  * @param startDate      Initial date. Defaults to now. (Optional)
  * @param endDate      Ending date. Defaults to now. (Optional)
  * @param format      Either "long" or "short". Defaults to long. (Optional)
  * @return Returns a string. 
  * @author Bryan Buchs (bbuchs@mac.com) 
  * @version 1, June 8, 2004 
  */

code: |
 function DateRangeFormat() {
     var format = "long";
     var longformat = "mmmm d, yyyy";
     var shortformat = "m/d/yy";
     var applyformat = longformat;
     var startDate = now();
     var endDate = now();
     var startFormat = DateFormat(startDate,format);
     var endFormat = DateFormat(endDate,format);
     var DateRangeFormat = startFormat;
     
     if (arrayLen(arguments) GTE 1) { startDate = arguments[1]; }
     if (arrayLen(arguments) GTE 2) { endDate = arguments[2]; }
     if (arrayLen(arguments) GTE 3) { format = arguments[3]; }
     
     if(format is not "long" and format is not "short") format = "long";
     if(format is not "long") applyformat = shortformat;
     
     //case one, same month and year
     if(year(startDate) is year(endDate) and month(startDate) is month(endDate)) {
         startFormat = dateFormat(startDate,ReplaceNoCase(applyformat,"y","","All"));
         if(format is "long") {
             endFormat = dateFormat(endDate,ReplaceNoCase(applyformat,"m","","All"));
         } else {
             endFormat = dateFormat(endDate,applyformat);
         }
     } else if(year(startDate) is year(endDate)) {
     //case two, same year
         startFormat = DateFormat(startDate,ReplaceNoCase(applyformat,"y","","All"));
         endFormat = DateFormat(endDate,applyformat);
     } else {
     //case three, different year and month, dont change anything
         startFormat = DateFormat(startDate,applyformat);
         endFormat = DateFormat(endDate,applyformat);
     }
 
     if (right(trim(startFormat),1) EQ "," or right(trim(startFormat),1) EQ "/") { 
         startFormat = trim(RemoveChars(startFormat,len(trim(startFormat)), 1)); 
     }
 
     if (arrayLen(arguments) GTE 2 AND startDate NEQ endDate) {
         DateRangeFormat = startFormat & " - " & endFormat;
     } else {
         DateRangeFormat = dateFormat(startDate,applyformat);
     }
     
     return trim(DateRangeFormat);
 }

---

