---
layout: udf
title:  convertActiveDirectoryTime
date:   2006-09-07T03:13:59.000Z
library: DateLib
argString: "adTime"
author: Tariq Ahmed
authorEmail: tariq@dopejam.com
version: 1
cfVersion: CF6
shortDescription: Converts Active Directory 100-Nanosecond time stamps.
description: |
 Time in Active Directory is stored in a 64 bit integer that keeps track of the number of 100-Nanosecond intervals which have passed since January 1, 1601 (not to be confused with EPOCH). The 64 bit value uses 2 32bit parts to store the time.
 
 This function simply takes that number, and converts it for easy use. Algorithm adapted from a House of Fusion posting from David Strong.
 
 Returns a structure with the following elements:
 date: mm/dd/yyyy formatted date.
 time: HH:mm formatted date.
 ts: Raw timestamp.

returnValue: Returns a struct.

example: |
 <cfset stADDateTime = convertActiveDirectoryTime("127944393687163952")>
 <cfoutput>
 The Date is #stADDateTime.Date# and the time is #stADDateTime.Time#. 
 Or freestyle format of: #DateFormat(stADDateTime.ts,"MMDDYYYY")# #TimeFormat(stADDateTime.ts,"hh:mmtt")#
 </cfoutput>

args:
 - name: adTime
   desc: Time in ActiveDirectory format.
   req: true


javaDoc: |
 /**
  * Converts Active Directory 100-Nanosecond time stamps.
  * 
  * @param adTime      Time in ActiveDirectory format. (Required)
  * @return Returns a struct. 
  * @author Tariq Ahmed (tariq@dopejam.com) 
  * @version 1, September 6, 2006 
  */

code: |
 function convertActiveDirectoryTime(adTime) {
     var retVal = structNew();
     var tempTime = arguments.adTime / (60*10000000);
     retVal.ts = DateAdd('n',tempTime,'1/1/1601');
     retVal.ts = DateConvert("utc2Local", retVal.ts );
     retVal.date = Dateformat(retVal.ts,'mm/dd/yyyy');
     retVal.time = Timeformat(retVal.ts,'HH:mm');
     return retVal;
 }

---

