---
layout: udf
title:  GetDB2TimeStamp
date:   2002-06-27T17:44:33.000Z
library: DatabaseLib
argString: "dateObj, emulateTick"
author: Chris Wigginton
authorEmail: cwigginton@macromedia.com
version: 1
cfVersion: CF5
shortDescription: Takes a ColdFusion date object and returns a DB2 formatted timestamp.
description: |
 Takes a ColdFusion date object and returns a DB2 formatted timestamp.
 
 A second parameter &quot;emulateTick&quot; determines if tick count emulation is added to the date object.

returnValue: Returns a string.

example: |
 <cfoutput>
 #GetDB2TimeStamp(Now(), "Yes")#<BR>
 #GetDB2TimeStamp(Now(), "No")#
 </cfoutput>

args:
 - name: dateObj
   desc: A data object.
   req: true
 - name: emulateTick
   desc: A boolean.
   req: true


javaDoc: |
 /**
  * Takes a ColdFusion date object and returns a DB2 formatted timestamp.
  * 
  * @param dateObj      A data object. (Required)
  * @param emulateTick      A boolean. (Required)
  * @return Returns a string. 
  * @author Chris Wigginton (cwigginton@macromedia.com) 
  * @version 1, June 27, 2002 
  */

code: |
 function getDB2TimeStamp(dateObj, emulateTick)
 {
     var tick = "000000";
     // We can partially emulate milliseconds by 
     //grabbing the current tick and applying it to the date object
     if(emulateTick IS "Yes")
         tick = Right(GetTickCount(),3) & "000";
         
     return DateFormat(dateObj, "yyyy-mm-dd-") & TimeFormat(dateObj, "HH.mm.ss.") & tick; 
 }

---

