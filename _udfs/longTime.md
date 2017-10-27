---
layout: udf
title:  longTime
date:   2012-01-25T22:07:45.000Z
library: DateLib
argString: "seconds"
author: Will Belden
authorEmail: CaptainPalapa@gmail.com
version: 2
cfVersion: CF8
shortDescription: Returns a list like 3 years, 2 months, 12 days, 1 hour, 10 minutes, 45 seconds from a seconds count argument.
tagBased: false
description: |
 Returns a list like 3 years, 2 months, 12 days, 1 hour, 10 minutes, 45 seconds from a seconds count argument.
 
 Correctly adds the (s) to each item month vs. months, etc.  Will not include any items that are zero.  For exactly 1 year and 20 seconds, would return '1 year, 20 seconds'

returnValue: Returns a string.

example: |
 <cfoutput>
 Large test: <br/>
 111132864 seconds = #longTime(111132864)#<br />
 Medium test: <br />
 97531 seconds = #longTime(97531)#<br />
 Shorter test: <br />
 11252 seconds = #longTime(11252)#<br />
 </cfoutput>

args:
 - name: seconds
   desc: Number of seconds.
   req: true


javaDoc: |
 /**
  * Returns a list like 3 years, 2 months, 12 days, 1 hour, 10 minutes, 45 seconds from a seconds count argument.
  * Fix by Shad Belcher
  * 
  * @param seconds      Number of seconds. (Required)
  * @return Returns a string. 
  * @author Will Belden (CaptainPalapa@gmail.com) 
  * @version 2, January 25, 2012 
  */

code: |
 function longTime(seconds) {
     var nSeconds = seconds;
     var nSecondsLeft = seconds;
     var stPieces = {};
 
     var sComplete = '';
     var sYears = '';
     var sMonths = '';
     var sDays = '';
     var sHours = '';
     var sMinutes = '';
     var sSeconds = '';
 
     var nYearsSeconds = 31536000;
     var nMonthsSeconds = 2628000; // YearsSeconds divided by 12
     var nDaysSeconds = 86400;
     var nHoursSeconds = 3600;
     var nMinutesSeconds = 60;
 
     // Calculate YEARS
     stPieces['years'] = fix(nSecondsLeft / nYearsSeconds);
         nSecondsLeft = nSecondsLeft - nYearsSeconds * stPieces['years'];
     stPieces['months']= fix(nSecondsLeft / nMonthsSeconds);
         nSecondsLeft = nSecondsLeft - nMonthsSeconds * stPieces['months'];
     stPieces['days']= fix(nSecondsLeft / nDaysSeconds);
         nSecondsLeft = nSecondsLeft - nDaysSeconds * stPieces['days'];
     stPieces['hours']= fix(nSecondsLeft / nHoursSeconds);
         nSecondsLeft = nSecondsLeft - nHoursSeconds * stPieces['hours'];
     stPieces['minutes']= fix(nSecondsLeft / nMinutesSeconds);
         nSecondsLeft = nSecondsLeft - nMinutesSeconds * stPieces['minutes'];
     stPieces['seconds'] = nSecondsLeft;
 
     if ( stPieces['seconds'] GT 1){
         sComplete = listPrepend(sComplete, stPieces['seconds'] & ' seconds');
     } else if ( stPieces['seconds'] GT 0 ){
         sComplete = listPrepend(sComplete, stPieces['seconds'] & ' second');
     }
     if ( stPieces['minutes'] GT 1){
         sComplete = listPrepend(sComplete, stPieces['minutes'] & ' minutes');
     } else if ( stPieces['minutes'] GT 0 ){
         sComplete = listPrepend(sComplete, stPieces['minutes'] & ' minute');
     }
     if ( stPieces['hours'] GT 1){
         sComplete = listPrepend(sComplete, stPieces['hours'] & ' hours');
     } else if ( stPieces['hours'] GT 0 ){
         sComplete = listPrepend(sComplete, stPieces['hours'] & ' hour');
     }
     if ( stPieces['days'] GT 1){
         sComplete = listPrepend(sComplete, stPieces['days'] & ' days');
     } else if ( stPieces['days'] GT 0 ){
         sComplete = listPrepend(sComplete, stPieces['days'] & ' day');
     }
     if ( stPieces['months'] GT 1){
         sComplete = listPrepend(sComplete, stPieces['months'] & ' months');
     } else if ( stPieces['months'] GT 0 ){
         sComplete = listPrepend(sComplete, stPieces['months'] & ' month');
     }
     if ( stPieces['years'] GT 1){
         sComplete = listPrepend(sComplete, stPieces['years'] & ' years');
     } else if ( stPieces['years'] GT 0 ){
         sComplete = listPrepend(sComplete, stPieces['years'] & ' year');
     }
 
     sComplete = replace(sComplete, ',', ', ', 'ALL');
     return sComplete;
 }

oldId: 2101
---

