---
layout: udf
title:  getCurrentFinYear
date:   2003-05-26T10:07:21.000Z
library: DateLib
argString: "mask[, date]"
author: Toby Tremayne
authorEmail: toby@lyricist.com.au
version: 1
cfVersion: CF5
shortDescription: Returns the current two-part financial year in a specified format.
tagBased: false
description: |
 Calculates the current financial year and passes it back in the format specified.  Pass a format mask to this function using &quot;y1&quot; to denote the first half year and &quot;y2&quot; for the second.  For instance to request the financial year returned in the format: &quot;2002/2003&quot; use: getCurrentFinYear(&quot;y1/y2&quot;);

returnValue: Returns a string.

example: |
 <cfoutput>
 #getCurrentFinYear("y1/y2")#
 </cfoutput>

args:
 - name: mask
   desc: Formats result using y1 and y2.
   req: true
 - name: date
   desc: Date to use. Defaults to now().
   req: false


javaDoc: |
 /**
  * Returns the current two-part financial year in a specified format.
  * 
  * @param mask      Formats result using y1 and y2. (Required)
  * @param date      Date to use. Defaults to now(). (Optional)
  * @return Returns a string. 
  * @author Toby Tremayne (toby@lyricist.com.au) 
  * @version 1, May 26, 2003 
  */

code: |
 function getCurrentFinYear(mask) {
      var finYear = "";
     var partOne = "";
     var partTwo = "";
     var date = now();
 
     if(arrayLen(arguments) gte 2) date = arguments[2];
     
     // if the current month falls in the first 6 months of the year...
     if (month(date) lte 6) {
         // first part is last year
         partOne = year(dateAdd("yyyy", -1, date));
         // second part is this year
         partTwo = year(date);
     } else {
         // first part is this year
         partOne = year(date);
         // second part is next year
         partTwo = year( dateAdd("yyyy", 1, date) );
     }
     // replace mask tokens for return
     finYear = replaceNoCase(mask,"y1",partOne);
     finYear = replaceNoCase(finYear,"y2",partTwo);
     
     return finYear;
 }

---

