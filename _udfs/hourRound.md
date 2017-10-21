---
layout: udf
title:  hourRound
date:   2005-05-23T22:39:05.000Z
library: DateLib
argString: "theNumber"
author: Tim
authorEmail: tim.garver@nice.com
version: 1
cfVersion: CF5
shortDescription: Rounds a decimal number (hours) to the nearest quater hour.
description: |
 Rounds a decimal number (hours) to the nearest quater hour.
 As in 7.45 hours would be rounded to 7.5 
 Or 65.67 hours would be rounded to 65.5
 where as 65.69 hours would be 65.75

returnValue: Returns a number.

example: |
 <cfoutput>
 #RoundHour(47.93)# Hours
 </cfoutput>

args:
 - name: theNumber
   desc: The number to modify.
   req: true


javaDoc: |
 /**
  * Rounds a decimal number (hours) to the nearest quater hour.
  * 
  * @param theNumber      The number to modify. (Required)
  * @return Returns a number. 
  * @author Tim (tim.garver@nice.com) 
  * @version 1, May 23, 2005 
  */

code: |
 function hourRound(theNumber) {
    var hour = 0;
    var mins = 0;
    if(theNumber contains "."){
            // strip out hour and decimals
        hour = ListFirst(theNumber,'.');
        mins = listgetat(theNumber,2,'.');
        //if the minute part is only 1 digit, add a zero to the end of it
        if(Len(mins) EQ 1){
        mins = mins * 10;
        }  
        // next determine were in the scheme the mins fall.
        // between 0 - 25 then how close to each end are they
        // between 25 - 50 and figure how close they are
        // and 50 - 75 again closness
        // u guessed it 75 - 99 cause there will be no x.100 passed
        // the distance between the half way mark in each group if its under the half,
        // round down, if above it, then round up.
        // if number is above last half way mark, add a whole 1 to the hour.
        // 0 - 25
        if((mins gt 0) and (mins lte 25)){
                // 0 - 12.5
                if((mins gt 0) and (mins lt 13)) return hour;
             else return hour + .25;
        }
            // 25 - 50
        else if((mins gt 25) and (mins lte 50)){
                // 25 - 37.5
               if((mins gt 25) and (mins lt 38)) return hour + .25;
             else return hour + .50;
        }
            // 50 - 75
        else if((mins gt 50) and (mins lte 75)){
                // 50 - 62.5
               if((mins gt 50) and (mins lt 63)) return hour + .50;
             else return hour + .75;
        }
            // 75 - 99
         else if((mins gt 75) and (mins lte 99)){
             // 75 - 86.5
               if((mins gt 75) and (mins lt 87)) return hour + .75;
             else return hour + 1;
        }
        else return hour;       
    }
    else return theNumber;
 }

---

