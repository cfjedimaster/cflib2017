---
layout: udf
title:  TextToDate
date:   2005-01-21T14:17:13.000Z
library: DateLib
argString: "textString[, format]"
author: Bill Rawlinson
authorEmail: wmrawlin@sbcs.com
version: 1
cfVersion: CF6
shortDescription: cffunction that takes a text string and a format and returns a date object.
tagBased: true
description: |
 Takes a numeric string and returns the best date equivilent based on the format you specify.  Accepts four different formats: mmddyyyy, yyyymmdd, ddmmyyyy, yyyyddmm.  If a date string is passed in the date is returned. If a non-numeric or non-date string is passed in it returns 1/1/1900.

returnValue: Returns a date.

example: |
 <cfset datevals = "01599,4/5/1978,010599,1599,151999,01051999,010519999,010501999,159,10599,avkld,24587,343532,12423232,987822,311993">
 
 <cfoutput>
     <table>
         <tr>
             <th>Old Date</th>
             <th>mm/dd/yyyy</th>
             <th>dd/mm/yyyy</th>
             <th>yyyy/mm/dd</th>
             <th>yyyy/dd/mm</th>
         </tr>
     <cfloop list="#dateVals#" index="dateval">
         <tr>
             <td>#dateval# </td>
             <td>#dateFormat(textToDate(dateVal,"mmddyyyy"),"mm/dd/yyyy")#</td>
             <td>#dateFormat(textToDate(dateVal,"ddmmyyyy"),"mm/dd/yyyy")#</td>
             <td>#dateFormat(textToDate(dateVal,"yyyymmdd"),"mm/dd/yyyy")#</td>
             <td>#dateFormat(textToDate(dateVal,"yyyyddmm"),"mm/dd/yyyy")#</td>
         </tr>
     </cfloop>
     </table>
 </cfoutput>

args:
 - name: textString
   desc: Date as a string.
   req: true
 - name: format
   desc: Format of the date. Valid values are&#58; mmddyyyy,yyyymmdd,ddmmyyyy,yyyyddmm
   req: false


javaDoc: |
 <!---
  cffunction that takes a text string and a format and returns a date object.
  
  @param textString      Date as a string. (Required)
  @param format      Format of the date. Valid values are: mmddyyyy,yyyymmdd,ddmmyyyy,yyyyddmm (Optional)
  @return Returns a date. 
  @author Bill Rawlinson (wmrawlin@sbcs.com) 
  @version 1, January 21, 2005 
 --->

code: |
 <cffunction name="textToDate" returnType="string" output="false" hint="converts a numeric string to a date object">
     <cfargument name="textString" type="string"    requied="true" hint="numeric string to convert to a date object">
     <cfargument name="format" type="string" required="false" default="mmddyyyy"    hint="best guess at the format of the string; valid values are mmddyyyy | yyyymmdd | ddmmyyyy | yyyyddmm">
 
     <cfset var dateval    = arguments.textstring>
     <cfset var month    = "">
     <cfset var day        = "">
     <cfset var year        = "">
     <cfset var detelen = "">
     <cfset var maxDays = "">
     
     <!--- placeholders used to find month and date on strings between 4-6 characters long --->
     <cfset var sp        = "">
     <cfset var counter1    = "">
     <cfset var counter2    = "">
 
     <cfif isNumeric(dateval)>
         <cfset datelen = len(dateval)>
 
         <cfswitch expression="#datelen#">
             <cfcase value="1,2,3">
                 <cfset day = 1>
                 <cfset month = 1>
                 <cfset year = "1900">
             </cfcase>
             <cfcase value="4,5,6">
                 <cfif right(arguments.format,4) eq "yyyy">
                     <cfset year = right(dateval,2)>
                     <cfset dateVal = left(dateval,Len(dateval)-2)>
                     <cfset arguments.format = left(arguments.format,4)>
                 <CFELSE>
                     <CFSET year = Left(dateval,2)>
                     <CFSET dateVal = Right(dateval,Len(dateval)-2)>
                     <CFSET arguments.format = Right(arguments.format,4)>
                 </CFIF>
 
                 <!--- 
                 due to variable lenths of remaining numbers
                 we have to figure out where to chop up the string to get 
                 the month and day 
                 --->
                 <cfset dateLen = len(dateval)>
                 <cfset counter1 = 2>
                 <cfset counter2 = 2>
                 <cfif dateLen EQ 3>
                     <cfset counter1 = 2>
                     <cfset counter2 = 1>
                 <cfelseif dateLen EQ 2>
                     <cfset counter1 = 1>
                     <cfset counter2 = 1>
                 </cfif>
 
                 <cfif left(arguments.format,2) EQ "mm">
                     <cfset month = mid(dateval,1,counter1)>
                     <cfset sp = 1 + counter1>
                     <cfset day = mid(dateval,sp,counter2)>
                 <cfelse>
                     <cfset day = mid(dateval,1,counter1)>
                     <cfset sp = 1 + counter1>
                     <cfset month = mid(dateval,sp,counter2)>
                 </cfif>
 
             </cfcase>
             <cfdefaultcase><!--- datelen gt 6 --->
                 <cfif right(arguments.format,4) EQ "yyyy">
                     <cfset year = right(dateval,4)>
                     <cfset dateVal = left(dateval,len(dateval)-4)>
                     <cfset arguments.format = left(arguments.format,4)>
                 <cfelse>
                     <cfset year = left(dateval,4)>
                     <cfset dateVal = right(dateval,len(dateval)-4)>
                     <cfset arguments.format = right(arguments.format,4)>
                 </cfif>
                 <cfif left(arguments.format,2) EQ "mm">
                     <cfset month = mid(dateval,1,2)>
                     <cfset day = mid(dateval,3,2)>
                 <cfelse>
                     <cfset month = mid(dateval,3,2)>
                     <cfset day = mid(dateval,1,2)>
                 </cfif>
             </cfdefaultcase>
         </cfswitch>
 
         <cfset year = mid(val(year),1,4)>
         <cfset year = 0 & year>
 
         <cfset month = month MOD 12>
         <cfif month EQ 0>
             <cfset month = 12>
         </cfif>
 
         <cfset maxDays = daysInMonth(createDate(year,month,1))>
         
         <cfset day = day MOD maxDays>
         <cfif day EQ 0>
             <cfset day = maxDays>
         </cfif>
 
     <cfelseif isDate(dateval)>
         <cfset day = day(dateval)>
         <cfset month= month(dateval)>
         <cfset year= year(dateval)>
     <cfelse>
          <!--- if an invalid string is passed in we return 1/1/1900 --->
         <cfset day = 1>
         <cfset month = 1>
         <cfset year = "1900">
     </cfif>
 
     <cfreturn createDate(year,month,day)>
 
 </cffunction>

oldId: 1168
---

