---
layout: udf
title:  IsClientTimeout
date:   2002-08-09T15:50:12.000Z
library: UtilityLib
argString: "timespan"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns True if the user has not requested a page within the given time span.
description: |
 Returns True if the user has not requested a page within the given time span.  This function can be used to timeout client variables in security schemes where you control access by checking for the existence of a client variable.  This gets around a key difference between client and session variables.
 &lt;P&gt;
 You must have client state management enabled with the CFAPPLICATION tag in order to use this function.

returnValue: Returns a Boolean value.

example: |
 <!---
 Example commented out so that application will not interfere with site.
 
 <CFAPPLICATION NAME="IsClientTimeoutTest" CLIENTMANAGEMENT="Yes" sessionmanagement=1 CLIENTSTORAGE="Cookie">
 
 <CFIF IsClientTimeout(CreateTimeSpan(0,0,30,0))>
   <CFSET Client.LoggedIn = False>              
 </CFIF>
 --->

args:
 - name: timespan
   desc: Days, hours, minutes, and seconds (using CreateTimeSpan) before client variables should be timed out.
   req: true


javaDoc: |
 /**
  * Returns True if the user has not requested a page within the given time span.
  * 
  * @param timespan      Days, hours, minutes, and seconds (using CreateTimeSpan) before client variables should be timed out. (Required)
  * @return Returns a Boolean value. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, August 9, 2002 
  */

code: |
 function IsClientTimeout(timespan)
 {
   if (DateCompare(CreateODBCDateTime(Now()), DateAdd("s", (Round(timespan* 86400)), Client.LastVisit)) GTE 0){ 
     Return True;
   }
   else{
     Return False;
   }
 }

---

