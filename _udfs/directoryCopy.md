---
layout: udf
title:  directoryCopy
date:   2013-03-21T05:12:00.000Z
library: FileSysLib
argString: "source, destination[, ignore]"
author: Joe Rinehart
authorEmail: joe.rinehart@gmail.com
version: 3
cfVersion: CF6
shortDescription: Copies a directory.
tagBased: true
description: |
 Deep copies a directory, copying all children.
 
 Note that this UDF is redundant after CF9, as CF10 has a built-in function to perform this action.

returnValue: Returns nothing.

example: |
 <cfset directoryCopy("c:\inetpub\wwwroot", "c:\backups\wwwroot") />

args:
 - name: source
   desc: Source directory.
   req: true
 - name: destination
   desc: Destination directory.
   req: true
 - name: ignore
   desc: List of folders, files to ignore. Defaults to nothing.
   req: false


javaDoc: |
 <!---
  Copies a directory.
  v1.0 by Joe Rinehart
  v2.0 mod by [author not noted]
  v3.1 mod by Anthony Petruzzi
  v3.2 mod by Adam Cameron under guidance of Justin Z (removing NAMECONFLICT argument which was never supported in file-copy operations)
  
  @param source      Source directory. (Required)
  @param destination      Destination directory. (Required)
  @param ignore      List of folders, files to ignore. Defaults to nothing. (Optional)
  @return Returns nothing. 
  @author Joe Rinehart (joe.rinehart@gmail.com) 
  @version 3.2, March 21, 2013 
 --->

code: |
 <cffunction name="directoryCopy" output="false" returntype="void">
     <cfargument name="source" required="true" type="string">
     <cfargument name="destination" required="true" type="string">
     <cfargument name="ignore" required="false" type="string" default="">
 
     <cfset var contents = "">
     
     <cfif not(directoryExists(arguments.destination))>
         <cfdirectory action="create" directory="#arguments.destination#">
     </cfif>
     
     <cfdirectory action="list" directory="#arguments.source#" name="contents">
 
     <cfif len(arguments.ignore)>
         <cfquery dbtype="query" name="contents">
         select * from contents where name not in(#ListQualify(arguments.ignore, "'")#)
         </cfquery>
     </cfif>
     
     <cfloop query="contents">
         <cfif contents.type eq "file">
             <cffile action="copy" source="#arguments.source#/#name#" destination="#arguments.destination#/#name#">
         <cfelseif contents.type eq "dir">
             <cfset directoryCopy(arguments.source & "/" & name, arguments.destination & "/" & name)>
         </cfif>
     </cfloop>
 </cffunction>

---

