---
layout: udf
title:  cfStoredProcSearch
date:   2007-11-14T12:58:27.000Z
library: DatabaseLib
argString: "datasource, searchstring"
author: Jose Diaz
authorEmail: bleachedbug@gmail.com
version: 1
cfVersion: CF6
shortDescription: Search SQL Server Stored Procedures for a value.
tagBased: true
description: |
 Returns a list of stored procedures containing the string supplied.

returnValue: Returns a query of stored procedure names that match.

example: |
 <cfinclude template="cfStoredProcSearch.cfm">
 
 <cfset qresult = cfStoredProcSearch("Your_Datasource_Name","String_TO_Search")>
 
 <cfoutput query="qResult">
     <font face="verdana" size="2">#qresult.name#</font><br/><br/>
 </cfoutput>

args:
 - name: datasource
   desc: Database to search.
   req: true
 - name: searchstring
   desc: Name to search for.
   req: true


javaDoc: |
 <!---
  Search SQL Server Stored Procedures for a value.
  
  @param datasource      Database to search. (Required)
  @param searchstring      Name to search for. (Required)
  @return Returns a query of stored procedure names that match. 
  @author Jose Diaz (bleachedbug@gmail.com) 
  @version 1, November 14, 2007 
 --->

code: |
 <cffunction name="cfStoredProcSearch" access="public" returntype="query" output=false>
 
     <cfargument name="datasource" type="string" required="true"/>
     <cfargument name="searchString" type="string" required="true"/>
     <cfset var qStoredProcSearch = "">
 
     <cfquery name="qStoredProcSearch" datasource="#arguments.datasource#">
         select name
         from sysobjects s
            , syscomments c
         where s.id = c.id and text like '%#arguments.searchString#%'
     </cfquery>
 
 
     <cfreturn qStoredProcSearch />
 
 </cffunction>

oldId: 1657
---

