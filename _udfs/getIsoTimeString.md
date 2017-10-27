---
layout: udf
title:  getIsoTimeString
date:   2013-08-01T08:40:59.000Z
library: DateLib
argString: "datetime[, convertToUTC]"
author: Ben Nadel
authorEmail: ben@bennadel.com
version: 1
cfVersion: CF9
shortDescription: Converts your date into a time string the aheres to the ISO 8601 standard (for use with some API calls).
tagBased: false
description: |
 Takes your ColdFusion date/time object and returns a string that represents the date in ISO 8601 complaint format. This separates the date/time values with a &quot;T&quot; and ends with the UTC-marker, &quot;Z&quot;. Since it uses the UTC-marker, it will convert your date/time into UTC, unless you tell it not to (using the optional argument).

returnValue: A date string as per ISO format

example: |
 currentTime = now();
 
 // Compare the HTTP time to the ISO time.
 writeOutput( "HTTP Time: " & getHttpTimeString( currentTime ) );
 writeOutput( "<br />" );
 writeOutput( "ISO Time: " & getIsoTimeString( currentTime ) );

args:
 - name: datetime
   desc: A date/time object
   req: true
 - name: convertToUTC
   desc: Whether to convert to UTC before formatting (default true)
   req: false


javaDoc: |
 /**
  * Converts your date into a time string the aheres to the ISO 8601 standard (for use with some API calls).
  * v1.0 by Ben Nadel
  * 
  * @param datetime      A date/time object (Required)
  * @param convertToUTC      Whether to convert to UTC before formatting (default true) (Optional)
  * @return A date string as per ISO format 
  * @author Ben Nadel (ben@bennadel.com) 
  * @version 1.0, August 1, 2013 
  */

code: |
 string function getIsoTimeString(required date datetime, boolean convertToUTC=true) {
     if (convertToUTC) {
         datetime = dateConvert("local2utc", datetime);
     }
 
     // When formatting the time, make sure to use "HH" so that the
     // time is formatted using 24-hour time.
     return(
         dateFormat(datetime, "yyyy-mm-dd") &
         "T" &
         timeFormat(datetime, "HH:mm:ss") &
         "Z"
     );
 }

oldId: 2264
---

