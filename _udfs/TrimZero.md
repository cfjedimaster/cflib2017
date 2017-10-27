---
layout: udf
title:  TrimZero
date:   2005-08-26T20:04:29.000Z
library: StrLib
argString: "varToTrim"
author: Praveen Mittal
authorEmail: praveen@smeng.com
version: 2
cfVersion: CF6
shortDescription: Trim traling zeros from a numeric field.
tagBased: true
description: |
 Trim traling zeros from a numeric field.

returnValue: Returns a number.

example: |
 <cfoutput>#TrimZero("0.00000")#</cfoutput><br>
 <cfoutput>#TrimZero("122.00000")#</cfoutput><br>
 <cfoutput>#TrimZero("0.12340000")#</cfoutput><br>
 <cfoutput>#TrimZero("0.120042000")#</cfoutput><br>
 <cfoutput>#TrimZero("123.0234000")#</cfoutput><br>

args:
 - name: varToTrim
   desc: Number to trim.
   req: true


javaDoc: |
 <!---
  Trim traling zeros from a numeric field.
  Version 2 by Raymond Camden
  
  @param varToTrim      Number to trim. (Required)
  @return Returns a number. 
  @author Praveen Mittal (praveen@smeng.com) 
  @version 2, August 26, 2005 
 --->

code: |
 <cffunction name="TrimZero" output="false" returnType="string">
     <cfargument name="varToTrim" type="numeric">
     
     <cfreturn arguments.varToTrim + 0>
 </cffunction>

oldId: 1294
---

