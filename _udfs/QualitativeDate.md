---
layout: udf
title:  QualitativeDate
date:   2002-04-15T12:34:30.000Z
library: DateLib
argString: "date"
author: Matthew Walker
authorEmail: matthew@cabbagetree.co.nz
version: 1
cfVersion: CF5
shortDescription: Qualitative description of a date.
description: |
 Returns a qualitative description of a date, such as &quot;Yesterday&quot; or &quot;Later this month&quot;.

returnValue: Returns a string.

example: |
 <cfset StartDate=Now()-10>
 <cfset EndDate=Now()+10>
 <cfloop from="#StartDate#" to="#EndDate#" index="TheDate">
     <cfoutput>
          #LSDateFormat(TheDate)#: #QualitativeDate(TheDate)#<br>
     </cfoutput>
 </cfloop>

args:
 - name: date
   desc: Date you want to return a qualitative description for.
   req: true


javaDoc: |
 /**
  * Qualitative description of a date.
  * 
  * @param date      Date you want to return a qualitative description for. 
  * @return Returns a string. 
  * @author Matthew Walker (matthew@cabbagetree.co.nz) 
  * @version 1, April 15, 2002 
  */

code: |
 function QualitativeDate(Date) {
 
     var Today = Now();
     var YearsDifference = Year(Today) - Year(Date);
     var MonthsDifference = Month(Today) - Month(Date);
     var WeeksDifference = Week(Today) - Week(Date);
     var DaysDifference = DayOfWeek(Today) - DayOfWeek(Date);
     
     if ( DateCompare(Date, Now()) LT 1 ) {
         if ( YearsDifference GT 2 )
             return "A long time ago";
         if ( YearsDifference EQ 2 )
             return "Two years ago";
         if ( YearsDifference EQ 1 )
             return "Last year";
         if ( MonthsDifference GT 2 )
             return "Earlier this year";
         if ( MonthsDifference EQ 2 )
             return "Two months ago";
         if ( MonthsDifference EQ 1 )
             return "Last month";
         if ( WeeksDifference GT 2 )
             return "Earlier this month";
         if ( WeeksDifference EQ 2 )
             return "Two weeks ago";
         if ( WeeksDifference EQ 1 )
             return "Last week";    
         if ( DaysDifference GT 1 )
             return "Earlier this week";
         if ( DaysDifference EQ 1 )
             return "Yesterday";    
         return "Today";
     }        
     else {
         if ( YearsDifference LT -1 )
             return "Sometime in the future";
         if ( YearsDifference EQ -1 )
             return "Next year";
         if ( MonthsDifference LT -1 )
             return "Later this year";
         if ( MonthsDifference EQ -1 )
             return "Next month";
         if ( WeeksDifference LT 0 )
             return "Later this month";
         if ( DaysDifference LT -2 )
             return "Later this week";
         if ( DaysDifference EQ -2 )
             return "Two days from now";
         if ( DaysDifference EQ -1 )
             return "Tomorrow";    
         return "Today";    
     }        
 }

---

