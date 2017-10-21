---
layout: udf
title:  getForegroundColor
date:   2009-05-09T23:46:31.000Z
library: StrLib
argString: "backgroundHEX"
author: Scott Lingle
authorEmail: sal21@psu.edu
version: 0
cfVersion: CF5
shortDescription: Determines a light or dark text color based on the given background color.
description: |
 This takes a background color in HEX and returns an appropriate color value (light or dark) to use as a text color.  Uses an algorithm from a draft W3C document on accessibility.

returnValue: returns a string

example: |
 <cfoutput><p style="background-color: ##000033;"><span style="color: #getForegroundColor('##000033')#;">Text Color!</span></p></cfoutput>

args:
 - name: backgroundHEX
   desc: string containing HEX color
   req: true


javaDoc: |
 <!---
  Determines a light or dark text color based on the given background color.
  
  @param backgroundHEX      string containing HEX color (Required)
  @return returns a string 
  @author Scott Lingle (sal21@psu.edu) 
  @version 0, May 9, 2009 
 --->

code: |
 <cffunction name="getForegroundColor" output="false" access="private" returntype="string" hint="gets the appropriate FG color.">
     <cfargument name="backgroundHEX" required="true" />
     <cfscript>
         // clean up the incoming color, strip the pound sign.
         var cleanHex = Replace(arguments.backgroundHEX,"##","");
         // break the hex up and convert to RGB
         var R = InputBaseN(Mid(cleanHex, 1, 2),16);
         var G = InputBaseN(Mid(cleanHex, 3, 2),16);        
         var B = InputBaseN(Mid(cleanHex, 5, 2),16);
         
         //determine the backgrounds 'brightness' (from a W3C Accessibility draft)
         var brightness = ((R * 299) + (G * 587) + (B * 114)) / 1000;
         //determine if it is a light or dark background and set the return to either black or white.
         if(255 - brightness lt 128) {
             return "##000000";
         } else {
             return "##ffffff";
         }
     </cfscript>    
 </cffunction>

---

