---
layout: udf
title:  deleteDirectory
date:   2014-09-19T11:53:52.000Z
library: FileSysLib
argString: "directory[, recurse]"
author: Rick Root
authorEmail: rick@webworksllc.com
version: 1
cfVersion: CF6
shortDescription: Recursively delete a directory.
description: |
 This UDF allows you to delete a directory and all of it's contents. Note - in CFMX7, this UDF is not necessary.

returnValue: Return a boolean.

example: |
 deleteDirectory("/home/webworksllc/www/test/foo2","True")

args:
 - name: directory
   desc: The directory to delete.
   req: true
 - name: recurse
   desc: Whether or not the UDF should recurse. Defaults to false.
   req: false


javaDoc: |
 <!---
  Recursively delete a directory.
  
  @param directory      The directory to delete. (Required)
  @param recurse      Whether or not the UDF should recurse. Defaults to false. (Optional)
  @return Return a boolean. 
  @author Rick Root (rick@webworksllc.com) 
  @version 1, September 19, 2014 
 --->

code: |
 <cffunction name="deleteDirectory" returntype="boolean" output="false">
     <cfargument name="directory" type="string" required="yes" >
     <cfargument name="recurse" type="boolean" required="no" default="false">
     
     <cfset var myDirectory = "">
     <cfset var count = 0>
 
     <cfif right(arguments.directory, 1) is not "/">
         <cfset arguments.directory = arguments.directory & "/">
     </cfif>
     
     <cfdirectory action="list" directory="#arguments.directory#" name="myDirectory">
 
     <cfloop query="myDirectory">
         <cfif myDirectory.name is not "." AND myDirectory.name is not "..">
             <cfset count = count + 1>
             <cfswitch expression="#myDirectory.type#">
             
                 <cfcase value="dir">
                     <!--- If recurse is on, move down to next level --->
                     <cfif arguments.recurse>
                         <cfset deleteDirectory(
                             arguments.directory & myDirectory.name,
                             arguments.recurse )>
                     </cfif>
                 </cfcase>
                 
                 <cfcase value="file">
                     <!--- delete file --->
                     <cfif arguments.recurse>
                         <cffile action="delete" file="#arguments.directory##myDirectory.name#">
                     </cfif>
                 </cfcase>            
             </cfswitch>
         </cfif>
     </cfloop>
     <cfif count is 0 or arguments.recurse>
         <cfdirectory action="delete" directory="#arguments.directory#">
     </cfif>
     <cfreturn true>
 </cffunction>

---

