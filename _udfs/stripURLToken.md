---
layout: udf
title:  stripURLToken
date:   2009-02-24T03:02:26.000Z
library: StrLib
argString: "x"
author: David Grant
authorEmail: x@seizethedave.com
version: 1
cfVersion: CF5
shortDescription: Strips the cfid/cftoken information from a string.
tagBased: false
description: |
 Supply a string and the string is returned with the URL token removed (cfid=2322&amp;cftoken=1243934978).  ? or &amp; is accounted for, as well as any combination of upper/lower case text.
 
 Useful when you just want the URL and simple parameters, excluding session information.
 
 Updated: Jason Bartholme 
 added jsession variables

returnValue: Returns a string.

example: |
 <cfscript>
 thisAddress = cgi.script_name & "?" & cgi.query_string;
 thisAddress = stripURLToken(variables.thisAddress);
 </cfscript>
 
 <!--- session info will be stripped off --->
 <cfoutput>#variables.thisAddress#</cfoutput>

args:
 - name: x
   desc: String to modify.
   req: true


javaDoc: |
 /**
  * Strips the cfid/cftoken information from a string.
  * Updated: Jason Bartholme
  * added jsession variables
  * 
  * @param x      String to modify. (Required)
  * @return Returns a string. 
  * @author David Grant (x@seizethedave.com) 
  * @version 1, February 23, 2009 
  */

code: |
 function stripURLToken (x) {
 return REReplace(x, "(\?|&)([Cc][Ff][Ii][Dd]|[Cc][Ff][Tt][Oo][Kk][Ee][Nn]|[Jj][Ss][Ee][Ss][Ss][Ii][Oo][Nn][Ii][Dd])=[\s\S]+", "", "ALL");
 }

---

