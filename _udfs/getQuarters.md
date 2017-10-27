---
layout: udf
title:  getQuarters
date:   2004-04-12T11:16:00.000Z
library: DateLib
argString: "aYears"
author: Steve DeWitt
authorEmail: steve.dewitt@milliman.com
version: 1
cfVersion: CF6
shortDescription: Returns first and last day of quarter from first year to current quarter from array of years.
tagBased: false
description: |
 Returns first day and last day of a quarter from an array of years. Starting with the oldest date up to the last year. If the current year is included in the array then it will return up to the current quarter. An array of years that goes from 1999 through 2004 will return up to 12 quarters in an array of structs.

returnValue: Returns an array of structs.

example: |
 <cfscript>
     aYears = ArrayNew(1);
     aYears[1] = 1999;
     aYears[2] = 2000;
     aYears[3] = 2001;
     aYears[4] = 2002;
     aYears[5] = 2003;
     aYears[6] = 2004;
 </cfscript>
 <cfdump var="#getQuarters(aYears)#">

args:
 - name: aYears
   desc: Array of years.
   req: true


javaDoc: |
 /**
  * Returns first and last day of quarter from first year to current quarter from array of years.
  * 
  * @param aYears      Array of years. (Required)
  * @return Returns an array of structs. 
  * @author Steve DeWitt (steve.dewitt@milliman.com) 
  * @version 1, April 12, 2004 
  */

code: |
 function getQuarters(aYears){
     var aQuarters = ArrayNew(1);
     var yLen      = ArrayLen(aYears);
     var q1Start = '01-01-';
     var q1End    = '03-31-';
     var q2Start    = '04-01-';
     var q2End    = '06-30-';
     var q3Start    = '07-01-';
     var q3End    = '09-30-';
     var q4Start    = '10-01-';
     var q4End    = '12-31-';
     var y = 1;
     var q = 1;
     
     for(;y lte yLen;y=y+1) {
         aQuarters[y] = StructNew();
         for(q=1;q lte 4;q=q+1) {
             if(q is 1) {
                 if(q1Start & aYears[y] lte DateFormat(Now(),'mm-dd-yyyy')){
                     aQuarters[y].q1 = q1Start & aYears[y] & "~" & q1End & aYears[y];
                 }
             } else if(q is 2) {
                 if(q2Start & aYears[y] lte DateFormat(Now(),'mm-dd-yyyy')){
                     aQuarters[y].q2 = q2Start & aYears[y] & "~" & q2End & aYears[y];
                 }
             } else if(q is 3) {
                 if(q3Start & aYears[y] lte DateFormat(Now(),'mm-dd-yyyy')){
                     aQuarters[y].q3 = q3Start & aYears[y] & "~" & q3End & aYears[y];
                 }
             } else if(q is 4) {
                 if(q4Start & aYears[y] lte DateFormat(Now(),'mm-dd-yyyy')){
                     aQuarters[y].q4 = q4Start & aYears[y] & "~" & q4End & aYears[y];
                 }
             }
         }
     }
     return aQuarters;
 }

oldId: 1071
---

