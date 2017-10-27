---
layout: udf
title:  lastIndexOf
date:   2008-08-16T15:16:52.000Z
library: StrLib
argString: "targetString, lastChar"
author: Chris Douglas
authorEmail: chrisgdouglas@gmail.com
version: 2
cfVersion: CF6
shortDescription: Returns the index position of the last matching character in a string.
tagBased: true
description: |
 This UDF returns the index position of the last matching character in a string that you are searching for. If no matching string is found, a 0 is returned.

returnValue: Returns a number.

example: |
 <cfset file_name = "test.txt">
 
 <cfset fileExtensionPosition = len(FORM.file_name) - lastIndexOf(FORM.file_name, ".")>
 <!--- fileExtensionPosition  = 4 --->
 
 <cfset fileExt = "#removeChars(FORM.file_name, 1, fileExtensionPosition)#">
 <!--- fileExt = .txt --->

args:
 - name: targetString
   desc: String to check.
   req: true
 - name: lastChar
   desc: Character to look for.
   req: true


javaDoc: |
 <!---
  Returns the index position of the last matching character in a string.
  v2 rewrite by Raymond Camden
  
  @param targetString      String to check. (Required)
  @param lastChar      Character to look for. (Required)
  @return Returns a number. 
  @author Chris Douglas (chrisgdouglas@gmail.com) 
  @version 2, August 16, 2008 
 --->

code: |
 <cffunction name="lastIndexOf" returntype="numeric" output="no">
     <cfargument name="targetString" type="string" required="yes">
     <cfargument name="lastChar" type="string" required="yes">
   
     <cfif find(lastChar, arguments.targetString)>
         <cfreturn len(arguments.targetString) - find(lastChar,reverse(arguments.targetString))>  
     <cfelse>
         <cfreturn 0>
     </cfif>
     
 </cffunction>

oldId: 1859
---

