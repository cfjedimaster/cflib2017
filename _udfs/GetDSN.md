---
layout: udf
title:  GetDSN
date:   2004-01-06T19:09:52.000Z
library: UtilityLib
argString: "dsn"
author: Martin Parry
authorEmail: martin.parry@beetrootstreet.com
version: 1
cfVersion: CF6
shortDescription: Gets the configuration of an existing datasource.
description: |
 Gets the configuration of an existing datasource.

returnValue: Returns a structure.

example: |
 <cfset dsStructure = getDSN("mydatasource")>
 <cfdump var="#dsStructure#">

args:
 - name: dsn
   desc: The name of the datasource.
   req: true


javaDoc: |
 <!---
  Gets the configuration of an existing datasource.
  
  @param dsn      The name of the datasource. (Required)
  @return Returns a structure. 
  @author Martin Parry (martin.parry@beetrootstreet.com) 
  @version 1, January 6, 2004 
 --->

code: |
 <cffunction name="getdsn" returntype="struct" output="false">
     <cfargument name="dsn" type="string" required="yes">
 
     <!--- initialize variables --->
     <cfset var dsservice = "">
 
     <!--- get "factory" --->
     <cfobject action="create"
              type="java"
              class="coldfusion.server.ServiceFactory"
              name="factory">
 
     <!--- get datasource service --->
     <cfset dsservice = factory.getdatasourceservice()>
 
     <cfif not structKeyExists(dsservice.datasources,dsn)>
         <cfthrow message="#dsn# is not a registered datasource.">
     </cfif>
     
     <!--- get dsn --->
     <cfreturn duplicate(dsservice.datasources[dsn])>
 
 </cffunction>

---

