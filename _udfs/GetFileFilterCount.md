---
layout: udf
title:  GetFileFilterCount
date:   2012-01-04T22:17:14.000Z
library: UtilityLib
argString: "directory, filter"
author: James Moberg
authorEmail: james@ssmedia.com
version: 1
cfVersion: CF6
shortDescription: Accepts a directory path &amp; a file filter.  Returns number of matching files.
tagBased: true
description: |
 Accepts a directory path &amp; a file filter.  Returns number of matching files.

returnValue: Returns a number.

example: |
 <cfset JPGFileCount = GetFileFilterCount("C:\images", "*.jpg")>
 <cfset GIFFileCount = GetFileFilterCount("C:\images", "*.gif")>

args:
 - name: directory
   desc: directory path
   req: true
 - name: filter
   desc: filter
   req: true


javaDoc: |
 <!---
  Accepts a directory path &amp; a file filter.  Returns number of matching files.
  
  @param directory      directory path (Required)
  @param filter      filter (Required)
  @return Returns a number. 
  @author James Moberg (james@ssmedia.com) 
  @version 1, January 4, 2012 
 --->

code: |
 rsion 1, May 17, 2011
 */
 <cffunction name="GetFileFilterCount" returntype="numeric" output="no">
     <cfargument name="directory" type="string" required="true" />
     <cfargument name="filter" type="string" required="true" />
     <cfset var theCount = 0 />
     <cfset var checkfiles = "">
 
     <cfif directoryExists(arguments.directory)>
         <cfdirectory action="LIST" directory="#arguments.directory#" name="CheckFiles" filter="#arguments.filter#" type="file" listinfo="name">
         <cfset theCount = CheckFiles.RecordCount />
     </cfif>
     <cfreturn theCount />
 </cffunction>

---

