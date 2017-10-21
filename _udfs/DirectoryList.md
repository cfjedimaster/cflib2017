---
layout: udf
title:  DirectoryList
date:   2004-04-08T15:23:33.000Z
library: CFMLLib
argString: "directory[, filter][, sort][, recurse]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF6
shortDescription: Mimics the cfdirectory, action=&quot;list&quot; command.
description: |
 Mimics the cfdirectory, action=&quot;list&quot; command. Also adds recursive list.

returnValue: Returns a query.

example: |
 <cfscript>
 dirList = directoryList("c:\temp","","name desc");
 </cfscript>
 <cfdump var="#dirList#">

args:
 - name: directory
   desc: The directory to list.
   req: true
 - name: filter
   desc: Optional filter to apply.
   req: false
 - name: sort
   desc: Sort to apply.
   req: false
 - name: recurse
   desc: Recursive directory list. Defaults to false.
   req: false


javaDoc: |
 <!---
  Mimics the cfdirectory, action=&quot;list&quot; command.
  Updated with final CFMX var code.
  Fixed a bug where the filter wouldn't show dirs.
  
  @param directory      The directory to list. (Required)
  @param filter      Optional filter to apply. (Optional)
  @param sort      Sort to apply. (Optional)
  @param recurse      Recursive directory list. Defaults to false. (Optional)
  @return Returns a query. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 2, April 8, 2004 
 --->

code: |
 <cffunction name="directoryList" output="false" returnType="query">
     <cfargument name="directory" type="string" required="true">
     <cfargument name="filter" type="string" required="false" default="">
     <cfargument name="sort" type="string" required="false" default="">
     <cfargument name="recurse" type="boolean" required="false" default="false">
     <!--- temp vars --->
     <cfargument name="dirInfo" type="query" required="false">
     <cfargument name="thisDir" type="query" required="false">
     <cfset var path="">
     <cfset var temp="">
     
     <cfif not recurse>
         <cfdirectory name="temp" directory="#directory#" filter="#filter#" sort="#sort#">
         <cfreturn temp>
     <cfelse>
         <!--- We loop through until done recursing drive --->
         <cfif not isDefined("dirInfo")>
             <cfset dirInfo = queryNew("attributes,datelastmodified,mode,name,size,type,directory")>
         </cfif>
         <cfset thisDir = directoryList(directory,filter,sort,false)>
         <cfif server.os.name contains "Windows">
             <cfset path = "\">
         <cfelse>
             <cfset path = "/">
         </cfif>
         <cfloop query="thisDir">
             <cfset queryAddRow(dirInfo)>
             <cfset querySetCell(dirInfo,"attributes",attributes)>
             <cfset querySetCell(dirInfo,"datelastmodified",datelastmodified)>
             <cfset querySetCell(dirInfo,"mode",mode)>
             <cfset querySetCell(dirInfo,"name",name)>
             <cfset querySetCell(dirInfo,"size",size)>
             <cfset querySetCell(dirInfo,"type",type)>
             <cfset querySetCell(dirInfo,"directory",directory)>
             <cfif type is "dir">
                 <!--- go deep! --->
                 <cfset directoryList(directory & path & name,filter,sort,true,dirInfo)>
             </cfif>
         </cfloop>
         <cfreturn dirInfo>
     </cfif>
 </cffunction>

---

