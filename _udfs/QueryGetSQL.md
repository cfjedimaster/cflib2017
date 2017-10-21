---
layout: udf
title:  QueryGetSQL
date:   2002-10-15T13:06:45.000Z
library: DatabaseLib
argString: "queryname"
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF6
shortDescription: Returns the SQL statement used to generate the specified query.
description: |
 Returns the SQL statement used to generate the specified query.  Uses the coldfusion.server.ServiceFactory object used by the ColdFusion debugging service.

returnValue: Returns a string.

example: |
 <!---
 <CFQUERY NAME="GetUDFCount" DATASOURCE="#Request.App.DSN#">
   SELECT Count(*) as UDFCount
   FROM tblUDFs
 </CFQUERY>
 
 <P>
 <CFOUTPUT>
 #QueryGetSQL("GetUDFCount")#
 </CFOUTPUT>
 Example disabled since debugging is not turned on this server.
 --->

args:
 - name: queryname
   desc: Name of the query you wish to return the SQL statement for.
   req: true


javaDoc: |
 <!---
  Returns the SQL statement used to generate the specified query.
  
  @param queryname      Name of the query you wish to return the SQL statement for. (Required)
  @return Returns a string. 
  @author Ben Forta (ben@forta.com) 
  @version 1, October 15, 2002 
 --->

code: |
 <CFFUNCTION NAME="QueryGetSQL" RETURNTYPE="string">
 
     <!--- Query name is required --->
     <CFARGUMENT NAME="queryname" TYPE="string" REQUIRED="yes">
 
         <!--- Initialize variables --->
         <CFSET var cfdebugger="">
         <CFSET var events ="">
         
     <!--- Initialize result string --->
     <CFSET var result="">
 
     <!--- Requires debug mode --->
     <CFIF IsDebugMode()>
 
         <!--- Use debugging service --->
         <CFOBJECT ACTION="CREATE"
                   TYPE="JAVA"
 
 CLASS="coldfusion.server.ServiceFactory"
                   NAME="factory">
         <CFSET cfdebugger=factory.getDebuggingService()>
 
         <!--- Load the debugging service's event table --->
         <CFSET events = cfdebugger.getDebugger().getData()>
 
         <!--- Get SQL statement (body) for specified query --->
         <CFQUERY DBTYPE="query" NAME="getquery" DEBUG="false">
         SELECT body
         FROM events
         WHERE type='SqlQuery' AND name='#queryname#'
         </CFQUERY>
 
         <!--- Save result --->
         <CFSET result=getquery.body>
     </CFIF>
 
     <!--- Return string --->
     <CFRETURN result>
 </CFFUNCTION>

---

