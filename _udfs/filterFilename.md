---
layout: udf
title:  filterFilename
date:   2006-01-19T16:15:13.000Z
library: UtilityLib
argString: "filename"
author: Jason Sheedy
authorEmail: jason@jmpj.net
version: 1
cfVersion: CF6
shortDescription: This function will remove any reserved characters from a filename string and replace any spaces with underscores.
description: |
 This function will remove any reserved characters from a filename string and replace any spaces with underscores.

returnValue: Returns a string.

example: |
 <cfset newfilename = filterFilename(filename) />
 
 <cfoutput>
 #newfilename#
 </cfoutput>

args:
 - name: filename
   desc: Filename.
   req: true


javaDoc: |
 <!---
  This function will remove any reserved characters from a filename string and replace any spaces with underscores.
  
  @param filename      Filename. (Required)
  @return Returns a string. 
  @author Jason Sheedy (jason@jmpj.net) 
  @version 1, January 19, 2006 
 --->

code: |
 <cffunction name="filterFilename" access="public" returntype="string" output="false" hint="I remove any special characters from a filename and replace any spaces with underscores.">
     <cfargument name="filename" type="string" required="true" />
     <cfset var filenameRE = "[" & "'" & '"' & "##" & "/\\%&`@~!,:;=<>\+\*\?\[\]\^\$\(\)\{\}\|]" />
     <cfset var newfilename = reReplace(arguments.filename,filenameRE,"","all") />
     <cfset newfilename = replace(newfilename," ","_","all") />
     
     <cfreturn newfilename /> 
 </cffunction>

---

