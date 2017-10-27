---
layout: udf
title:  ColorShade
date:   2010-03-03T10:26:58.000Z
library: UtilityLib
argString: "hexColor, shade"
author: Bob Gray
authorEmail: gray.bob98@gmail.com
version: 0
cfVersion: CF5
shortDescription: Returns a hexadecimal color value an amount lighter or darker than the provided color.
tagBased: true
description: |
 Returns a lighter hex color if a positive number is used and a darker if a negative number is used. Arguments are a six character hexadecimal value (no #) and the numeric value of how much the color should be incremented. -100 increments the provided color 100% toward black and 100 increments the color 100% toward white. Works well for building gradients using a loop or for generating monochromatic color schemes.

returnValue: returns a string

example: |
 <cfset darkShade = ColorShade("6F23A8", -50)>
 <cfset lightShade = ColorShade("6F23A8", 50)>
 
 <cfoutput>
 <font color="###darkShade#">#darkShade#</font> is a darker shade of <font color="##6F23A8">6F23A8</font>.<br />
 <font color="###lightShade#">#lightShade#</font> is a darker shade of <font color="##6F23A8">6F23A8</font>.<br />
 </cfoutput>

args:
 - name: hexColor
   desc: starting hex color
   req: true
 - name: shade
   desc: amount hexColor should be incremented(+)/decremented(-)
   req: true


javaDoc: |
 <!---
  Returns a hexadecimal color value an amount lighter or darker than the provided color.
  
  @param hexColor      starting hex color (Required)
  @param shade      amount hexColor should be incremented(+)/decremented(-) (Required)
  @return returns a string 
  @author Bob Gray (gray.bob98@gmail.com) 
  @version 0, March 3, 2010 
 --->

code: |
 <cffunction name="ColorShade" returntype="string">
 
 <cfargument name="hexColor" type="string" required="yes">
 <cfargument name="shade" type="numeric" required="yes">
     
 <cfset var red = "">
 <cfset var green = "">
 <cfset var blue = "">
 <cfset var s = ARGUMENTS.shade>
 <cfset var incrementedColor = ""> 
 
 <cfset red = Left(ARGUMENTS.hexColor, 2)>
 <cfset green = Mid(ARGUMENTS.hexColor, 3, 2)>
 <cfset blue = Right(ARGUMENTS.hexColor, 2)>
     
 <cfset red = NumberFormat(InputBaseN(red, 16), 00)>
 <cfset green = NumberFormat(InputBaseN(green, 16), 00)>
 <cfset blue = NumberFormat(InputBaseN(blue, 16), 00)>    
     
 <cfset red = IIF(s LT 0, red * (s + 100) / 100, red + (255 - red) * s / 100)>
 <cfset green = IIF(s LT 0, green * (s + 100) / 100, green + (255 - green) * s / 100)>
 <cfset blue = IIF(s LT 0, blue * (s + 100) / 100, blue + (255 - blue) * s / 100)>
     
 <cfset red = UCase(FormatBaseN(red, 16))>
 <cfset green = UCase(FormatBaseN(green, 16))>
 <cfset blue = UCase(FormatBaseN(blue, 16))>
     
 <cfset red = IIF(Len(red) LT 2, DE(0&red), DE(red))>
 <cfset green = IIF(Len(green) LT 2, DE(0&green), DE(green))>
 <cfset blue = IIF(Len(blue) LT 2, DE(0&blue), DE(blue))>
     
 <cfset incrementedColor = UCase(red&green&blue)>
     
 <cfreturn incrementedColor>
     
 </cffunction>

oldId: 2012
---

