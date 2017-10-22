---
layout: udf
title:  exportSQLTable
date:   2006-04-18T17:29:11.000Z
library: DatabaseLib
argString: "table, dbsource[, dbuser][, dbpassword][, commitAfter]"
author: Asif Rashid
authorEmail: asifrasheed@rocketmail.com
version: 2
cfVersion: CF7
shortDescription: Export table data in script format (INSERT statements).
tagBased: true
description: |
 This UDF will export any sql table data into script format. Where every row of data will covert into SQL INSERT statement. User can also specify the commit statement after x number of statements.

returnValue: Returns a string.

example: |
 <cfset s = exportSQLTable("tbllibraries", "cflib")>
 <cfoutput>
 <pre>
 #s#
 </pre>
 </cfoutput>

args:
 - name: table
   desc: Table to export.
   req: true
 - name: dbsource
   desc: DSN.
   req: true
 - name: dbuser
   desc: Database username.
   req: false
 - name: dbpassword
   desc: Database password.
   req: false
 - name: commitAfter
   desc: Inserts commit statements after a certain number of rows. Defaults to 100.
   req: false


javaDoc: |
 <!---
  Export table data in script format (INSERT statements).
  Modified by Raymond
  v2 by Joseph Flanigan (joseph@switch-box.org)
  
  @param table      Table to export. (Required)
  @param dbsource      DSN. (Required)
  @param dbuser      Database username. (Optional)
  @param dbpassword      Database password. (Optional)
  @param commitAfter      Inserts commit statements after a certain number of rows. Defaults to 100. (Optional)
  @return Returns a string. 
  @author Asif Rashid (asifrasheed@rocketmail.com) 
  @version 2, April 18, 2006 
 --->

code: |
 <cffunction name="exportSQLTable" returnType="string" output="false">
         <cfargument name="table" type="string" required="true">
         <cfargument name="dbsource" type="string" required="true">
         <cfargument name="dbuser" type="string" required="false" default="">
         <cfargument name="dbpassword" type="string" required="false" default="">
         <cfargument name="commitAfter" default="100" type="numeric">
 
         <cfset var i = 1>
         <cfset var j = 1>
         <cfset var k = 0>
         <cfset var temp = "">
         <cfset var qryTemp = "">
         <cfset var tempCol = "">
         <cfset var str = "">
         <cfset var textstr = "">
 
         <!--- Getting table data --->
         <cfquery name="qryTemp" datasource="#arguments.dbsource#" username= "#arguments.dbuser#" password="#arguments.dbpassword#">
                 select * from #arguments.table#
         </cfquery>
 
         <!--- Getting meta information of executed query --->
         <cfset tempCol = getMetaData(qryTemp)>
         <cfset k =      ArrayLen(tempCol) >
 
         <cfloop query="qryTemp">
                 <cfset temp = "INSERT INTO " & arguments.table &" (">
                 <cfloop index="j" from="1" to="#k#">
                         <cfset temp = temp & "[#tempCol[j].Name#]" >
                  <cfif j NEQ k >
                         <cfset temp = temp & "," >
                  </cfif>
                 </cfloop>
 
 
                 <cfset temp = temp & ") VALUES (">
                 <cfloop index="j" from="1" to="#k#">
                         <cfif FindNoCase("char", tempCol[j].TypeName)
                               OR FindNoCase("date", tempCol[j].TypeName)
                                   OR FindNoCase("text", tempCol[j].TypeName)
                                   OR FindNoCase("unique", tempCol[j].TypeName)
                                   OR FindNoCase("xml", tempCol[j].TypeName)
                                    >
                                 <cfset textstr = qryTemp[tempCol[j].Name][i] >
                                 <cfif Find("'",textstr)>
                                   <cfset textstr = Replace(textstr,"'","'","ALL") >
                                 </cfif>
                                 <cfset temp = temp & "'" & textstr & "'" >
                         <cfelseif FindNoCase("image",tempCol[j].TypeName)>
                                  <cfset temp = temp & "'" >
                         <cfelse>
                                 <cfset temp = temp & qryTemp[#tempCol[j].Name#][i] >
                         </cfif>
                   <cfif j NEQ k >
                         <cfset temp = temp  &  "," >
                  </cfif>
 
                 </cfloop>
                 <cfset temp = temp & ");">
                 <cfset str = str & temp & chr(10)>
                 <cfif i mod commitAfter EQ 0>
                         <cfset str = str & "commit;" & chr(10)>
                 </cfif>
                 <cfset i = i + 1>
         </cfloop>
         <cfreturn str>
 </cffunction>

---

