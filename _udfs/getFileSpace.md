---
layout: udf
title:  getFileSpace
date:   2011-10-12T02:18:05.000Z
library: UtilityLib
argString: ""
author: Sigi
authorEmail: siegfried.heckl@siemens.com
version: 1
cfVersion: CF6
shortDescription: Gets available and total file space for all volumes on a server.
tagBased: true
description: |
 Gets available and total file space for all volumes on a server.

returnValue: Returns an array.

example: |
 <cfdump var="#getFileSpace()#" />

args:


javaDoc: |
 <!---
  Gets available and total file space for all volumes on a server.
  
  @return Returns an array. 
  @author Sigi (siegfried.heckl@siemens.com) 
  @version 1, October 11, 2011 
 --->

code: |
 <cffunction name="getFileSpace" access="public" output="false" returntype="array" hint="returns disk filespaces of the server">
   <cfset var local = {} />
   <cfset var i = "">
 
   <cfobject type="java" action="create" class="java.io.File" name="local.objFile" />
   <cfset local.aDrives = local.objFile.listRoots() />
   <cfset local.aResult = [] />
 
   <cfloop array="#local.aDrives#" index="i">
     <cfset local.strTemp = { drivename = i.getAbsolutePath(),
                              available = i.getFreeSpace(),
                              total     = i.getTotalSpace() } />
     <cfset arrayAppend(local.aResult, local.strTemp) />
   </cfloop>
 
   <CFRETURN local.aResult />
 </cffunction>

---

