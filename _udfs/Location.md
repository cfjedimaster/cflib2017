---
layout: udf
title:  Location
date:   2002-10-15T13:05:58.000Z
library: CFMLLib
argString: "url[, addToken]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Mimics the cflocation tag.
tagBased: true
description: |
 Mimics the cflocation tag.

returnValue: Does not return a value.

example: |
 <cfscript>
 //location("date.cfm");
 </cfscript>

args:
 - name: url
   desc: URL to cflocate to.
   req: true
 - name: addToken
   desc: Specifies wether CFTOKEN info should be appended. Defaults to true.
   req: false


javaDoc: |
 <!---
  Mimics the cflocation tag.
  
  @param url      URL to cflocate to. (Required)
  @param addToken      Specifies wether CFTOKEN info should be appended. Defaults to true. (Optional)
  @return Does not return a value. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 1, October 15, 2002 
 --->

code: |
 <cffunction name="location" output="false" returnType="void">
     <cfargument name="url" type="string" required="true">
     <cfargument name="addToken" type="boolean" default="true" required="false">
     <cflocation url="#url#" addToken="#addToken#">
 </cffunction>

---

