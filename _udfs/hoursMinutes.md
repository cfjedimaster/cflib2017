---
layout: udf
title:  hoursMinutes
date:   2008-07-02T14:50:53.000Z
library: DateLib
argString: "minutes"
author: Andrew Muller
authorEmail: rebel@daemon.com.au
version: 2
cfVersion: CF5
shortDescription: Formats a number of minutes into &quot;XX hours XX minutes&quot;.
tagBased: false
description: |
 Formats a number of minutes into &quot;XX hours XX minutes&quot;.

returnValue: Returns a string.

example: |
 <cfset cookTime = "75">
 
 <cfoutput>
 Total cooking time: #HoursMinutes(cookTime)#
 </cfoutput>

args:
 - name: minutes
   desc: Number of minutes to convert to hours/minutes.
   req: true


javaDoc: |
 /**
  * Formats a number of minutes into &quot;XX hours XX minutes&quot;.
  * v2 Charlie Arehart found a bug if hours exactly 2, it said hour, not hours
  * 
  * @param minutes      Number of minutes to convert to hours/minutes. (Required)
  * @return Returns a string. 
  * @author Andrew Muller (rebel@daemon.com.au) 
  * @version 2, July 2, 2008 
  */

code: |
 function hoursMinutes(minutes) {
     var tempstr = "";
     var strHours = minutes / 60;
     var strMinutes = minutes MOD 60;
     var hourText = "";
     if (strHours gte 1) {
         if (strHours gte 2) {
             hourText = " hours ";
         } else {
             hourText = " hour ";
         }
         tempstr = Fix(strHours) & hourText;
     }
     
     if (strMinutes gt 0) {
         tempstr = tempstr & strMinutes & " minutes";
     }
     return tempstr;
 }

---

