---
layout: udf
title:  stringHours
date:   2010-11-26T23:03:59.000Z
library: DateLib
argString: "mins"
author: Ryan Jeffords
authorEmail: rjeffords@me.com
version: 1
cfVersion: CF6
shortDescription: Formats a number of minutes into into a nicely formatted string.
description: |
 This simple UDF will accept a number of minutes and return a string containing the format: &quot;N hours N mins&quot;.  This format can be slightly more optimal then just displaying &quot;140 mins&quot;.

returnValue: Returns a string.

example: |
 <cfoutput>
 <ul>
     <li>#stringHours("123")#</li>
     <li>#stringHours("568")#</li>
     <li>#stringHours("56")#</li>
     <li>#stringHours("3")#</li>
     <li>#stringHours("1357")#</li>
     <li>#stringHours("99")#</li>
     <li>#stringHours("45.26")#</li>
     <li>#stringHours("9871")#</li>
     <li>#stringHours("54")#</li>
     <li>#stringHours("10")#</li>
 </ul>
 </cfoutput>

args:
 - name: mins
   desc: Numerical number of minutes.
   req: true


javaDoc: |
 <!---
  Formats a number of minutes into into a nicely formatted string.
  
  @param mins      Numerical number of minutes. (Required)
  @return Returns a string. 
  @author Ryan Jeffords (rjeffords@me.com) 
  @version 1, November 26, 2010 
 --->

code: |
 <cffunction name="stringHours" returntype="string" output="false">
     <cfargument name="mins" type="numeric" required="true" />
     
     <cfset var retVal = "" />
     <cfset var rawHours = mins/60 />
     
     <!--- Calculate the hours --->
     <cfset var hours = int(rawhours) />    
     <cfif hours is "1">
         <cfset hours = hours & " hour " />
     <cfelse>
         <cfset hours = hours & " hours " />
     </cfif>
     
     <!--- Calculate the minutes --->
     <cfset mins = round((rawHours - int(rawHours)) * 60) />    
     <cfif mins is "1">
         <cfset mins = mins & " min " />
     <cfelse>
         <cfset mins = mins & " mins " />    
     </cfif>
     
     <!--- Add the hours --->
     <cfif left(hours, 1) IS NOT 0>
         <cfset retVal = hours />
     </cfif>
     
     <!--- Now bring them all together --->
     <cfif left(mins, 1) IS NOT 0>
         <cfset retVal = retVal & mins />
     </cfif>
     
     <cfreturn retVal />
 </cffunction>

---

