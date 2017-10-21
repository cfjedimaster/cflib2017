---
layout: udf
title:  getTimeZone
date:   2004-01-06T19:03:46.000Z
library: DateLib
argString: "dateTimeIn"
author: Tony Felice
authorEmail: staff@nokama.com
version: 1
cfVersion: CF5
shortDescription: Returns the Time Zone Code (string) that corresponds to the dateTime passed in.
description: |
 Returns the Time Zone Code (string) that corresponds to the dateTime passed in.  Will return 'UNK' if the dateTime passed in does not match the set of time zones.

returnValue: Returns a string.

example: |
 <cfoutput>#getTimeZone(now())#</cfoutput>

args:
 - name: dateTimeIn
   desc: The date to parse.
   req: true


javaDoc: |
 /**
  * Returns the Time Zone Code (string) that corresponds to the dateTime passed in.
  * 
  * @param dateTimeIn      The date to parse. (Required)
  * @return Returns a string. 
  * @author Tony Felice (staff@nokama.com) 
  * @version 1, January 6, 2004 
  */

code: |
 function getTimeZone(dateTimeIn) {
     var timeZoneInfo = GetTimeZoneInfo();
     var dateGMT = mid(replace(getHttpTimeString(),"GMT","","ALL"),6,len(replace(getHttpTimeString(),"GMT","","ALL")));
     var dateFactor = dateCompare(dateTimeIn, dateGMT);
     var dateDelta = round(DateDiff("n", dateTimeIn, dateGMT)/60);
     var trueZoneOffset = (dateDelta * dateFactor);
     var offsetList="";
     var zoneCodeList="";
     var listPos="";
     var timeZoneCode="";
     
     
     //standard time zones
     var stdZoneCodeList = "HST,AKST,PST,MST,CST,EST,AST,NST,GMT,CET,EET,MSK,AWST,ACST,AEST";
     var stdOffsetList = "-10,-9,-8,-7,-6,-5,-4,-3.5,0,1,2,3,8,9.5,10";
     
     // daylight saving time zones
     var dstZoneCodeList = "AKDT,PDT,MDT,CDT,EDT,ADT,NDT,GMT,WEST,CEST,EEST,MSD,ACDT,AEDT";
     var dstOffsetList = "-8,-7,-6,-5,-4,-3,-2.5,0,1,2,3,4,10.5,11";
     
     if(timeZoneInfo.isDSTOn IS "YES"){
         offsetList = dstOffsetList;
         zoneCodeList = dstZoneCodeList;
     } else {
         offsetList = stdOffsetList;
         zoneCodeList = stdZoneCodeList;
     }
     
     listPos = ListFindNoCase(OffsetList,trueZoneOffset);
     
     if(listPos NEQ 0) timeZoneCode = ListGetAt(ZoneCodeList,listPos); 
     else timeZoneCode = "UNK";
     
     return timeZoneCode;
 }

---

