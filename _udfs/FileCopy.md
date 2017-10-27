---
layout: udf
title:  FileCopy
date:   2007-09-18T14:19:21.000Z
library: CFMLLib
argString: "source, destination[, mode][, attributes]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Mimics the cffile, action=&quot;copy&quot; command.
tagBased: true
description: |
 Mimics the cffile, action=&quot;copy&quot; command. Please note that this function will not work in ColdFusion 8 as it is a built in function.

returnValue: Does not return a value.

example: |
 <cfscript>
 //fileCopy("c:\neotestingzone\udf\cfml\foo.txt","c:\neotestingzone\udf\cfml\foo2.txt");
 </cfscript>

args:
 - name: source
   desc: Source file to copy.
   req: true
 - name: destination
   desc: Path to copy file to.
   req: true
 - name: mode
   desc: Defines permissions for a file on non-Windows systems.
   req: false
 - name: attributes
   desc: File attributes.
   req: false


javaDoc: |
 <!---
  Mimics the cffile, action=&quot;copy&quot; command.
  Will not work in CF8.
  
  @param source      Source file to copy. (Required)
  @param destination      Path to copy file to. (Required)
  @param mode      Defines permissions for a file on non-Windows systems. (Optional)
  @param attributes      File attributes. (Optional)
  @return Does not return a value. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 1, September 18, 2007 
 --->

code: |
 <cffunction name="fileCopy" output="false" returnType="void">
     <cfargument name="source" type="string" required="true">
     <cfargument name="destination" type="string" required="true">
     <cfargument name="mode" type="string" default="" required="false">
     <cfargument name="attributes" type="string" default="" required="false">
     <cfif len(mode)>
         <cffile action="copy" source="#source#" destination="#destination#" mode="#mode#">
     <cfelse>
         <cffile action="copy" source="#source#" destination="#destination#" attributes="#attributes#">
     </cfif>
 </cffunction>

oldId: 624
---

