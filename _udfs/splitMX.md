---
layout: udf
title:  splitMX
date:   2009-01-07T00:12:35.000Z
library: StrLib
argString: "list, delimiters"
author: Larry C. Lyons
authorEmail: larryclyons@gmail.com
version: 0
cfVersion: CF6
shortDescription: splitMX converts a string or a list to an array using another string, or a multiple characters as a delimiter/
tagBased: true
description: |
 Unfortunately CF's listToArray function does not allow the use of another string or multiple characters as delimiters. However internally CF treats strings as java.lang.String objects. This allows you to use the split() method to create an array from a list using multiple characters as the delimiters. The splitMX function provides a wrapper for the java split() method. I've tested the code on CFMX 7 but it should work with any CF engine based on J2EE from CFMX 6 on, BlueDragon, Open BlueDragon and Railo.

returnValue: Returns an array.

example: |
 <!--- set up the test list--->
 <cfset variables.testList = "George, this is a multiple item delimiter, Tom, this is a multiple item delimiter, Dick, this is a multiple item delimiter, Harry" />
 
 <!--- set up the multiple character delimiter --->
 <cfset variables.delims = ", this is a multiple item delimiter, " />
 
 <!--- use the splitMX function --->
 <cfset variables.splitThisList = splitMX(variables.testList,variables.delims) />
 
 <!--- reset dump variable in request scope, then dump the results --->
 <cfset request.cfdumpinited = false />
 <cfdump expand="true" label="splitThisList" var="#variables.splitThisList#" />
 <cfabort />

args:
 - name: list
   desc: String to parse.
   req: true
 - name: delimiters
   desc: A string to act as the splitter for the result.
   req: true


javaDoc: |
 <!---
  splitMX converts a string or a list to an array using another string, or a multiple characters as a delimiter/
  
  @param list      String to parse. (Required)
  @param delimiters      A string to act as the splitter for the result. (Required)
  @return Returns an array. 
  @author Larry C. Lyons (larryclyons@gmail.com) 
  @version 0, January 6, 2009 
 --->

code: |
 <cffunction name="splitMX" output="false" access="public" returntype="array" hint="I use the java.lang.String object split method to convert a list to an array">
     <cfargument name="list" type="string" required="true" displayname="list" hint="I am the list to be converted to an array" />
     <cfargument name="delimiters" type="string" required="true" displayname="delimiters" hint="I contain the delimiters separating the list items" />
     <cfset var results = arrayNew(1) />
     <!--- if there are no delimiters return a single item array otherwise use .split() to convert the list to an array --->
     <cfif len(arguments.delimiters)>
         <cfset results = arguments.list.split(arguments.delimiters) />
     <cfelse>
         <cfset arrayAppend(results,arguments.list) />
     </cfif>
     <cfreturn results />
 </cffunction>

---

