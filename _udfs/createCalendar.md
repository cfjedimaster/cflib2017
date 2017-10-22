---
layout: udf
title:  createCalendar
date:   2008-06-04T20:30:04.000Z
library: DateLib
argString: "curMonth, curYear"
author: Eric Hynds
authorEmail: eric@hynds.net
version: 1
cfVersion: CF8
shortDescription: A simple CFML calendar.
tagBased: true
description: |
 Pass in a month and year, and a calendar is returned in a string.  Includes previous/next links to move from month to month, and a simple form with month and year drop downs to change both at once.

returnValue: Returns a string.

example: |
 <cfparam name="url.thisMonth" default="#month(now())#">
 <cfparam name="url.thisYear" default="#year(now())#">
 
 <style type="text/css">
 #calendar { width:100%; }
 #calendar td { font-family: arial, sans-serif; font-size: 13px; }
 #calendar a { color: #000000; }
 #calendar a.navmonth { color: #FFFFFF; font-weight: bold;}
 #calendar #change_form_container { text-align:right; } /* form to change month/year */
 #calendar #change_form_container form { margin:0; padding:0; }
 #calendar .day-all { width: 14%; height:100px; } /* applied to every day */
 #calendar .day-current { background-color: #e1e1e1; } /* only applied to current day */
 #calendar .day-notcurrent { background-color: whitesmoke; } /* applied to all days except current */
 #calendar .day-digit { font-weight:bold; } /* applied to the number of the day for each day */
 #calendar .header { background-color: #717171; color: #FFFFFF; font-size: .95 em; font-weight: bold; text-align: center; } /* prev/next links; current month and year */
 #calendar .subheader { background-color: #aaaaaa; color: #FFFFFF; font-weight: bold; text-align: center; } /* monday - friday */
 </style>
 
 <cfoutput>#createCalendar(url.thisMonth, url.thisYear)#</cfoutput>

args:
 - name: curMonth
   desc: Month to use.
   req: true
 - name: curYear
   desc: Year to use.
   req: true


javaDoc: |
 <!---
  A simple CFML calendar.
  
  @param curMonth      Month to use. (Required)
  @param curYear      Year to use. (Required)
  @return Returns a string. 
  @author Eric Hynds (eric@hynds.net) 
  @version 1, June 4, 2008 
 --->

code: |
 <cffunction name="createCalendar" output="false" returntype="string">
     <!---
      * Produces a calendar for a given month and year.
      * 
      * @param curMonth      The month to display. 
      * @param curYear      The year to display. 
      * @return Returns a string. 
      *
      * original logic by William Steiner (2002)
      * improved by Randy H. Drisgill (2006)
      * converted to cfml + minor improvements by Eric Hynds (2008)
      *
      * optimized for CF8; if you need it to work on previous versions replace all instances of:
      *         <cfset outString &=
      * with:
      *        <cfset outString = outString &
      *
      --->
 
     <cfargument name="curMonth" required="yes" type="numeric">
     <cfargument name="curYear" required="yes" type="numeric">
     
     <cfset var filename = "#cgi.script_name#">
     <cfset var outString = "">
     <cfset var firstDay = CreateDate(curYear, curMonth, 1)>
     <cfset var firstDayDigit = DayOfWeek(FirstDay)>
     <cfset var thisDay = 1>
     <cfset var h = 1>
     
     <cfsavecontent variable="outString">
     <cfoutput>
     <table border="0" cellpadding="5" cellspacing="3" id="calendar">
     <tr>
         <td colspan="7" id="change_form_container">
             <form action="#filename#" method="get">
                 <select name="thisMonth">
                     <cfloop from="1" to="12" index="x"><option value="#x#"<cfif arguments.curMonth eq x> selected="selected"</cfif>>#monthasstring(x)#</option></cfloop>
                 </select>        
                 <select name="thisYear">
                     <option value="2006">2006</option><option value="2007">2007</option><option value="2008" selected="selected">2008</option><option value="2009">2009</option>
                 </select>
                 <input type="submit" name="change" value="Change" />
             </form>        
         </td>
     </tr>
     <tr>
         <td class="header"><a class="navmonth" href="#filename#?thisMonth=#month(dateadd("M",-1,firstDay))#&thisYear=#year(dateadd("Y",-1,firstDay))#">&laquo; Prev</a></td>
         <td class="header" colspan="5">#DateFormat(firstDay, "mmmm yyyy")#</td>
         <td class="header"><a class="navmonth" href="#filename#?thisMonth=#month(dateadd("M",1,firstDay))#&thisYear=#year(dateadd("M",1,firstDay))#">Next &raquo;</a></td>
     </tr>
     <tr>
         <td class="subheader">Sunday</td>
         <td class="subheader">Monday</td>
         <td class="subheader">Tuesday</td>
         <td class="subheader">Wednesday</td>
         <td class="subheader">Thursday</td>
         <td class="subheader">Friday</td>
         <td class="subheader">Saturday</td>
     </tr>    
     </cfoutput>
     </cfsavecontent>
     
     <!--- if it isn't sunday, then we need to if space over to start on the corrent day of week --->
     <cfif firstDayDigit neq 1>
         <cfloop from="1" to="#DayOfWeek(FirstDay)-1#" index="h">
             <cfset outString &= "<td>&nbsp;</td>">
         </cfloop>
     </cfif>
     
     <!--- loop thru all the dates in this month --->
     <cfloop from="1" to="#DaysInMonth(firstDay)#" index="thisDay">
     
         <!--- is it Sunday? if so start new row. --->
         <cfif DayOfWeek(CreateDate(curYear, curMonth, thisDay)) eq 1><cfset outString &= "<tr>"></cfif>
         
         <!--- insert a day --->
         <cfset outString &= "<td align='left' valign='top' class='day-all ">
         
         <!--- is it today? append correct classes to above td --->
         <cfif (CreateDate(curYear, curMonth, thisDay) eq CreateDate(year(now()),month(now()),day(now())))>
             <cfset outString &= "day-current'>">
         <cfelse>
             <cfset outString &= "day-notcurrent'>">
         </cfif>
         <cfset outString &= "<div class='day-digit'>#thisDay#</div>">
         
         <!--- begin insert data for this day --->
         <cfset outString &= "calendar data here">
         <!--- end insert data for this day --->
         
         <!--- close out this day --->
         <cfset outString &= "</td>">
         
         <!--- is it the last day of the month?  if so, fill row with blanks. --->
         <cfif (thisDay eq DaysInMonth(firstDay))>
             <cfloop from="1" to="#(7-DayOfWeek(CreateDate(curYear, curMonth, thisDay)))#" index="h">
                 <cfset outString &= "<td>&nbsp;</td>">
             </cfloop>
         </cfif>
 
         <cfif DayOfWeek(CreateDate(curYear, curMonth, thisDay)) eq 7>
             <cfset outString &= "</tr>">
         </cfif>
     </cfloop>
     
     <cfset outString &= "</table>">
     <cfreturn outString />
 </cffunction>

---

