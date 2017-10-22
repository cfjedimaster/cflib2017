---
layout: udf
title:  DeleteCFCache
date:   2003-05-13T17:18:45.000Z
library: UtilityLib
argString: "cachedFile"
author: Nathan Strutz
authorEmail: mrnate@hotmail.com
version: 1
cfVersion: CF6
shortDescription: Force recompiling of a page in the cfclasses cached folder.
tagBased: true
description: |
 Deletes a specified file from the Cold Fusion cfclasses cache directory, forcing ColdFusion to re-compile it. Returns true if successful, false if file was not found. Pass it your cf template's full or partial file name. This is especially great for servers with &quot;Trusted Caching&quot; turned on but you still need to make a change to a page, or for those mean servers that seem to keep files in cache even after updating them.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 <pre>
 #DeleteCFCache("index.cfm")#
 #DeleteCFCache("submit")#
 #DeleteCFCache("bingobangobongo.cfm")# (always false)
 </pre>
 </cfoutput>

args:
 - name: cachedFile
   desc: Filename, or partial filename.
   req: true


javaDoc: |
 <!---
  Force recompiling of a page in the cfclasses cached folder.
  
  @param cachedFile      Filename, or partial filename. (Required)
  @return Returns a boolean. 
  @author Nathan Strutz (mrnate@hotmail.com) 
  @version 1, May 13, 2003 
 --->

code: |
 <cffunction name="DeleteCFCache" output="false" returntype="boolean">
     <cfargument name="cachedFile" required="Yes" type="string">
     
     <cfset var qryDir = "">
 
     <!--- cfcache puts url encoding on files, lowercases them and removes percent signs --->
     <cfset arguments.cachedFile = URLEncodedFormat(arguments.cachedFile)>
     <cfif reFindNoCase("%2[A-Z]",arguments.cachedFile)>
         <cfset arguments.cachedFile = Replace(REReplace(arguments.cachedFile,"%2[A-Z]{1,1}",LCase(Mid(arguments.cachedFile,REFind("%2[A-Z]{1,1}",arguments.cachedFile),3)),"ALL"),"%","","ALL")>
     </cfif>
     
     <cfdirectory action="LIST" directory="#server.coldfusion.rootdir#\wwwroot\WEB-INF\cfclasses\" name="qryDir">
     <cfquery name="qryDir" dbtype="query">
         SELECT name
         FROM qryDir
         WHERE name like '%#arguments.cachedFile#%'
     </cfquery>
     <cfif not qryDir.recordcount>
         <cfreturn false>
     </cfif>
     <cfloop query="qryDir">
         <cffile action="DELETE" file="#server.coldfusion.rootdir#\wwwroot\WEB-INF\cfclasses\#qryDir.name#">
     </cfloop>
     <cfreturn true>
 </cffunction>

---

