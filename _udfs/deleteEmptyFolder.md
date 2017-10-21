---
layout: udf
title:  deleteEmptyFolder
date:   2011-05-30T14:10:36.000Z
library: FileSysLib
argString: "path"
author: Pritesh
authorEmail: pritesh@thecfguy.com
version: 1
cfVersion: CF6
shortDescription: Delete empty folder from given path.
description: |
 Arguments:
 1. Path : folder physical path for which you want to clean empty directory.
 Function return boolean value indicating directory empty or not and if empty it will be deleted.

returnValue: Returns a boolean.

example: |
 <cfset deleteEmptyFolder('#expandPath("/temp/")#')>

args:
 - name: path
   desc: Path to delete (if empty).
   req: true


javaDoc: |
 <!---
  Delete empty folder from given path.
  
  @param path      Path to delete (if empty). (Required)
  @return Returns a boolean. 
  @author Pritesh (pritesh@thecfguy.com) 
  @version 1, May 30, 2011 
 --->

code: |
 <cffunction name="deleteEmptyFolder" access="public" output="false" returntype="boolean">
     <cfargument name="path" required="true" type="string" />
     <cfset var qList="">
     <cfset var qDir = "">
     <cfset var qFiles = "">
     <cfset var isEmpty = 1>
     <!--- List Directory --->
     <cfdirectory action="list" directory="#arguments.path#" recurse="no" name="qList">
     <!--- get sub directory list --->
     <cfquery name="qDir" dbtype="query">
         select * from qList where type='Dir'
     </cfquery>
     <!--- Call recursive function to check directory empty or not --->
     <cfloop query="qDir">
         <!--- If sub directory not empty mark current directory as not empty. --->
         <cfif not deleteEmptyFolder(qDir.directory & "\" & qDir.name)>
             <cfset isEmpty=0>
         </cfif>
     </cfloop>
 
     <!--- Check for file exists in current directory --->
     <cfquery name="qFiles" dbtype="query">
         select * from qList where type='File'
     </cfquery>
     <!--- If file exists mark as not empty --->
     <cfif qFiles.recordCount gt 0>
         <cfset isEmpty = 0>
     </cfif>
 
     <!--- If current directory empty then delete it --->
     <cfif isEmpty>
         <cfdirectory action="delete" recurse="false" directory="#arguments.path#">
     </cfif>
     <!--- Return empty status for current directory --->
     <cfreturn isEmpty>
 </cffunction>

---

