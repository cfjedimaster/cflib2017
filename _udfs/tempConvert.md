---
layout: udf
title:  tempConvert
date:   2006-04-25T23:12:30.000Z
library: ScienceLib
argString: "otemp, ctype"
author: Jack Poe
authorEmail: jackpoe@yahoo.com
version: 1
cfVersion: CF6
shortDescription: Converts temperatures from and to Celsius, Fahrenheit and Kelvin.
tagBased: true
description: |
 This is an almost all inclusive function to convert temperatures between common formats.  I haven't included the Rankine and Reaumure scales with this edition but they will be coming soon.
 
 The function uses two-character strings to perform the required action.  For example:
 
 CF converts Celsius to Fahrenheit
 FC converts Fahrenheit to Celsius
 KC converts Kelvin to Celsius
 CK converts Celsius to Kelvin
 FK converts Fahrenheit to Kelvin
 KF converts Kelvin to Fahrenheit
 
 so the funtcion call would look like so:
 
 tempconvert('30','CF')
 
 this will convert 30 degrees Celsius to the equivalent temperature Fahrenheit.

returnValue: Returns a string.

example: |
 <cfset convertType = 'CF'>
 <cfset convertThis = '30'>
 
 <cfoutput>#tempconvert(convertThis,convertType)#</cfoutput>

args:
 - name: otemp
   desc: Temperature.
   req: true
 - name: ctype
   desc: Two character string that determines the conversion.
   req: true


javaDoc: |
 <!---
  Converts temperatures from and to Celsius, Fahrenheit and Kelvin.
  
  @param otemp      Temperature. (Required)
  @param ctype      Two character string that determines the conversion. (Required)
  @return Returns a string. 
  @author Jack Poe (jackpoe@yahoo.com) 
  @version 1, April 9, 2007 
 --->

code: |
 <cffunction name="tempConvert" output="false" returnType="string">
 
     <cfargument name="otemp" required="yes" type="numeric">
     <cfargument name="ctype" required="yes" type="string">
     
     <cfif arguments.ctype IS 'CF'>
         <cfset convertedtTemp = (arguments.otemp*1.8)+32>
         <cfset convertedtTemp = convertedtTemp & '&ordm; F'>
         <cfreturn convertedtTemp>
     <cfelseif arguments.ctype IS 'FC'>
         <cfset convertedtTemp = (arguments.otemp-32)*0.5555>
         <cfset convertedtTemp = convertedtTemp & '&ordm; C'>
         <cfreturn convertedtTemp>
     <cfelseif arguments.ctype IS 'CK'>
         <cfset convertedtTemp = arguments.otemp+273.15>
         <cfset convertedtTemp = convertedtTemp & '&ordm; K'>
         <cfreturn convertedtTemp>
     <cfelseif arguments.ctype IS 'KC'>
         <cfset convertedtTemp = arguments.otemp-273.15>
         <cfset convertedtTemp = convertedtTemp & '&ordm; C'>
         <cfreturn convertedtTemp>
     <cfelseif arguments.ctype IS 'FK'>
         <cfset convertedtTemp = ((arguments.otemp-32)*0.5555)+273.15>
         <cfset convertedtTemp = convertedtTemp & '&ordm; K'>
         <cfreturn convertedtTemp>
     <cfelseif arguments.ctype IS 'KF'>
         <cfset convertedtTemp = ((arguments.otemp-273.15)*1.8)+32>
         <cfset convertedtTemp = convertedtTemp & '&ordm; K'>
         <cfreturn convertedtTemp>
     </cfif>
 
 </cffunction>

---

