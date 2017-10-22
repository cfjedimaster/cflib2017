---
layout: udf
title:  convertDotNetDataset
date:   2007-05-17T12:14:18.000Z
library: DataManipulationLib
argString: "dataset"
author: Anthony Petruzzi
authorEmail: tonyp@rolist.com
version: 1
cfVersion: CF7
shortDescription: Takes a .Net dataset and converts it to a CF structure of queries.
tagBased: true
description: |
 Originally written by Joe Reinhart, so give him the credit. I just found this function useful and fixed a bug so it could be submitted.
 
 It will take a .Net Dataset and convert it to a CF structure of queries.

returnValue: Returns a structure.

example: |
 <cfinvoke webservice="http://www.example.com/query.asmx?WSDL" method="NameSearch" returnvariable="data">
     <cfinvokeargument name="LastName" value="xxxx"/>
     <cfinvokeargument name="FirstName" value="xxxx"/>
     <cfinvokeargument name="MidName" value="xxxx"/>
 </cfinvoke>
 <cfdump var="#convertDotNetDataset(data)#">

args:
 - name: dataset
   desc: Dot net dataset.
   req: true


javaDoc: |
 <!---
  Takes a .Net dataset and converts it to a CF structure of queries.
  
  @param dataset      Dot net dataset. (Required)
  @return Returns a structure. 
  @author Anthony Petruzzi (tonyp@rolist.com) 
  @version 1, May 17, 2007 
 --->

code: |
 <cffunction name="convertDotNetDataset" access="public" returnType="struct" output="false"
             hint="takes a .Net dataset and converts it to a CF structure of queries">
     <cfargument name="dataset" required="true">
     <cfset var Local = StructNew()>
     <cfset Local.result = structNew() />
     <cfset Local.aDataset = arguments.dataset.get_any() />
     <cfset Local.xSchema  = xmlParse(Local.aDataset[1]) />
     <cfset Local.xData  = xmlParse(Local.aDataset[2]) />
 
     <!--- Create Queries --->
     <cfset Local.xTables = Local.xSchema["xs:schema"]["xs:element"]["xs:complexType"]["xs:choice"] />
     <cfloop from="1" to="#arrayLen(Local.xTables.xmlChildren)#" index="Local.i">
         <cfset Local.tableName = Local.xTables.xmlChildren[Local.i].xmlAttributes.name />
         <cfset Local.xColumns = Local.xTables.xmlChildren[Local.i].xmlChildren[1].xmlChildren[1].xmlChildren/>
         <cfset Local.result[Local.tableName] = queryNew("") />
         <cfloop from="1" to="#arrayLen(Local.xColumns)#" index="Local.j">
             <cfset queryAddColumn(Local.result[Local.tableName], Local.xColumns[Local.j].xmlAttributes.name, arrayNew(1)) />
         </cfloop>
     </cfloop>
 
     <!--- see if there are any row of data, if not exit --->
     <cfif NOT StructKeyExists(Local.xData["diffgr:diffgram"], "NewDataSet")>
         <cfreturn Local.result>
     </cfif>
 
     <!--- Populate Queries --->
     <cfset Local.xRows = Local.xData["diffgr:diffgram"]["NewDataSet"] />
     <cfloop from="1" to="#arrayLen(Local.xRows.xmlChildren)#" index="Local.i">
         <cfset Local.thisRow = Local.xRows.xmlChildren[Local.i] />
         <cfset Local.tableName = Local.thisRow.xmlName />
         <cfset queryAddRow(Local.result[Local.tableName], 1) />
         <cfloop from="1" to="#arrayLen(Local.thisRow.xmlChildren)#" index="Local.j">
             <cfset querySetCell(Local.result[Local.tableName], Local.thisRow.xmlChildren[Local.j].xmlName, Local.thisRow.xmlChildren[Local.j].xmlText, Local.result[Local.tableName].recordCount) />
         </cfloop>
     </cfloop>
 
     <cfreturn Local.result>
 </cffunction>

---

