---
layout: udf
title:  floatToHex
date:   2010-06-22T22:57:41.000Z
library: MathLib
argString: "floatValue[, usePadding]"
author: Leigh
authorEmail: cfsearching@yahoo.com
version: 0
cfVersion: CF6
shortDescription: Converts a java float to a 32-bit hexadecimal representation
description: |
 Converts a java float to a 32-bit hexadecimal representation (IEEE 754 floating-point number)

returnValue: Returns a string.

example: |
 <cfset hexValue = FloatToHex( "9.937777E-32" ) />
 <cfoutput>hexValue = #hexValue#</cfoutput>

args:
 - name: floatValue
   desc: Numeric value.
   req: true
 - name: usePadding
   desc: Boolean to determine if padding is used on the result. Defaults to true.
   req: false


javaDoc: |
 <!---
  Converts a java float to a 32-bit hexadecimal representation
  
  @param floatValue      Numeric value. (Required)
  @param usePadding      Boolean to determine if padding is used on the result. Defaults to true. (Optional)
  @return Returns a string. 
  @author Leigh (cfsearching@yahoo.com) 
  @version 0, June 22, 2010 
 --->

code: |
 <cffunction name="floatToHex" returntype="string" access="public" output="false"
         hint="Converts a java float value to a 32-bit hexadecimal representation (IEEE 754 floating-point number)">
     <cfargument name="floatValue" type="numeric" required="true" />
     <cfargument name="usePadding" type="boolean" default="true" />
 
     <cfset var floatRef = javacast("float", 0) />
     <cfset var intValue = floatRef.floatToIntBits( javacast("float", arguments.floatValue) ) />
     <cfset var result   = formatBaseN(intValue, 16) />
 
     <!--- pad hex value with leading zeroes --->
     <cfif arguments.usePadding>
         <cfset result =  right("00000000"& result, 8) />
     </cfif>
     
     <cfreturn result />
 </cffunction>

---

