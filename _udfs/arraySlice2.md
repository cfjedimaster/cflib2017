---
layout: udf
title:  arraySlice2
date:   2009-06-11T22:31:29.000Z
library: DataManipulationLib
argString: "thisArray[, start][, length]"
author: G.Arlington
authorEmail: germann_arlington@yahoo.co.uk
version: 0
cfVersion: CF6
shortDescription: An arraySlice using Java 1.4 ArrayList built-in method.
description: |
 An arraySlice using Java 1.4 ArrayList built-in method subList(int from, int to).

returnValue: Returns an array.

example: |
 <cfset myArray = ArrayNew(1) />
 <cfloop index="i" from="1" to="100">
     <cfset myArray[i] = i />
 </cfloop>
 <cfdump var="#myArray#">
 <cfset myArray2 = arraySlice2(myArray) />
 <cfdump var="#myArray2#">
 <cfset myArray2 = arraySlice2(myArray, 90) />
 <cfdump var="#myArray2#">
 <cfset myArray2 = arraySlice2(myArray, 99, 10) />
 <cfdump var="#myArray2#">

args:
 - name: thisArray
   desc: Array to slice.
   req: true
 - name: start
   desc: Starting value (defaults to 1).
   req: false
 - name: length
   desc: Length of slice (defaults to 0 which will return the entire rest of the items after the start value).
   req: false


javaDoc: |
 <!---
  An arraySlice using Java 1.4 ArrayList built-in method.
  
  @param thisArray      Array to slice. (Required)
  @param start      Starting value (defaults to 1). (Optional)
  @param length      Length of slice (defaults to 0 which will return the entire rest of the items after the start value). (Optional)
  @return Returns an array. 
  @author G.Arlington (germann_arlington@yahoo.co.uk) 
  @version 0, June 11, 2009 
 --->

code: |
 <cffunction name="arraySlice2" returntype="array" output="false">
     <cfargument name="thisArray" required="true" type="array" />
     <cfargument name="start" required="false" type="numeric" default="1" />
     <cfargument name="length" required="false" type="numeric" default="0" />
     <cfset var resArray = createObject("java", "java.util.ArrayList").Init(arguments.thisArray) />
     <cfset var thisArrayLen = ArrayLen(arguments.thisArray) />
     <cfset var finish = 0 />
     <cfif (arguments.length EQ 0) OR ((arguments.start + arguments.length - 1) GT thisArrayLen)>
         <cfset arguments.length = thisArrayLen - arguments.start + 1 />
     </cfif>
     <cfset finish = arguments.start + arguments.length - 1 />
 
     <cfreturn resArray.subList(JavaCast("int", arguments.start - 1), JavaCast("int", finish)) />
 </cffunction>

---

