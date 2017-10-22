---
layout: udf
title:  getUrlRelativeToWebRoot
date:   2010-06-23T16:46:40.000Z
library: UtilityLib
argString: "webRootPath, filePath[, encodeURL]"
author: Mike Gillespie
authorEmail: spidre@gmail.com
version: 1
cfVersion: CF6
shortDescription: Pass in file path to web root and a file and it returns URL relative to site root.
tagBased: true
description: |
 Pass in a system path for both the web root and the file you need a relative path for.  This will return the URL relative from the web site root.  Option available to almost URLEncode the URL path that is returned (ignores periods).

returnValue: Returns a string.

example: |
 <cfscript>
     relPath=getUrlRelativeToWebRoot(webRootPath="d:\wwwroot",filePath="d:\wwwroot\path\to\a\file.that.I.want to link to.pdf",encodeurl=true);
     writeoutput(relPath);
 </cfscript>

args:
 - name: webRootPath
   desc: Full path of the web root.
   req: true
 - name: filePath
   desc: Full path of the file to which a relative path is needed.
   req: true
 - name: encodeURL
   desc: Boolean value to encode the result. Defaults to false.
   req: false


javaDoc: |
 <!---
  Pass in file path to web root and a file and it returns URL relative to site root.
  
  @param webRootPath      Full path of the web root. (Required)
  @param filePath      Full path of the file to which a relative path is needed. (Required)
  @param encodeURL      Boolean value to encode the result. Defaults to false. (Optional)
  @return Returns a string. 
  @author Mike Gillespie (spidre@gmail.com) 
  @version 1, June 23, 2010 
 --->

code: |
 <cffunction name="getUrlRelativeToWebRoot" access="public" output="true" returntype="string" hint="pass in a web root and file path and get the url relative to the web root">
     <cfargument name="webRootPath" required="yes" type="string" hint="c:\wwwroot\ as an example">
     <cfargument name="filePath" required="yes" type="string" hint="c:\wwwroot\images\my image.gif">
     <cfargument name="encodeURL" required="no" type="boolean" default="false" hint="url encodes all between the slashes and ignores periods">
     <cfset var pathOut="">
     <!--- these two vars only needed if encodeURL is true --->
     <cfset var strPathOut="/">
     <cfset var arrPath=arraynew(1)>
     <cfset var x = "">
 
     <!--- strip out the web root path and convert the slashes --->
     <cfset pathOut=replace(replacenocase(arguments.filePath,arguments.webRootPath,"/","one"),"\","/","all")>
     <!--- made this an option since URLEncodedFormat() changes everything, including the slashes --->
     <cfif arguments.encodeURL>
         <!--- load the array --->
         <cfset arrPath=listtoarray(pathout,"/")>
         <!--- loop the array (old school for portability) --->
         <cfloop index="x" from="1" to="#arraylen(arrPath)#">
             <!--- encode the string, but change the periods back (personal preference) --->
             <cfset strPathOut=listAppend(strPathOut,replacenocase(urlencodedformat(arrPath[x]),"%2e",".","all"),"/")>
         </cfloop>
         <!--- re-populate the out var --->
         <cfset pathout=strPathOut>
     </cfif>
     <!--- lets make sure we have not duped any slashes to catch listAppend() and/or inconsistent data coming in --->
     <cfset pathout=replacenocase(pathOut,"//","/","all")>
     <cfreturn pathOut>
 </cffunction>

---

