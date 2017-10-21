---
layout: udf
title:  WDDXDeserialize
date:   2002-10-16T16:07:37.000Z
library: CFMLLib
argString: "input"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF6
shortDescription: Allows for deserialization of WDDX data.
description: |
 Allows for deserialization of WDDX data.

returnValue: Returns deserialized data.

example: |
 <cfscript>
 x = arrayNew(1);
 x[1] = now();
 x[2] = structNew();
 x[2].foo = "goo";
 packet = wddxSerialize(x);
 original = wddxDeserialize(packet);
 </cfscript>
 <cfdump var="#original#">

args:
 - name: input
   desc: A valid WDDX string.
   req: true


javaDoc: |
 <!---
  Allows for deserialization of WDDX data.
  Updated for CFMX var syntax.
  
  @param input      A valid WDDX string. (Required)
  @return Returns deserialized data. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 2, October 16, 2002 
 --->

code: |
 <cffunction name="wddxDeserialize" output="false" returnType="any">
     <cfargument name="input" type="string" required="true">
 
     <cfset var output="">
     
     <cfwddx action="wddx2cfml" input="#input#" output="output">
     <cfreturn output>
 </cffunction>

---

