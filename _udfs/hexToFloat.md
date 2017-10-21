---
layout: udf
title:  hexToFloat
date:   2010-06-22T22:59:17.000Z
library: MathLib
argString: "hex"
author: Leigh
authorEmail: cfsearching@yahoo.com
version: 1
cfVersion: CF6
shortDescription: Converts a 32-bit hexadecimal floating-point number to a java float
description: |
 Converts a 32-bit hexadecimal representation (IEEE 754 floating-point number) to a java Float

returnValue: Returns a number.

example: |
 <cfset floatValue = HexToFloat("C00FFEE") />
 <cfoutput>floatValue = #floatValue#</cfoutput>

args:
 - name: hex
   desc: Hex input.
   req: true


javaDoc: |
 <!---
  Converts a 32-bit hexadecimal floating-point number to a java float
  
  @param hex      Hex input. (Required)
  @return Returns a number. 
  @author Leigh (cfsearching@yahoo.com) 
  @version 1, June 22, 2010 
 --->

code: |
 <cffunction name="hexToFloat" returntype="numeric" access="public" output="false"
         hint="Converts a 32-bit hexadecimal representation (IEEE 754 floating-point number) to a java Float">
     <cfargument name="hex" type="string" required="true" />
 
     <cfset var longValue     = "">
 
     <cfif reFindNoCase("[^[:xdigit:]]", arguments.hex)>
         <cfthrow message="Argument.hex does not contain a recognized hexidecimal string" type="InvalidArgument" />
     </cfif>
     
     <cfset longValue = javacast("long", 0).parseLong( arguments.hex, 16 ) />
     <cfreturn javacast("float", 0).intBitsToFloat( longValue.intValue() ) />
 </cffunction>

---

