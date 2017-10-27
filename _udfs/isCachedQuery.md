---
layout: udf
title:  isCachedQuery
date:   2005-02-11T23:32:47.000Z
library: DataManipulationLib
argString: "queryname"
author: Qasim Rasheed
authorEmail: qasimrasheed@hotmail.com
version: 1
cfVersion: CF6
shortDescription: Return true if the queryname passed was a cached query.
tagBased: true
description: |
 This UDF make use of service Factory to check wehther the queryname passed was run as a cached query.

returnValue: Returns a boolean.

example: |
 <cfquery name="test" cachedwithin="#createtimespan(0,0,1,0)#">
 your query...
 </cfquery>
 
 <cfset isCached = isCachedQuery( 'test' )>

args:
 - name: queryname
   desc: Name of query to check.
   req: true


javaDoc: |
 <!---
  Return true if the queryname passed was a cached query.
  
  @param queryname      Name of query to check. (Required)
  @return Returns a boolean. 
  @author Qasim Rasheed (qasimrasheed@hotmail.com) 
  @version 1, February 11, 2005 
 --->

code: |
 <cffunction name="isCachedQuery" returntype="boolean" output="false">
     <cfargument name="queryname" required="true" type="string" />
     
     <cfset var events = "">
     <cfset var result = false>    
     <cfset var temp = "">
     
     <cfif isdebugmode()>
         <cfset events = createobject('java','coldfusion.server.ServiceFactory').getDebuggingService().getDebugger().getData()>
         <cfquery name="temp" dbtype="query">
             select    cachedquery
             from    events
             WHERE     type='SqlQuery' 
                     and name='#arguments.queryname#'
         </cfquery>
         <cfset result = yesnoformat(temp.cachedquery)>
     </cfif>
 
     <cfreturn result />
 </cffunction>

oldId: 1202
---

