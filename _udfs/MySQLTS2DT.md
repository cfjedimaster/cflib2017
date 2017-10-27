---
layout: udf
title:  MySQLTS2DT
date:   2002-06-27T17:43:38.000Z
library: DatabaseLib
argString: "timestamp"
author: Mark Andrachek
authorEmail: hallow@webmages.com
version: 1
cfVersion: CF5
shortDescription: Converts a MySQL timestamp to a CF DateTime object.
tagBased: false
description: |
 Converts the passed MySQL timestamp to a ColdFusion DateTime object.

returnValue: Returns a date/time object.

example: |
 <CFSET TS = "20011211145204">
 
 <CFOUTPUT>
 Timestamp = #TS#, CF date object = #MySQLTS2DT(TS)#
 </CFOUTPUT>

args:
 - name: timestamp
   desc: MySQL time stamp.
   req: true


javaDoc: |
 /**
  * Converts a MySQL timestamp to a CF DateTime object.
  * 
  * @param timestamp      MySQL time stamp. (Required)
  * @return Returns a date/time object. 
  * @author Mark Andrachek (hallow@webmages.com) 
  * @version 1, June 27, 2002 
  */

code: |
 function MySQLTS2DT(timestamp) {
     return CreateDateTime(Left(timestamp,4),Mid(timestamp,5,2),Mid(timestamp,7,2),Mid(timestamp,9,2),Mid(timestamp,11,2),Mid(timestamp,13,2));
 }

oldId: 430
---

