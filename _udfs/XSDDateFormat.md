---
layout: udf
title:  XSDDateFormat
date:   2002-03-18T20:41:21.000Z
library: DateLib
argString: "str_date"
author: Rob (r2)
authorEmail: rob@rtwo.net
version: 1
cfVersion: CF5
shortDescription: Takes an Date/Time and makes it into XSD time format (for use in xml xsds)
tagBased: false
description: |
 Takes an Date/Time and makes it into simple XSD date time format (for use in xml xsds). Doesn't do time zones.

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 The current date/time in XSD format is: #XSDDateFormat(now())#
 </CFOUTPUT>

args:
 - name: str_date
   desc: Date/time you want converted to XSD format.
   req: true


javaDoc: |
 /**
  * Takes an Date/Time and makes it into XSD time format (for use in xml xsds)
  * 
  * @param str_date      Date/time you want converted to XSD format. 
  * @return Returns a string. 
  * @author Rob (r2) (rob@rtwo.net) 
  * @version 1, March 18, 2002 
  */

code: |
 function XSDDateFormat(str_date){
    return DateFormat(str_date,"yyyy-mm-ddT") & TimeFormat(str_date,"HH:mm:ss");
 }

---

