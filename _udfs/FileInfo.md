---
layout: udf
title:  FileInfo
date:   2002-10-15T13:03:36.000Z
library: CFMLLib
argString: "fileName"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Returns information about a file.
description: |
 Returns information about a file. This includes: attributes, datelastmodified, mode, name, size, and type.

returnValue: Returns a query.

example: |
 <cfscript>
 x=fileInfo(expandPath(".") & "\" & listLast(cgi.script_name,"/"));
 </cfscript>
 
 <cfdump var="#x#" label="File Info">

args:
 - name: fileName
   desc: File to inspect.
   req: true


javaDoc: |
 <!---
  Returns information about a file.
  Updated for CMFX var scope.
  
  @param fileName      File to inspect. (Required)
  @return Returns a query. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 1, October 15, 2002 
 --->

code: |
 <cffunction name="fileInfo" output="false" returntype="query">
     <cfargument name="fileName" type="string" required="true">
 
     <cfset var directory = "">
     <cfset var getFile = queryNew("")>
     
     <cfif not fileExists(fileName)>
         <cfthrow message="fileInfo error: #fileName# does not exist.">
     </cfif>
     <cfset directory = getDirectoryFromPath(fileName)>
     <cfdirectory name="getFile" directory="#directory#" filter="#getFileFromPath(fileName)#">
     <cfreturn getFile>
 </cffunction>

---

