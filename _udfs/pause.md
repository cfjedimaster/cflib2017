---
layout: udf
title:  pause
date:   2007-12-20T13:21:35.000Z
library: UtilityLib
argString: "TimeDelay[, DebugMode]"
author: Tyler Bowler
authorEmail: tyler.bowler@rivhs.com
version: 1
cfVersion: CF6
shortDescription: Simulates a paused state within an executed Coldfusion script.
tagBased: false
description: |
 As a more dependable means of holding coldfusion execution for a set period of time I created the pause function.  I could not depend on using GetTickCount due to the inability to specify how long to wait. Using this code will allow you to simulate a pause/wait state within any coldfusion script.  Make sure the Timeout Requests setting is not enabled or your numbers of seconds are less than the specified timeout value, or the request will timeout. Great for batch processing.

returnValue: Returns nothing, unless debugmode is on.

example: |
 <cfoutput>
 Start Pause<br /> 
 <cfset pause(12,true)>
 Done
 </cfoutput>

args:
 - name: TimeDelay
   desc: Number of seconds to paue.
   req: true
 - name: DebugMode
   desc: If true, outputs debug information about the pause. Defaults to false.
   req: false


javaDoc: |
 /**
  * Simulates a paused state within an executed Coldfusion script.
  * Modified by Raymond Camden
  * 
  * @param TimeDelay      Number of seconds to paue. (Required)
  * @param DebugMode      If true, outputs debug information about the pause. Defaults to false. (Optional)
  * @return Returns nothing, unless debugmode is on. 
  * @author Tyler Bowler (tyler.bowler@rivhs.com) 
  * @version 1, December 20, 2007 
  */

code: |
 function pause(TimeDelay) {
     
     //Gets the time the function starts processing for output purposes
     var StartTime = TimeFormat(CreateTime(Hour(Now()),Minute(Now()),Second(Now())), "HH:mm:ss");
     //Converts the start time to seconds 
     var StartTimeInSeconds = Val(Hour(Now()) * 720) + Val(Minute(Now()) * 60) + Second(Now());
     //Sets the delay equal to the startTime plus the amount of seconds passed to the function
     var Delay = StartTimeInSeconds + TimeDelay;
     //Makes the EndTime and CurrTimeInSeconds variable private to this function
     var EndTime = "";
     var CurrTimeInSeconds = "";
     var debugmode = false;
     
     if(arrayLen(arguments) gte 2) debugmode = arguments[2];
 
     //Start Loop
     do { 
         //Calculates the current seconds
         CurrTimeInSeconds = Val(Hour(Now()) * 720) + Val(Minute(Now()) * 60) + Second(Now()); 
         }
     while(CurrTimeInSeconds neq Delay);
     //Sets the EndTime when the do-while loop has completed
     EndTime = TimeFormat(CreateTime(Hour(Now()),Minute(Now()),Second(Now())), "HH:mm:ss");
     
     //Writes output if DebugMode is true
     if(debugMode) {
         WriteOutput('Start: #StartTime#<br />Paused for #TimeDelay# seconds<br />End: #EndTime#<br />');
     }
      
 }

oldId: 1712
---

