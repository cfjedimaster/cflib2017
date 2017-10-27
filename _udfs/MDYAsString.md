---
layout: udf
title:  MDYAsString
date:   2002-11-01T20:01:43.000Z
library: DateLib
argString: "daytString"
author: Larry Juncker
authorEmail: ljuncker@aljcompserv.com
version: 1
cfVersion: CF5
shortDescription: Returns a date in long text format.
tagBased: false
description: |
 Returns a supplied date in the format &quot;The Twenty Second day of September, in the year One Thousand Nine Hundred and Eighty Six.&quot;

returnValue: Returns a string.

example: |
 <cfoutput>
 <cfset DaytString = "9/02/1986">
 #DaytString# - #MDYAsString(DaytString)#<br>
 #DateFormat(DateAdd("D","10",DaytString),"MM/DD/YYYY")# - #MDYAsString(DateAdd("D","10",DaytString))#<br>
 #DateFormat(DateAdd("D","20",DaytString),"MM/DD/YYYY")# - #MDYAsString(DateAdd("D","20",DaytString))#<br>
 #DateFormat(DateAdd("D","30",DaytString),"MM/DD/YYYY")# - #MDYAsString(DateAdd("D","30",DaytString))#<br>
 #DateFormat(DateAdd("D","40",DaytString),"MM/DD/YYYY")# - #MDYAsString(DateAdd("D","40",DaytString))#<br>
 </cfoutput>

args:
 - name: daytString
   desc: Date object to convert.
   req: true


javaDoc: |
 /**
  * Returns a date in long text format.
  * 
  * @param daytString      Date object to convert. (Required)
  * @return Returns a string. 
  * @author Larry Juncker (ljuncker@aljcompserv.com) 
  * @version 1, November 1, 2002 
  */

code: |
 function MDYAsString(daytString) {
     var dayList="First,Second,Third,Fourth,Fifth,Sixth,Seventh,Eighth,Ninth,Tenth,Eleventh,Twelveth,Thirteenth,Fourteenth,Fifteenth,Sixteenth,Seventeenth,Eighteenth,Nineteenth,Twentieth,Twenty First,Twenty Second,Twenty Third,Twenty Fourth,Twenty Fifth,Twenty Sixth,Twenty Seventh,Twenty Eighth,Twenty Ninth,Thirtieth,Thirty First";
     var DayAsString = ListGetAt(dayList,Day(DaytString));
     var numTenList="Ten,Twenty,Thirty,Fourty,Fifty,Sixty,Seventy,Eighty,Ninety";
     var numList="One,Two,Three,Four,Five,Six,Seven,Eight,Nine,Ten,Eleven,Twelve,Thirteen,Fourteen,Fifteen,Sixteen,Seventeen,Eighteen,Nineteen";
     var y1=mid(Year(DaytString),1,1);
     var y2=mid(Year(DaytString),2,1);
     var y3=mid(Year(DaytString),3,1);
     var y4=mid(Year(DaytString),4,1);
     var y2Str = '';
     var y3Str = '';
         
     if(y2 gt 0) y2Str = ListGetAt(numList,y2) & " Hundred";
     if(y3 gt 0) y3Str = ListGetAt(numTenList,y3);
                 
     return "The " & DayAsString & " day of " & MonthAsString(Month(DaytString)) & ", in the year " & ListGetAt(numList,y1) & " Thousand "   & y2Str & " " &  " and " & y3Str & " " & ListGetAt(numList,y4);
 
 }

oldId: 770
---

