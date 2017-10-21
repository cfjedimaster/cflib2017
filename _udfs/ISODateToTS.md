---
layout: udf
title:  ISODateToTS
date:   2012-10-22T13:23:21.000Z
library: DateLib
argString: "str"
author: James Edmunds
authorEmail: jamesedmunds@jamesedmunds.com
version: 2
cfVersion: CF5
shortDescription: Converts text string of ISO Date to datetime object; useful for parsing RSS and RDF.
description: |
 Takes a text string of an ISO date and converts it to a datetime object. This is useful when parsing an RDF or RSS feed that uses Dublin Core or otherwise uses ISO formatted dates. Strips the date time down to the hour and minute, omitting seconds (as some feeds do not use seconds). Please note that the tiem zone is ignored.

returnValue: Returns a datetime

example: |
 <cfoutput>
 <cfset s = "1994-11-05T08:15:30Z">
 s: #s#<br />
 ISODateToTS(): #ISODateToTS(s)#
 <hr />
 <cfset s = "1994-11-05T08:15:30+05:00">
 s: #s#<br />
 ISODateToTS(): #ISODateToTS(s)#
 <hr />
 <cfset s = "1994-11-05T08:30:30-08:30">
 s: #s#<br />
 ISODateToTS(): #ISODateToTS(s)#
 <hr />
 <cfset s = "1994-11-05T08:30:30-08:00">
 s: #s#<br />
 ISODateToTS(): #ISODateToTS(s)#
 <hr />
 </cfoutput>

args:
 - name: str
   desc: ISO datetime string to parse.
   req: true


javaDoc: |
 /**
  * Converts text string of ISO Date to datetime object; useful for parsing RSS and RDF.
  * * version 1.0 by James Edmunds
  * * version 2.0 by Adam Reynolds (added support for TZ offsets)
  * * version 2.1 by Adam Cameron (merged James's and AdamR's versions &amp; fixed bug with offsets that had a minute component to them)
  * 
  * @param str      ISO datetime string to parse. (Required)
  * @return Returns a datetime 
  * @author James Edmunds (jamesedmunds@jamesedmunds.com) 
  * @version 2, October 22, 2012 
  */

code: |
 function ISODateToTS(str) {
     // time formats have 2 ways of showing themselves: 1994-11-05T13:15:30Z UTC format OR 1994-11-05T08:15:30-05:00
     var initialDate        = parseDateTime(REReplace(arguments.str, "(\d{4})-?(\d{2})-?(\d{2})T([\d:]+).*", "\1-\2-\3 \4"));
     var timeModifier    = "";
     var multiplier        = 0;
 
     // If not in UTC format then we need to offset the time
     if (right(arguments.str, 1) neq "Z") {
         //Now we determine if we are adding or deleting the the time modifier.
         if (arguments.str contains '+' and listlen(listrest(arguments.str, "+"), ":") eq 2){
             timeModifier = listRest(arguments.str,"+");
             multiplier = 1; // Add
         } else if (listlen(listLast(arguments.str,"-"),":") eq 2) {
             timeModifier = listLast(arguments.str,"-");
             multiplier = -1; // Delete
         }
         if (len(timeModifier)){
             initialDate = dateAdd("h", val(listFirst(timeModifier, ":"))*multiplier, initialDate);
             initialDate =  dateAdd("n", val(listLast(timeModifier, ":"))*multiplier, initialDate);
         }
     }
     return initialDate;
 }

---

