---
layout: udf
title:  ISOYear
date:   2005-08-04T21:18:51.000Z
library: DateLib
argString: "inputDate"
author: Pete Gibb
authorEmail: peter.gibb@icaew.co.uk
version: 1
cfVersion: CF5
shortDescription: Returns the ISO correct year of a given date, necessary for dates from 29th Dec to 3rd Jan.
tagBased: false
description: |
 As ISOWeek is to Week(), ISOYear returns the ISOYear of the date input. For 360 days a year, this will be the same as
 Year(), but from the 29th Dec to 3rd Jan, is may be different.  Dates in this range may be part of a week number of a year that differs to the actual year of the date.

returnValue: Returns a string.

example: |
 <cfloop index="x" from="1" to="8">
     <cfset testDate = dateAdd("d",x,"28/Dec/2005")>
     <cfoutput>
         Date: #dateFormat(testDate,"dddd dd/mmm/yyyy")# CF:#year(testDate)# ISO:#ISOYear(testDate)#<br>
     </cfoutput>
 </cfloop>

args:
 - name: inputDate
   desc: The date to format.
   req: true


javaDoc: |
 /**
  * Returns the ISO correct year of a given date, necessary for dates from 29th Dec to 3rd Jan.
  * 
  * @param inputDate      The date to format. (Required)
  * @return Returns a string. 
  * @author Pete Gibb (peter.gibb@icaew.co.uk) 
  * @version 1, August 4, 2005 
  */

code: |
 function ISOYear(inputDate) {
     var inputDay = dayOfWeek(inputDate);
     var yearNo = year(inputDate);
     
     /** If the inputdate IS 29th-31st December, the input year MAY need to be next year **/
     if((dateFormat(inputDate,"ddmm") is "2912" and dayOfWeek(inputDate) eq 2)
     or (dateFormat(inputDate,"ddmm") IS "3012" and listFind("2,3",dayOfWeek(inputDate),",") gt 0)
     or (dateFormat(inputDate,"ddmm") IS "3112" and listFind("2,3,4",dayOfWeek(inputDate),",") gt 0))
     {yearNo=year(inputDate)+1;}
     
     /** If the inputdate IS 1st - 3rd January, the input year MAY need to be previous year **/
     if((dateFormat(inputDate,"ddmm") is "0301" and dayOfWeek(inputDate) eq 1)
     or (dateFormat(inputDate,"ddmm") IS "0201" AND listFind("1,7",dayOfWeek(inputDate),",") gt 0)
     or (dateFormat(inputDate,"ddmm") IS "0101" and listFind("1,7,6",dayOfWeek(inputDate),",") gt 0))
     {yearNo=year(inputDate)-1;}
     
     return yearNo;
 }

---

