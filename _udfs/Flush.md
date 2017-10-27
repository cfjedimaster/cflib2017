---
layout: udf
title:  Flush
date:   2003-04-22T11:05:20.000Z
library: CFMLLib
argString: "interval"
author: Eric C. Davis
authorEmail: cflib@10mar2001.com
version: 2
cfVersion: CF6
shortDescription: Mimics the CFFLUSH tag and sends all content to the screen.
tagBased: true
description: |
 This UDF enables flushing of content during cfscript routines.

returnValue: Returns nothing.

example: |
 <cfscript>
  for (i=1;i LTE 10;i=i+1) {
   WriteOutput("i=" & i & "<br>");
   //Disabled here because of how we run examples...
   //Flush();
  }
 </cfscript>

args:
 - name: interval
   desc: Flushes output each time this number of bytes becomes available.
   req: true


javaDoc: |
 <!---
  Mimics the CFFLUSH tag and sends all content to the screen.
  Version 2 by RCamden (ray@camdenfamily.com)
  
  @param interval      Flushes output each time this number of bytes becomes available. (Required)
  @return Returns nothing. 
  @author Eric C. Davis (cflib@10mar2001.com) 
  @version 2, April 22, 2003 
 --->

code: |
 <cffunction name="flush" returnType="void">
     <cfargument name="interval"  type="numeric" required="false">
     <cfif isDefined("interval")>
         <cfflush interval="#interval#">
     <cfelse>
         <cfflush>
     </cfif>
 </cffunction>

oldId: 830
---

