---
layout: udf
title:  getQueryMetadata
date:   2010-05-30T22:07:30.000Z
library: DataManipulationLib
argString: "Query"
author: Marc Esher
authorEmail: marc.esher@gmail.com
version: 0
cfVersion: CF6
shortDescription: Replicates the CF7 getMetadata(query) functionality for MX6.1+
tagBased: true
description: |
 CF7 introduced the ability to run getMetadata() on a query, which returns an array of structures containing datatype information. This UDF replicates this functionality for CFMX6.1
 
 If run on CFMX7+, it uses CF's built-in function.

returnValue: Returns an array

example: |
 <cfquery datasource="mydsn" name="myquery">
 select * from mytable
 </cfquery>
 <cfdump var="#getQueryMetadata(myquery)#">

args:
 - name: Query
   desc: ColdFusion query object to return metadata for
   req: true


javaDoc: |
 <!---
  Replicates the CF7 getMetadata(query) functionality for MX6.1+
  
  @param Query      ColdFusion query object to return metadata for (Required)
  @return Returns an array 
  @author Marc Esher (marc.esher@gmail.com) 
  @version 0, May 30, 2010 
 --->

code: |
 <cffunction name="getQueryMetadata" access="public" returntype="array" hint="Replicates the CF7 getMetadata(query) functionality for MX6.1+">
         <cfargument name="query" type="query" required="true"/>
         <cfset var metadata = ArrayNew(1)>
         <cfset var columns = ArrayNew(1)>
         <cfset var col = 1>
         <cfset var map = StructNew()>
         <cfif listFirst(server.ColdFusion.ProductVersion) GT 6>
             <cfreturn getMetadata(arguments.query)>
         </cfif>
         
         <cfset columns = arguments.query.getMetaData().getColumnLabels() />
         
         <cfloop from="1" to="#ArrayLen(columns)#" index="col">
             <cfset map = StructNew()>
             <cfset map.name = columns[col]>
             <cfset map.IsCaseSensitive = arguments.query.getMetaData().isCaseSensitive( javacast("int",col))>
             <cfset map.TypeName = arguments.query.getMetadata().getColumnTypeName(javacast("int",col))>
             <cfset ArrayAppend(metadata,map)>
         </cfloop>
         
         <cfreturn metadata>
     </cffunction>

oldId: 1937
---

