---
layout: udf
title:  ThisOrThat
date:   2003-04-29T11:51:19.000Z
library: StrLib
argString: "thisValue[, defaultValue]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Returns default value if primary value is empty.
description: |
 A shorthand way of specifying a default value to be returned if the primary value is empty (or contains only spaces). Handy for a variety of if-then uses.

returnValue: Returns a string.

example: |
 <cfset form.username1 = "Mickey Mouse">
 <cfset form.username2 = "">
 <cfset sql_aggregated_hours1 = 10>
 <cfset sql_aggregated_hours2 = "">
 
 <cfoutput>
 Entered username 1:<br>
 #ThisOrThat(form.username1, "(unknown user)")#<br>
 <br>
 Entered username 2:<br>
 #ThisOrThat(form.username2, "(unknown user)")#<br>
 <br>
 SQL aggregated hours 1:<br>
 #ThisOrThat(sql_aggregated_hours1, "0")#<br>
 <br>
 SQL aggregated hours 2:<br>
 #ThisOrThat(sql_aggregated_hours2, "0")#<br>
 <br>
 <br>
 </cfoutput>
 
 A fault-tolerant "Go back" link (only relies on Javascript if a security precaution has prevented the return of the HTTP_REFERER):<br>
 <a href="<cfoutput>#ThisOrThat(cgi.HTTP_REFERER, "javascript: history.go(-1)")#</cfoutput>">Go back</a>

args:
 - name: thisValue
   desc: Value to check.
   req: true
 - name: defaultValue
   desc: Value to use if thisValue is empty. Defaults to a non-breaking space.
   req: false


javaDoc: |
 /**
  * Returns default value if primary value is empty.
  * Based on ValueOrSpace by David Grant (david@insite.net)
  * 
  * @param thisValue      Value to check. (Required)
  * @param defaultValue      Value to use if thisValue is empty. Defaults to a non-breaking space. (Optional)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, April 29, 2003 
  */

code: |
 function ThisOrThat(thisValue) {
     var defaultValue = "&nbsp;";
     if(arrayLen(arguments) gte 2) defaultValue = arguments[2];
     if (Len(Trim(thisValue)) LT 1) return defaultValue;
     return thisValue;
 }

---

