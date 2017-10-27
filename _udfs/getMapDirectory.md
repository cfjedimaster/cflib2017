---
layout: udf
title:  getMapDirectory
date:   2004-02-19T01:01:01.000Z
library: UtilityLib
argString: "name"
author: Joseph Flanigan
authorEmail: joseph@switch-box.org
version: 1
cfVersion: CF6
shortDescription: Gets the directory path for CF mapping logical path.
tagBased: true
description: |
 Uses the coldfusion.server.ServiceFactory to obtain the directory path for a CF mappings logical path by passing in the name of the logical path.

returnValue: Returns a string.

example: |
 <cfoutput>
 getMapPath: #getMapDirectory("/CFIDE")# 
 </cfoutput>

args:
 - name: name
   desc: Mapping name to translate.
   req: true


javaDoc: |
 <!---
  Gets the directory path for CF mapping logical path.
  
  @param name      Mapping name to translate. (Required)
  @return Returns a string. 
  @author Joseph Flanigan (joseph@switch-box.org) 
  @version 1, February 18, 2004 
 --->

code: |
 <cffunction name="getMapDirectory" returntype="string" output="false">
     <cfargument name="name" type="string" required="yes">
     <cfset factory = CreateObject("java", "coldfusion.server.ServiceFactory")>
      <cfreturn StructFind(factory.RuntimeService.getMappings(),Arguments.name)>
 </cffunction>

oldId: 1060
---

