---
layout: udf
title:  string2linesArray
date:   2005-07-11T17:54:10.000Z
library: StrLib
argString: "inString"
author: Massimo Foti
authorEmail: massimo@massimocorner.com
version: 1
cfVersion: CF6
shortDescription: Turn a string into an array of lines.
tagBased: true
description: |
 Turn a string into an array of lines, using java.io.BufferedReader to maximize performance.

returnValue: Returns an array.

example: |
 <!--- Create a multi-line string --->
 <cfsavecontent variable="myString">Ciao Mammma,
 manda soldi...
 mandali presto.
 Grazie.
 
 Baci
 Massimo
 </cfsavecontent>
 
 <cfdump var="#string2linesArray(myString)#">

args:
 - name: inString
   desc: The string to parse.
   req: true


javaDoc: |
 <!---
  Turn a string into an array of lines.
  
  @param inString      The string to parse. (Required)
  @return Returns an array. 
  @author Massimo Foti (massimo@massimocorner.com) 
  @version 1, August 15, 2005 
 --->

code: |
 <cffunction name="string2linesArray" output="false" returntype="array" hint="Turn a string into an array of lines, using java.io.BufferedReader to maximize performances">
     <cfargument name="inString" type="string" required="yes" hint="Incoming string">
     <cfscript>
     var linesArray = ArrayNew(1);
     var jReader = createObject("java","java.io.StringReader").init(arguments.inString);
     var jBuffer = createObject("java","java.io.BufferedReader").init(jReader);
     var line = jBuffer.readLine();    
     </cfscript>
     <cftry>
     <!--- 
     Unlike Java, CFML has no notion of null, but this is quite a special case. 
     Whenever readLine() reach the end of the file, it return a Java null, 
     as soon as the BufferedReader return null, ColdFusion "erase" the line variable, making it undefined. 
     Here we leverage this somewhat weird behavior by using it as test condition for the loop
      --->
         <cfloop condition="#IsDefined("line")#">
             <cfset ArrayAppend(linesArray, line)>
             <cfset line=jBuffer.readLine()>
         </cfloop>
         <cfset jBuffer.close()>
         <cfcatch type="any">
             <!--- Something went wrong; we better close the stream anyway, just to be safe and leave no garbage behind --->
             <cfset jBuffer.close()>
             <cfthrow message="string2linesArray: Failed to read lines from string" type="string2linesArray">
         </cfcatch>
     </cftry>
     <cfreturn linesArray>
 </cffunction>

---

