---
layout: udf
title:  offsetDate
date:   2013-02-07T09:44:39.000Z
library: DateLib
argString: "offset[, refDate]"
author: Loïc Mahieu
authorEmail: loic@igloo.be
version: 1
cfVersion: CF9
shortDescription: Offset a date according to a datepart defined by a mask.
tagBased: false
description: |
 Offsets a date according to a passed-in mask. The mask is of format:
 [value][datepart]
 eg:
 1d (one day)
 
 The value must be an integer, and the datePart must be one of &quot;y&quot; for years, &quot;m&quot; for months, &quot;w&quot; for weeks, &quot;d&quot; for days, &quot;h&quot; for hours, &quot;n&quot; for minutes and &quot;s&quot; for seconds.
 
 Multiple mask items can be specified, eg:
 
 1d2h3s is one day, two hours and three seconds.

returnValue: Returns a date offset as per the mask

example: |
 // SAMPLES
 
 offsetDate("1d"); // == dateAdd("d", 1, now())
 offsetDate("1y", "2013-01-01") // == "2014-01-01"
 offsetDate("1m1d") // == Add 1 month and 1 day to now()
 offsetDate("-43Y0M+10D") // == subtracts 43 years, adds zero months and ten days to now()
 
 
 // TESTS
 
 function assert(val1, val2) { if( !dateCompare(val1, val2) == 0 ) throw('"#val1#" != "#val2#"'); }
 
 assert(offsetDate("1y", "2013-01-01"), "2014-01-01");
 assert(offsetDate("1m", "2013-01-01"), "2013-02-01");
 assert(offsetDate("1w", "2013-01-01"), "2013-01-08");
 assert(offsetDate("1d", "2013-01-01"), "2013-01-02");
 assert(offsetDate("1h", "2013-01-01 00:00:00"), "2013-01-01 01:00:00");
 assert(offsetDate("1n", "2013-01-01 00:00:00"), "2013-01-01 00:01:00");
 assert(offsetDate("1s", "2013-01-01 00:00:00"), "2013-01-01 00:00:01");
 assert(offsetDate("1y1d1n", "2013-01-01 00:00:00"), "2014-01-02 00:01:00");

args:
 - name: offset
   desc: A string containing a date mask (as per description)
   req: true
 - name: refDate
   desc: A date. Defaults to now()
   req: false


javaDoc: |
 /**
  * Offset a date according to a datepart defined by a mask.
  * v0.9 by Loïc Mahieu
  * v1.0 by Adam Cameron (improved regex, removed redundant code, renamed function to be less vague)
  * 
  * @param offset      A string containing a date mask (as per description) (Required)
  * @param refDate      A date. Defaults to now() (Optional)
  * @return Returns a date offset as per the mask 
  * @author Loïc Mahieu (loic@igloo.be) 
  * @version 1.0, February 7, 2013 
  */

code: |
 function offsetDate(required string offset, date refDate = now()) {
     var matcher = createObject("java", "java.util.regex.Pattern")
         .compile("(?i)([+-]?[0-9]+)\s*([snhdwmy])")
         .matcher(offset);
 
     while (matcher.find()) {
         var match = matcher.group(1);
         var datePart = matcher.group(2);
 
         if (datePart == "y"){
             datePart = "yyyy";
         }
         else if (datePart == "w"){
             datePart = "ww";
         }
         refDate = dateAdd(datePart, match, refDate);
     }
     return refDate;
 }

---

