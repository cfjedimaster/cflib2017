---
layout: udf
title:  GetEnv
date:   2003-03-11T17:17:34.000Z
library: UtilityLib
argString: "[varName]"
author: Ben Forta
authorEmail: ben@forta.com
version: 1
cfVersion: CF6
shortDescription: Returns environment information. (Windows only!)
tagBased: true
description: |
 Returns environment information. (Windows only!)

returnValue: Returns either a structure or a string.

example: |
 <!---
 <cfoutput>
 <cfdump var="#getenv()#">
 Path: #getenv("path")#<br>
 </cfoutput>
 --->

args:
 - name: varName
   desc: Environment variable to return.
   req: false


javaDoc: |
 <!---
  Returns environment information. (Windows only!)
  
  @param varName      Environment variable to return. (Optional)
  @return Returns either a structure or a string. 
  @author Ben Forta (ben@forta.com) 
  @version 1, March 11, 2003 
 --->

code: |
 <cffunction name="GetEnv" output="false" returnType="any">
     <cfargument name="varname" type="string" required="no">
     
     <!--- Define local variables --->
     <cfset var env=structNew()>
     <cfset var data="">
     <cfset var ename="">
     <cfset var evalue="">
     <cfset var i = 1>
     
     <!--- Get enviroment and save to variable --->
     <cfsavecontent variable="data">
         <cfexecute name="cmd /c set" timeout="1" />
     </cfsavecontent>
 
     <!--- Need to convert to structure, so loop through --->
     <cfloop index="i" list="#trim(data)#" delimiters="#chr(10)##chr(13)#">
         <!--- For each line, get name and value --->
         <cfset ename=trim(listfirst(i, "="))>
         <cfset evalue=trim(listrest(i, "="))>
         <!--- And add to structure --->
         <cfset env[ename] = evalue>
     </CFLOOP>
 
     <!--- And finally, build return value --->
     <cfif not isDefined("varname")>
         <!--- If no name, return list --->
         <cfreturn env>
     <cfelseif structKeyExists(env, varname)>
         <!--- If name provided, and present, get value --->
         <cfreturn env[varname]>
     </cfif>
 
 </cffunction>

---

