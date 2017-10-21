---
layout: udf
title:  convertQueryStringToStruct
date:   2013-12-27T16:04:26.000Z
library: DataManipulationLib
argString: "querystring"
author: Chris Weller
authorEmail: wellercs@gmail.com
version: 1
cfVersion: CF8
shortDescription: Converts a URL query string to a struct
description: |
 This function accepts a URL query string argument and returns it as a structure.

returnValue: A struct of query string name/value pairs

example: |
 <cfdump var="#convertQueryStringToStruct(querystring=cgi.query_string)#">

args:
 - name: querystring
   desc: Query string to convert
   req: true


javaDoc: |
 <!---
  Converts a URL query string to a struct
  v1.0 by Chris Weller
  v1.1 by Adam Cameron (removing redundant intermediary variables)
  
  @param querystring      Query string to convert (Required)
  @return A struct of query string name/value pairs 
  @author Chris Weller (wellercs@gmail.com) 
  @version 1, December 27, 2013 
 --->

code: |
 <cffunction name="convertQueryStringToStruct" access="public" returntype="struct" output="false" hint="I accept a URL query string and return it as a structure.">
     <cfargument name="querystring" type="string" required="true" hint="I am the query string for which to parse.">
 
     <cfreturn createObject('java', 'coldfusion.util.HTMLTools').parseQueryString(arguments.querystring)>
 </cffunction>

---

