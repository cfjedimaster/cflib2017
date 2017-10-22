---
layout: udf
title:  GetTimeStampFromHttpTimeString
date:   2001-11-26T14:53:21.000Z
library: DateLib
argString: "httpTime"
author: Chris  Wigginton
authorEmail: cwigginton@macromedia.com
version: 1
cfVersion: CF5
shortDescription: Converts HttpTimeString into a timestamp string.
tagBased: false
description: |
 Takes an HttpTimeString ("Thu, 25 Oct 2001 20:17:00 GMT") and converts it to a timestamp
 ({ts '2001-10-25 20:17:00'}).

returnValue: Returns a timestamp string.

example: |
 <cfset httpTime = GetHttpTimeString(Now())>
 <cfset timeStamp = GetTimeStampFromHttpTimeString(httpTime)>
 
 <CFOUTPUT>
 Timestamp=#timestamp#
 </CFOUTPUT>

args:
 - name: httpTime
   desc: HttpTimeString
   req: true


javaDoc: |
 /**
  * Converts HttpTimeString into a timestamp string.
  * 
  * @param httpTime      HttpTimeString 
  * @return Returns a timestamp string. 
  * @author Chris  Wigginton (cwigginton@macromedia.com) 
  * @version 1, November 26, 2001 
  */

code: |
 function GetTimeStampFromHttpTimeString(httpTime) {
     var dateParts = ListToArray(httpTime, " ");
     var timeStamp = "{ts '" & dateParts[4] & "-" & DateFormat("#DateParts[3]#/1/2000", "mm") & "-" & dateParts[2] & " " & dateParts[5] & "'}";
     return timeStamp;
 }

---

