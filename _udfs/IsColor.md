---
layout: udf
title:  IsColor
date:   2009-05-09T23:30:39.000Z
library: StrLib
argString: "color"
author: Jon Hartmann
authorEmail: jon.hartmann@gmail.com
version: 0
cfVersion: CF8
shortDescription: Checkes to see if a color is a valid 3 or 6 character hex color, or one of the ColdFusion safe color keywords.
description: |
 Checkes to see if a color is a valid 3 or 6 character hex color, or one of the ColdFusion safe color keywords (aqua, black, blue, fuchsia, gray,  green, lime, maroon, navy, olive, purple, red, silver, teal, white, and yellow).

returnValue: returns a Boolean

example: |
 Is #fff a valid color? <cfdump var="#IsColor('##fff')#"><br />
 Is #0fff a valid color? <cfdump var="#IsColor('##0fff')#"><br />
 Is #000fff a valid color? <cfdump var="#IsColor('##000fff')#"><br />
 Is blue a valid color? <cfdump var="#IsColor('blue')#"><br />
 Is brown a valid color? <cfdump var="#IsColor('brown')#">

args:
 - name: color
   desc: string of color to test
   req: true


javaDoc: |
 <!---
  Checkes to see if a color is a valid 3 or 6 character hex color, or one of the ColdFusion safe color keywords.
  
  @param color      string of color to test (Required)
  @return returns a Boolean 
  @author Jon Hartmann (jon.hartmann@gmail.com) 
  @version 0, May 9, 2009 
 --->

code: |
 <cffunction name="IsColor" access="public" output="false" returntype="boolean">
     <cfargument name="color" type="string" required="true" />
         
     <cfset var local = structNew() />
     <cfset local.colorNames = "aqua,black,blue,fuchsia,gray,green,lime,maroon,navy,olive,purple,red,silver,teal,white,yellow" />
     <cfset local.regex = "^(##([\dA-F]{3}|[\dA-F]{6})|([\dA-F]{3}|[\dA-F]{6}))$" />
     <cfset local.returnValue = false />
         
     <cfif listFind(local.colorNames, arguments.color) OR arrayLen(REMatchNoCase(local.regex, arguments.color)) gt 0>
         <cfset local.returnValue = true />
     </cfif>
     
     <cfreturn local.returnValue />
 </cffunction>

---

