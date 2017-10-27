---
layout: udf
title:  Execute
date:   2002-10-16T11:55:05.000Z
library: CFMLLib
argString: "name[, args][, timeout][, outputFile]"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF6
shortDescription: Mimics the cfexecute tag.
tagBased: true
description: |
 Mimics the cfexecute tag.

returnValue: Returns a string.

example: |
 <cfscript>
 //x = execute("c:\winnt\system32\netstat.exe","-e",20);
 //writeOutput("x is #htmlCodeFormat(x)#");
 </cfscript>

args:
 - name: name
   desc: Program to execute.
   req: true
 - name: args
   desc: Args to pass. Can be string or array.
   req: false
 - name: timeout
   desc: Time to wait for program execution.
   req: false
 - name: outputFile
   desc: File to save results.
   req: false


javaDoc: |
 <!---
  Mimics the cfexecute tag.
  Updated for CFMX var scope.
  
  @param name      Program to execute. (Required)
  @param args      Args to pass. Can be string or array. (Optional)
  @param timeout      Time to wait for program execution. (Optional)
  @param outputFile      File to save results. (Optional)
  @return Returns a string. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 1, October 16, 2002 
 --->

code: |
 <cffunction name="execute" output="false" returnType="string">
     <cfargument name="name" type="string" required="true">
     <cfargument name="args" type="any" required="false" default="">
     <cfargument name="timeout" type="string" required="false" default="0">
     <cfargument name="outputfile" type="string" required="false" default="">
 
     <cfset var result = "">
     
     <cfsavecontent variable="result">
         <cfif len(outputFile)>
             <cfexecute name="#name#" arguments="#args#" timeout="#timeout#" outputfile="#outputfile#"/>
         <cfelse>
             <cfexecute name="#name#" arguments="#args#" timeout="#timeout#"/>
         </cfif>
     </cfsavecontent>
     <cfreturn result>
 </cffunction>

oldId: 620
---

