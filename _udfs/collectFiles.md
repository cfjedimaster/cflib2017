---
layout: udf
title:  collectFiles
date:   2006-04-05T14:43:31.000Z
library: FileSysLib
argString: "extensions, destinationPath, sourcePath"
author: Steven Ross
authorEmail: steven.ross@zerium.com
version: 2
cfVersion: CF6
shortDescription: Scans a directory (or path) for files of a specified extension and then copies them to the path you specify.
tagBased: true
description: |
 This UDF will scan (recurse) a given path for a given list of files by extension and then copy them to the path you specify.

returnValue: Returns nothing.

example: |
 <cfset destination = ExpandPath("./") & "\!collect" />
 <cfset source = ExpandPath("./") />
 
 <cfset collectFiles("asp,htm,html", destination, source) />

args:
 - name: extensions
   desc: List of extensions to copy.
   req: true
 - name: destinationPath
   desc: Destination directory.
   req: true
 - name: sourcePath
   desc: Source directory.
   req: true


javaDoc: |
 <!---
  Scans a directory (or path) for files of a specified extension and then copies them to the path you specify.
  v2 by Raymond Camden. I just cleaned up the var statements.
  
  @param extensions      List of extensions to copy. (Required)
  @param destinationPath      Destination directory. (Required)
  @param sourcePath      Source directory. (Required)
  @return Returns nothing. 
  @author Steven Ross (steven.ross@zerium.com) 
  @version 2, April 7, 2006 
 --->

code: |
 <cffunction name="collectFiles" access="public" hint="recurses through a directory and collects the file types you want then outputs to another directory" returnType="void">
     <cfargument name="extensions" required="true" type="string" hint="The extensions you want to gather up csv (list) format ex:(asp,cfm,jsp) ">
     <cfargument name="destinationPath" required="true" type="string" hint="absolute path to storage directory">
     <cfargument name="sourcePath" required="true" type="string" hint="absolute path to source directory">
     <cfset var root = arguments.sourcePath/>
     <cfset var i = "">
     <cfset var absPath = "">
     <cfset var relativePath = "">
     <cfset var writeTo = "">
     <cfset var pathAndFile = "">
     
     <cfif not directoryExists(arguments.sourcePath)>
         <cfthrow message="Source Directory (#arguments.sourcePath#) not found" detail="You didn't pass in a valid source directory, check the path and try again.">
     </cfif>
     
     <cfloop list="#arguments.extensions#" index="i">
         
         <cfdirectory name="getFiles" directory="#root#" recurse="true" filter="*.#i#">
     
             <cfloop query="getFiles">
                 
                 <cfset absPath = getFiles.directory & "/" />
                 
                 <cfset relativePath = Replace(absPath, root, "", "all") />
                 
                 <cfset writeTo = ARGUMENTS.destinationPath & "/" & relativePath>
                 
                 <cfset pathAndFile = getFiles.directory & "/" & getFiles.name />
                 
                 <cfif not directoryExists(writeTo)>
                     <cfdirectory action="create" directory="#writeTo#">
                     <cffile action="copy" source="#pathAndFile#" destination="#writeTo#">
                 <cfelse>
                     <cffile action="copy" source="#pathAndFile#" destination="#writeTo#">
                 </cfif>
                 
             </cfloop>
             
     </cfloop>
 
 </cffunction>

oldId: 1407
---

