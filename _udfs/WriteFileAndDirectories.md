---
layout: udf
title:  WriteFileAndDirectories
date:   2002-10-15T13:17:50.000Z
library: FileSysLib
argString: "fileAndPath, fileOutput[, fileAndPathMode][, fileAddNewLine][, fileAttributes]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF6
shortDescription: Automatically creates any missing directories before writing to the specified file.
tagBased: true
description: |
 Automatically creates any missing directories before writing to the specified file. All created directories and the file being written to are locked with &quot;exclusive&quot; access to avoid issues between concurrently running scripts. Some code based on Raymond Camden's DirectoryCreate() and FileWrite() functions.

returnValue: Returns void.

example: |
 <!---
 <cfset WriteFileAndDirectories("c:\neotestingzone\madedir\madefile.txt", "This is only a test.")>
 --->

args:
 - name: fileAndPath
   desc: Full pathname for the file to be created.
   req: true
 - name: fileOutput
   desc: Text to be saved to the file.
   req: true
 - name: fileAndPathMode
   desc: Mode to use when creating directories and the file.
   req: false
 - name: fileAddNewLine
   desc: Boolean that determines if a newline should be entered at the end of the file. Defaults to false.
   req: false
 - name: fileAttributes
   desc: Attributes to use for the new file.
   req: false


javaDoc: |
 <!---
  Automatically creates any missing directories before writing to the specified file.
  
  @param fileAndPath      Full pathname for the file to be created. (Required)
  @param fileOutput      Text to be saved to the file. (Required)
  @param fileAndPathMode      Mode to use when creating directories and the file. (Optional)
  @param fileAddNewLine      Boolean that determines if a newline should be entered at the end of the file. Defaults to false. (Optional)
  @param fileAttributes      Attributes to use for the new file. (Optional)
  @return Returns void. 
  @author Shawn Seley (shawnse@aol.com) 
  @version 1, October 15, 2002 
 --->

code: |
 <cffunction name="WriteFileAndDirectories" output="false" returnType="void">
     <cfargument name="fileAndPath"      type="string"   required="true">
     <cfargument name="fileOutput"       type="string"   required="true">
     <cfargument name="fileAndPathMode"  type="string"   required="false"  default="">
     <cfargument name="fileAddNewLine"   type="boolean"  required="false"  default="yes">
     <cfargument name="fileAttributes"   type="string"   required="false"  default="">
 
     <cfset var path_array     = ListToArray(fileAndPath, "\")>
     <cfset var this_dir_path  = path_array[1]>   <!--- first item in fileAndPath is the drive path --->
     <cfset var file_name      = path_array[ArrayLen(path_array)]>   <!--- last item in fileAndPath is the file name --->
     <cfset var second_last    = ArrayLen(path_array)-1>
 
     <cfset var i = 0>
 
     <!--- lock these directories and files to prevent errors with concurrent threads --->
     <cflock timeout="30" throwontimeout="Yes" name="WriteFileAndDirectoriesLock" type="EXCLUSIVE">
 
         <!--- create any missing directories --->
         <cfloop index="i" from="2" to="#second_last#">
             <cfset this_dir_path = this_dir_path & "\" &  path_array[i]>
             <cfif not DirectoryExists(this_dir_path)>
                 <cfif fileAndPathMode is "">
                     <cfdirectory action="CREATE" directory="#this_dir_path#">
                 <cfelse>
                     <cfdirectory action="CREATE" directory="#this_dir_path#" mode="#fileAndPathMode#">
                 </cfif>
             </cfif>
         </cfloop>
 
         <!--- write the file to the now confirmed/created directory path --->
         <cfif fileAndPathMode is "">
             <cffile action="WRITE" file="#fileAndPath#" output="#fileOutput#" addNewLine="#fileAddNewLine#" attributes="#fileAttributes#">
         <cfelse>
             <cffile action="WRITE" file="#fileAndPath#" output="#fileOutput#" mode="#fileAndPathMode#" addNewLine="#fileAddNewLine#" attributes="#fileAttributes#">
         </cfif>
     </cflock>
 
 </cffunction>

---

