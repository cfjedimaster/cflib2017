---
layout: udf
title:  getTimeInterval
date:   2012-07-27T19:24:44.000Z
library: DateLib
argString: "date"
author: Simon Bingham
authorEmail: me@simonbingham.me.uk
version: 1
cfVersion: CF9
shortDescription: Returns the interval since a date in a Twitter like format (e.g. 5 minutes ago)
description: |
 Returns the interval since a date in a Twitter like format (e.g. 4 seconds ago, 5 minutes ago, 6 hours ago, yesterday, etc).

returnValue: Returns a string

example: |
 <cfoutput>#getTimeInterval(createDateTime(2012, 2, 22, 12, 30, 0))#</cfoutput>

args:
 - name: date
   desc: Date to format
   req: true


javaDoc: |
 /**
  * Returns the interval since a date in a Twitter like format (e.g. 5 minutes ago)
  * version 0.9 by Simon Bingham
  * version 1.0 by Adam Cameron - tweaked to correct pluralisation when the interval value was 1.
  * 
  * @param date      Date to format (Required)
  * @return Returns a string 
  * @author Simon Bingham (me@simonbingham.me.uk) 
  * @version 1, July 27, 2012 
  */

code: |
 function getTimeInterval(date){
     var interval    = "";
     var offset        = 0;
     var result        = 0;
     if (isDate(arguments.date)){
         var formattedDate = dateFormat(arguments.date, "dddd dd mmmm yyyy") & " at " & timeFormat(arguments.date, "HH:MM");
         
         if (dateDiff("s", arguments.date, now()) < 60){
             // less than 1 minute show interval in seconds
             offset    = dateDiff("s", arguments.date, now());
             interval= offset == 1 ? "second":"seconds";
             result    = "#offset# #interval# ago";
         
         }else if (dateDiff("n", arguments.date, now()) < 60){
             // less than 1 hour show interval in minutes
             offset    = dateDiff("n", arguments.date, now());
             interval= offset == 1 ? "minute":"minutes";
             result    = "#offset# #interval# ago";
         
         }else if (dateDiff("h", arguments.date, now()) < 24){
             // less than 24 hours display interval in hours
             offset    = dateDiff("h", arguments.date, now());
             interval= offset == 1 ? "hour":"hours";
             result    = "#offset# #interval# ago";
         
         }else if (dateDiff("d", arguments.date, now()) < 2){
             // less than 2 days display yesterday
             result    = "yesterday";
         }else if (dateDiff("d", arguments.date, now()) < 7){
             // less than 7 days display day
             result    = dayOfWeekAsString( dayOfWeek( arguments.date ));
         }else{
             // otherwise display date
             result    = formattedDate;
         }
         
         interval = "<abbr title='" & formattedDate & "'>" & result & "</abbr>";
     }
     return interval;
 }

---

