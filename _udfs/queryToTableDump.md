---
layout: udf
title:  queryToTableDump
date:   2011-06-10T03:01:55.000Z
library: UtilityLib
argString: "queryData"
author: Jared Rypka-Hauer
authorEmail: jared@web-relevant.com
version: 2
cfVersion: CF8
shortDescription: Simple table-based datadump from any query
tagBased: true
description: |
 This UDF takes a query as an argument and dumps out the contents of the query in a table, columns in TH tags and data in TD tags, for the simple purpose of examining the data in a page.
 
 Not intended for production use, it's handy for the beginning stages of laying out a page based on someone else's query or dumping the contents of a cfdirectory or cfpop call in situations where significant formatting is not necessary.

returnValue: Returns a string.

example: |
 <cfdirectory action="list" directory="#expandPath('.')#" name="dirList" />
 <cfoutput>#queryToTableDump(dirList)#</cfoutput>

args:
 - name: queryData
   desc: Query to display.
   req: true


javaDoc: |
 <!---
  Simple table-based datadump from any query
  
  @param queryData      Query to display. (Required)
  @return Returns a string. 
  @author Jared Rypka-Hauer (jared@web-relevant.com) 
  @version 2, June 9, 2011 
 --->

code: |
 <cffunction name="queryToTableDump" access="public" returntype="string" output="false">
     <cfargument name="queryData" type="query" required="true" />
     <cfset var theQuery = arguments.queryData>
     <cfset var columns = arraytolist(theQuery.getMeta().getColumnLabels())>
     <cfset var theResults = "">
     <cfset var c = "">
     <cfset var i = "">
     <cfsavecontent variable="theResults">
         <cfoutput>
             <table border="1" cellpadding="0" cellspacing="0" align="left">
             <tr>
             <cfloop list="#columns#" index="c">
                 <th>#c#</th>
             </cfloop>
             </tr>
             <cfloop from="1" to="#theQuery.recordCount#" index="i">
                 <tr><cfloop list="#columns#" index="c">
                     <td><cfif len(theQuery[c][i])>#theQuery[c][i]#<cfelse> </cfif></td></cfloop>
                 </tr>
             </cfloop>
             </table>
         </cfoutput>
     </cfsavecontent>
     <cfreturn theResults />
 </cffunction>

oldId: 1333
---

