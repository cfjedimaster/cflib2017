---
layout: udf
title:  convertTimeStringToSeconds
date:   2012-09-29T22:21:50.000Z
library: DateLib
argString: "timeAsString[, workingHoursPerDay]"
author: Simon Bingham
authorEmail: me@simonbingham.me.uk
version: 1
cfVersion: CF9
shortDescription: Takes a time string in &quot;4d 12h 30m&quot; format and converts to seconds.
tagBased: false
description: |
 Takes a time string in &quot;4d 12h 30m&quot; format and converts to seconds. Also, takes an optional working hours per day argument as the function was originally used for timesheets.

returnValue: An integer number of seconds

example: |
 <cfoutput>
   <cfset timeasstring = "4d 12h 30m" />
   <p>Original Time: #timeasstring#</p>
  
   <p>Converted To Seconds: #convertTimeStringToSeconds( timeasstring )#</p>
 </cfoutput>

args:
 - name: timeAsString
   desc: String formatted in h/m/s, eg&#58; 4d 12h 30m
   req: true
 - name: workingHoursPerDay
   desc: Number of hours to consider "a day"
   req: false


javaDoc: |
 /**
  * Takes a time string in &quot;4d 12h 30m&quot; format and converts to seconds.
  * v1.0 by Simon Bingham
  * 
  * @param timeAsString      String formatted in h/m/s, eg: 4d 12h 30m (Required)
  * @param workingHoursPerDay      Number of hours to consider "a day" (Optional)
  * @return An integer number of seconds 
  * @author Simon Bingham (me@simonbingham.me.uk) 
  * @version 1.0, September 29, 2012 
  */

code: |
 public numeric function convertTimeStringToSeconds( required string timeAsString, string workingHoursPerDay=24 ){
     // create a struct containing placeholder values for days, hours and minutes
     var timeStruct = { days=0, hours=0, minutes=0 };
     
     // create a variable to store the return value
     var timeInSeconds = "";
     
     // check the timeAsString argument has a length
     if( listLen( trim( arguments.timeAsString ), " " ) ){
         // loop through the values in the timeAsString argument
         for ( var i=1; i lte listLen( arguments.timeAsString, " " ); i=i+1 ){
             // if the current value ends in 'd' add the value to the 'days' element of our structure 
             if( right( listGetAt( arguments.timeAsString, i, " " ), 1 ) eq "d" ) {
                 timeStruct.days = val( listGetAt( arguments.timeAsString, i, " " ) );
             // if the current value ends in 'h' add the value to the 'hours' element of our structure 
             }else if( right( listGetAt( arguments.timeAsString, i, " " ), 1 ) eq "h" ){
                 timeStruct.hours = val( listGetAt( arguments.timeAsString, i, " " ) );
             // if the current value ends in 'm' add the value to the 'minutes' element of our structure 
             }else if( right( listGetAt( arguments.timeAsString, i, " " ), 1 ) eq "m" ){
                 timeStruct.minutes = val( listGetAt( arguments.timeAsString, i, " " ) );
             }
         }
         
         // convert each of the structure elements to seconds and add them
         timeInSeconds = 
         ( timeStruct.days * ( arguments.workingHoursPerDay * 3600 ) )
         + ( timeStruct.hours * 3600 )
         + ( timeStruct.minutes * 60 );
     }
     
     // return the time in seconds
     return timeInSeconds;
 }

---

