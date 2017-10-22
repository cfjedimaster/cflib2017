---
layout: udf
title:  clearStructureNested
date:   2005-01-28T13:23:41.000Z
library: DataManipulationLib
argString: "s"
author: Qasim Rasheed
authorEmail: qasimrasheed@hotmail.com
version: 1
cfVersion: CF6
shortDescription: This function recurse through a structure and makes all fields as empty string
tagBased: true
description: |
 This function recurse through a structure and makes all fields as empty string

returnValue: Returns a structure.

example: |
 <cfset foo = structnew()>
 <cfset foo.foo = structnew()>
 <cfset foo.foo.foo = "bar">
 <cfset foo.test = "bar">
 <cfset clearStructureNested( foo )>
 <cfdump var="#foo#">

args:
 - name: s
   desc: Structure to clear.
   req: true


javaDoc: |
 <!---
  This function recurse through a structure and makes all fields as empty string
  
  @param s      Structure to clear. (Required)
  @return Returns a structure. 
  @author Qasim Rasheed (qasimrasheed@hotmail.com) 
  @version 1, January 28, 2005 
 --->

code: |
 <cffunction name="clearStructureNested" returntype="void" output="false">
     <cfargument name="s" type="struct" required="true" />
     <cfset var i = "">
     <cfloop collection="#arguments.s#" item="i">
         <cfif isstruct(arguments.s[i])>
             <cfset clearStructureNested(arguments.s[i])>
         <cfelse>
             <cfset structupdate(arguments.s, i,"")>
         </cfif>
     </cfloop>
 </cffunction>

---

