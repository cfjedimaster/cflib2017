---
layout: udf
title:  GetWeekdays
date:   2008-04-11T02:34:10.000Z
library: DateLib
argString: "startdate, enddate"
author: Mike Nadasy
authorEmail: mikenadasy@comcast.net
version: 1
cfVersion: CF7
shortDescription: Returns an array of weekdays.
tagBased: true
description: |
 Returns an 2 dimension array of weekday name and weekday value to be used in a select form control.

returnValue: Returns a two-dimensional array.

example: |
 <cfset getDays = GetWeekdays("2007/08/23","2007/09/06")>
     <form method="post">
         Choose Date:
         <select name="selDate">
             <cfloop from="1" to="#arraylen(getDays)#" index="i">                
                 <cfoutput>
                     <option value="#getDays[i][1]#">#getDays[i][2]#</option>
                 </cfoutput>                    
             </cfloop>
         </select>
         <input type="Submit" value="Submit">
     </form>
     
 <cfif isdefined("form.selDate")>
     <cfdump var="#form#">
 </cfif>

args:
 - name: startdate
   desc: Starting date. Defaults to 8/23/2007.
   req: true
 - name: enddate
   desc: Ending date. Defaults to 9/6/2007.
   req: true


javaDoc: |
 <!---
  Returns an array of weekdays.
  
  @param startdate      Starting date. Defaults to 8/23/2007. (Required)
  @param enddate      Ending date. Defaults to 9/6/2007. (Required)
  @return Returns a two-dimensional array. 
  @author Mike Nadasy (mikenadasy@comcast.net) 
  @version 1, April 10, 2008 
 --->

code: |
 <cffunction name="GetWeekdays" returntype="array" output="false">
     <cfargument  name="startDate" default="2007/08/23">
     <cfargument name="endDate" default="2007/09/06">    
     <cfscript>
         //Total number of days to display
         var numOfDays = DateDiff("d",arguments.startDate,arguments.endDate) +2;
         
         //Array to hold text and value fields for select options
         var dateArray = arraynew(2);
         var i = "";
         
         //Populate array with date information
         for(i=1;i lt numOfDays; i=i+1)
         {
             if(arguments.startdate lte enddate)
             {
                 dateArray[i][1] = dateformat(arguments.startdate,"yyyy/mm/dd");
                 switch(dayofweek(arguments.startdate))
                 {
                     case 2:
                     {
                         dateArray[i][2] = "Mon, " &  dateformat(dateArray[i][1],"mmm d, yyyy");
                         break;
                     }
                     case 3:
                     {
                         dateArray[i][2] = "Tues, " &  dateformat(dateArray[i][1],"mmm d, yyyy");
                         break;
                     }
                     case 4:
                     {
                         dateArray[i][2] = "Wed, " &  dateformat(dateArray[i][1],"mmm d, yyyy");
                         break;
                     }
                     case 5:
                     {
                         dateArray[i][2] = "Thur, " &  dateformat(dateArray[i][1],"mmm d, yyyy");
                         break;
                     }
                     case 6:
                     {
                         dateArray[i][2] = "Fri, " &  dateformat(dateArray[i][1],"mmm d, yyyy");
                         break;
                     }
                     default:
                     {
                         dateArray[i][2] = "Empty";
                         break;
                     }
                 }    
                 arguments.startdate = dateadd("d",1,arguments.startdate);                
             }
         }    
         
         //Clean out array of "Empty" cells
         for(i=1; i lt arraylen(dateArray); i=i+1)
         {
             if(dateArray[i][2] eq "Empty")
             {
                 ArrayDeleteAt(dateArray,i);//Saturday
                 ArrayDeleteAt(dateArray,i);//Sunday
             }        
         }            
     </cfscript>
     <cfreturn dateArray>
 </cffunction>

oldId: 1794
---

