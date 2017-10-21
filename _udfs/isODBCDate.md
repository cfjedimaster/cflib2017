---
layout: udf
title:  isODBCDate
date:   2012-07-24T23:19:09.000Z
library: CFMLLib
argString: "str"
author: Paul Klinkenberg
authorEmail: pauL@ongevraagdadvies.nl
version: 1
cfVersion: CF9
shortDescription: Checks if a string is an ODBC formatted date, time, or timestamp
description: |
 The function checks if a string is an ODBC formatted date, time, or timestamp; returns a boolean.
 Checks for validity of the time and date, between the year 1000 and 3999.

returnValue: True if the string is a correctly-formatted ODBC date string, otherwise false

example: |
 <cfoutput><pre>
     <cfset s = "{d '2012-02-28'}">
     isODBCDate("#s#") = #isODBCDate(s)#<br />
     <cfset s = "{d '2012-02-31'}">
     isODBCDate("#s#") = #isODBCDate(s)#<br />
     <cfset s = "{d '2012-02-31'}">
     isODBCDate("#s#") = #isODBCDate(s)#<br />
     <cfset s = "{d '2012-19-39'}">
     isODBCDate("#s#") = #isODBCDate(s)#<br />
 </pre></cfoutput>

args:
 - name: str
   desc: The string to validate
   req: true


javaDoc: |
 <!---
  Checks if a string is an ODBC formatted date, time, or timestamp
  version 0.1 by Paul Klinkenberg
  version 1.0 by Adam Cameron - adding date validation so it will fail invalid dates such as Feb 31.
  
  @param str      The string to validate (Required)
  @return True if the string is a correctly-formatted ODBC date string, otherwise false 
  @author Paul Klinkenberg (pauL@ongevraagdadvies.nl) 
  @version 1, July 24, 2012 
 --->

code: |
 <cffunction name="isODBCDate" access="public" returntype="boolean" output="false">
     <cfargument name="str" required="yes" type="string">
     <cfscript>
         // test the format
         if (!(len(str) gt 10 and refindNoCase("^\{(d|t|ts) \'([1-3][0-9]{3}\-[0-1][0-9]\-[0-3][0-9] ?)?([0-2][0-9]:[0-5][0-9]:[0-5][0-9])?\'\}$", str))){
             return false;
         }
         // test that it's actually a valid date (ie: not 31 Feb, etc)
         try {
             parseDateTime(str);
             return true;
         }
         catch (any e){
             return false;
         }
     </cfscript>
 </cffunction>

---

