---
layout: udf
title:  findList
date:   2008-09-15T15:45:25.000Z
library: StrLib
argString: "valueList, stringtocompare[, start][, delim]"
author: Charlie Arehart
authorEmail: charlie@carehart.org
version: 0
cfVersion: CF6
shortDescription: Finds within a given string the location of the first occurrence of any element in a list.
tagBased: true
description: |
 While ListFind and ListContains look for a string (or subset) within a list, FindList does the opposite, finding if any of several items in a list occur within a string. It returns the location of the first one found. This is great for testing if any of several items appear within a given string.

returnValue: The position of first found list element in string; or 0, if no list elements are in string.

example: |
 <cfset testvals="badurl1.com,www.badurl2.org,http://www.badurl3.net">
 
 <cfset teststring="I have www.badurl2.org in here.">
 <cfif findlist(testvals,teststring)>
     Found element from bad list.<br>
 </cfif>
 
 <cfset teststring="I have a badurl4.com in here.">
 <cfif not findlist(testvals,teststring)>
     Did not find any elements from bad list.<br>
 </cfif>
 
 <cfset teststring="I have a www.badurl2.org in here.">
 <cfset findloc = findlist(testvals,teststring)>
 <cfif findloc>
     Found element from bad list at position <cfoutput>#findloc# of "#teststring#"</cfoutput>.<br>
 </cfif>
 
 <cfset teststring="I have a www.badurl2.org in here.">
 <cfset start=11>
 <cfset findloc = findlist(testvals,teststring,start)>
 <cfif findloc>
     Found element from bad list at position <cfoutput>#findloc# of "#teststring#"</cfoutput>.<br>
 <cfelse>
     Did not find element from bad list in <cfoutput>"#teststring#" starting at position #start#</cfoutput>.<br>
 </cfif>
 
 <cfset teststring="I have a www.badurl2.org in here.">
 <cfset start=10>
 <cfset findloc = findlist(testvals,teststring,start)>
 <cfif findloc>
     Found element from bad list at position <cfoutput>#findloc# of "#teststring#"</cfoutput>.<br>
 <cfelse>
     Did not find element from bad list in <cfoutput>"#teststring#" starting at position #start#</cfoutput>.<br>
 </cfif>

args:
 - name: valueList
   desc: List of values to check for.
   req: true
 - name: stringtocompare
   desc: String to be searched.
   req: true
 - name: start
   desc: Optional starting position. Defaults to 1. 
   req: false
 - name: delim
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 <!---
  Finds within a given string the location of the first occurrence of any element in a list.
  
  @param valueList      List of values to check for. (Required)
  @param stringtocompare      String to be searched. (Required)
  @param start      Optional starting position. Defaults to 1.  (Optional)
  @param delim      List delimiter. Defaults to a comma. (Optional)
  @return The position of first found list element in string; or 0, if no list elements are in string. 
  @author Charlie Arehart (charlie@carehart.org) 
  @version 0, September 15, 2008 
 --->

code: |
 <cffunction name="findList" returnType="numeric" output="false">
     <cfargument name="valuelist" required="Yes" type="string">
     <cfargument name="stringtocompare" required="Yes" type="string">
     <cfargument name="start" required="No" type="numeric" default="0">
     <cfargument name="delim" required="no" type="string" default=",">
     <cfset var test=arrayNew(1)>
     <cfset var x = "">
 
 
     <cfloop list="#arguments.valuelist#" index="x" delimiters="#arguments.delim#">
         <cfset ArrayAppend(test,findnocase(x,arguments.stringtocompare, arguments.start)) />
     </cfloop>
 
     <cfreturn arrayMin(test) />
 </cffunction>

---

