---
layout: udf
title:  FileMove
date:   2002-10-15T13:03:48.000Z
library: CFMLLib
argString: "source, destination, mode[, attributes]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Mimics the cffile, action=&quot;move&quot; command.
tagBased: true
description: |
 Mimics the cffile, action=&quot;move&quot; command.

returnValue: Does not return a value.

example: |
 <cfscript>
 //fileMove("c:\neotestingzone\udf\cfml\foo.txt","c:\neotestingzone\udf\cfml\foo2.txt");
 </cfscript>

args:
 - name: source
   desc: Souce file to move.
   req: true
 - name: destination
   desc: Path to move file to.
   req: true
 - name: mode
   desc: Defines permissions for a file on non-Windows systems.
   req: true
 - name: attributes
   desc: File attributes.
   req: false


javaDoc: |
 <!---
  Mimics the cffile, action=&quot;move&quot; command.
  
  @param source      Souce file to move. (Required)
  @param destination      Path to move file to. (Required)
  @param mode      Defines permissions for a file on non-Windows systems. (Required)
  @param attributes      File attributes. (Optional)
  @return Does not return a value. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 1, October 15, 2002 
 --->

code: |
 <cffunction name="fileMove" output="false" returnType="void">
     <cfargument name="source" type="string" required="true">
     <cfargument name="destination" type="string" required="true">
     <cfargument name="mode" type="string" default="" required="false">
     <cfargument name="attributes" type="string" required="false" default="">
     <cfif len(mode)>
         <cffile action="move" source="#source#" destination="#destination#" mode="#mode#">
     <cfelse>
         <cffile action="move" source="#source#" destination="#destination#" attributes="#attributes#">
     </cfif>    
 </cffunction>

---

