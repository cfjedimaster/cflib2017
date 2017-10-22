---
layout: udf
title:  duplicateDB
date:   2011-02-21T13:20:27.000Z
library: DataManipulationLib
argString: "datasource, source, target[, copyData]"
author: Steve Good
authorEmail: steve@stevegood.org
version: 1
cfVersion: CF8
shortDescription: Duplicates small to medium MySQL databases.
tagBased: true
description: |
 This function will duplicate any small to medium sized MySQL databases on the same DB server. I strongly discourage using this on large DBs! You can dupe schema only or schema + data.

returnValue: Returns nothing.

example: |
 <!--- Duplicate schema only --->
 <cfset duplicateDB(application.dsn,"old_db","new_db") />
 
 <!--- Duplicate schema AND data --->
 <cfset duplicateDB(application.dsn,"old_db","new_db",true) />

args:
 - name: datasource
   desc: DSN
   req: true
 - name: source
   desc: Source for duplication.
   req: true
 - name: target
   desc: Target for duplication.
   req: true
 - name: copyData
   desc: Boolean that determines if data along with structure. Defaults to false.
   req: false


javaDoc: |
 <!---
  Duplicates small to medium MySQL databases.
  
  @param datasource      DSN (Required)
  @param source      Source for duplication. (Required)
  @param target      Target for duplication. (Required)
  @param copyData      Boolean that determines if data along with structure. Defaults to false. (Optional)
  @return Returns nothing. 
  @author Steve Good (steve@stevegood.org) 
  @version 1, February 21, 2011 
 --->

code: |
 <cffunction name="duplicateDB" access="public" returntype="void" output="false" hint="I duplicate a MySQL database locally on the same server.">
     <cfargument name="datasource" type="string" required="true" />
     <cfargument name="source" type="string" required="true" />
     <cfargument name="target" type="string" required="true" />
     <cfargument name="copyData" type="boolean" required="false" default="false" />
     
     <cfquery datasource="#arguments.datasource#">
     CREATE DATABASE  IF NOT EXISTS #arguments.target#;
     </cfquery>
     
     <cfdbinfo datasource="#arguments.datasource#" name="local.tbls" type="tables" />
     
     <cfloop query="local.tbls">
         <cfquery datasource="#arguments.datasource#">
         CREATE TABLE #arguments.target#.#table_name# LIKE #arguments.source#.#table_name#;
         </cfquery>
         
         <cfif arguments.copydata>
             <cfquery datasource="#arguments.datasource#">
             INSERT INTO #arguments.target#.#table_name# SELECT * FROM #arguments.source#.#table_name#;
             </cfquery>
         </cfif>
     </cfloop>
 </cffunction>

---

