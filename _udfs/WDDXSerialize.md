---
layout: udf
title:  WDDXSerialize
date:   2002-10-16T16:06:04.000Z
library: CFMLLib
argString: "input[, useTimeZoneInfo]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 2
cfVersion: CF6
shortDescription: Allows for serialization to WDDX.
description: |
 Allows for serialization to WDDX.

returnValue: Returns a WDDX packet.

example: |
 <cfscript>
 x = arrayNew(1);
 x[1] = now();
 x[2] = structNew();
 x[2].foo = "goo";
 packet = wddxSerialize(x);
 writeOutput(left(htmlEditFormat(packet),100));
 </cfscript>

args:
 - name: input
   desc: The value to serialize.
   req: true
 - name: useTimeZoneInfo
   desc: Indicates whether to output time-zone information when serializing CFML to WDDX. The default is yes.
   req: false


javaDoc: |
 <!---
  Allows for serialization to WDDX.
  Updated for CFMX var scope syntax.
  
  @param input      The value to serialize. (Required)
  @param useTimeZoneInfo      Indicates whether to output time-zone information when serializing CFML to WDDX. The default is yes. (Optional)
  @return Returns a WDDX packet. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 2, October 16, 2002 
 --->

code: |
 <cffunction name="wddxSerialize" output="false" returnType="string">
     <cfargument name="input" type="any" required="true">
     <cfargument name="useTimeZoneInfo" type="boolean" required="false" default="true">
     
     <cfset var output="">
     
     <cfwddx action="cfml2wddx" input="#input#" output="output" useTimeZoneInfo="#useTimeZoneInfo#">
     <cfreturn output>
 </cffunction>

---

