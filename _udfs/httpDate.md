---
layout: udf
title:  httpDate
date:   2004-01-02T17:07:53.000Z
library: StrLib
argString: "[theDate]"
author: Massimo Foti
authorEmail: massimo@massimocorner.com
version: 1
cfVersion: CF6
shortDescription: Format a date as required by HTTP specifications
tagBased: true
description: |
 The HTTP specifications requires a very specific format for dates, this is very important if you want to manipulate HTTP headers using the &lt;cfheader&gt; tag

returnValue: Returns a string.

example: |
 <cfoutput>#httpDate(CreateDate('1969', '8', '9'))#</cfoutput>

args:
 - name: theDate
   desc: A date to format. Defaults to Now().
   req: false


javaDoc: |
 <!---
  Format a date as required by HTTP specifications
  
  @param theDate      A date to format. Defaults to Now(). (Optional)
  @return Returns a string. 
  @author Massimo Foti (massimo@massimocorner.com) 
  @version 1, January 2, 2004 
 --->

code: |
 <cffunction name="httpDate" output="true" returntype="numeric" hint="Format a date as required by HTTP specifications">
     <cfargument name="theDate" type="date" required="false" default="#Now()#" hint="Date to format, default to Now()">
     <cfset var returnDate="#DateFormat(arguments.theDate, 'ddd, dd mmm yyyy')# #TimeFormat(arguments.theDate, 'HH:mm:ss')# GMT">
     <cfreturn returnDate>
 </cffunction>

---

