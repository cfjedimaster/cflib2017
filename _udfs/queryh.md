---
layout: udf
title:  queryh
date:   2011-05-02T01:57:37.000Z
library: DataManipulationLib
argString: "query"
author: Kalyan Dhar
authorEmail: kalyan.cse.jis@gmail.com
version: 2
cfVersion: CF7
shortDescription: Returns a query with any string values sanitized by HTMLEditFormat.
tagBased: true
description: |
 Returns a query with any string values sanitized by HTMLEditFormat. Values of the type varchar,char,nvarchar,text,ntext are modified.

returnValue: Returns a query.

example: |
 Suppose you have some html tag in Groupname or in groupDEsc
 Then you can do this 
 
 <cfquery name="groupList" datasource="TestDSN">
     select 
         ID, 
         GroupTypeID, 
         GroupName, 
         GroupDesc
     from
         groups
     where
         tiRecordStatus = 1
 </cfquery>
 <!---Now call queryh() function to escape html tag--->
 <cfset groupList = queryh(groupList) />
 
 This function will automaticaly took those column where tag can be inserted.
 then escape those tags

args:
 - name: query
   desc: Query to modify.
   req: true


javaDoc: |
 <!---
  Returns a query with any string values sanitized by HTMLEditFormat.
  v2 modified by Raymond Camden
  
  @param query      Query to modify. (Required)
  @return Returns a query. 
  @author Kalyan Dhar (kalyan.cse.jis@gmail.com) 
  @version 2, May 1, 2011 
 --->

code: |
 <cffunction name="queryh" returnType="query" description="returns query after senitize descriptive fields">
     <cfargument name="query" type="query" required="true">
 
     <cfset var list = "" />
     <cfset var listSelect = "varchar,char,nvarchar,text,ntext" />
     <cfset var column = "">
     <cfset var metadata = "">
     <cfset var type = "">
     
     <cfloop list="#query.ColumnList#" index="column">
         <cfscript>
         metadata = query.getMetaData();
         type = metadata.getColumnTypeName(query.findColumn(column));
         </cfscript>
 
         <cfif listFindNoCase(listSelect,type)>
             <cfset list = listAppend(list,column)>
         </cfif>
     </cfloop>
     
     <cfif listLen(list)>
         <cfloop query="query">
             <cfloop list="#list#" index="column">
                 <cfset querySetCell(query, column, htmlEditFormat(query[column][currentRow]),currentRow)>
             </cfloop>
         </cfloop>
     </cfif>
 
     <cfreturn query />
 </cffunction>

---

