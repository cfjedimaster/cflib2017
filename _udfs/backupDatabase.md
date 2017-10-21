---
layout: udf
title:  backupDatabase
date:   2013-01-08T21:03:16.000Z
library: DatabaseLib
argString: "dbsource"
author: Darwan Leonardo Sitepu
authorEmail: dlns2001@yahoo.com
version: 1
cfVersion: CF8
shortDescription: Backs up a database to a zip file.
description: |
 Backs up a database to a zip file.

returnValue: Returns a string.

example: |
 <cfoutput>
 <cfsetting showdebugoutput="no">
 #BackupDatabase("darwanlns.com")#
 </cfoutput>

args:
 - name: dbsource
   desc: DNS.
   req: true


javaDoc: |
 <!---
  Backs up a database to a zip file.
  
  @param dbsource      DNS. (Required)
  @return Returns a string. 
  @author Darwan Leonardo Sitepu (dlns2001@yahoo.com) 
  @version 1, January 8, 2013 
 --->

code: |
 <cffunction name="backupDatabase" returnType="string" output="false">
     <cfargument name="dbsource" type="string" required="true">
     <cftry>
         <cfdbinfo datasource="#arguments.dbsource#" name="tables" type="tables" />
         <cfsilent>
             <cfset data = StructNew() />
             <cfloop query="tables">  <!--- grab all data from table --->  
                 <cftry>
                     <cfset data[Table_Name] = StructNew() />  
                     <cfdbinfo datasource="#datasource#" table="#Table_Name#" name="qryTableFields" type="columns" />  
                     <cfset data[Table_Name].schema = qryTableFields />  
                     <cfquery name="getData" datasource="#datasource#" debug="no" cachedwithin=#CreateTimeSpan(0,0,0,10)# >SELECT * FROM [#Table_Name#]</cfquery>    
                     <cfset data[Table_Name].data = getData />            
                 <cfcatch></cfcatch>
                 </cftry>
             </cfloop><!--- Now serialize into one ginormous string --->
         </cfsilent>
         <cfwddx action="cfml2wddx" input="#data#" output="packet" /><!--- file to store zip --->
         <cfset zfile = expandPath("./data.zip") /><!--- Now zip this baby up --->
         <cfzip action="zip" file="#zfile#" overwrite="true"><cfzipparam content="#packet#" entrypath="data.packet.xml" /></cfzip>
         <cfreturn "I retrieved #tables.recordCount# tables from datasource #datasource# and saved it to #zfile#.">
     <cfcatch>
         <cfreturn "Backup Database Is Failed..">
     </cfcatch>
     </cftry>
 </cffunction>

---

