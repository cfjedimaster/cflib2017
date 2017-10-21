---
layout: udf
title:  SmallCaps
date:   2013-07-18T07:44:52.000Z
library: StrLib
argString: "inputText[, largerClassName]"
author: Joshua Siok
authorEmail: Joshua.Siok@gmail.com
version: 1
cfVersion: CF9
shortDescription: Formats a string to simulate the small-caps style without using the css font-variant attribute.
description: |
 This UDF takes the first character of each word and wraps it in a class name so you can easily simulate the &quot;font-variant:small-caps&quot; functionality.  I found this necessary to get this type of styling inside the CFDOCUMENT tag which does not support font-variant.  Some simple CSS is needed with this as well.

returnValue: A string wrapped with CSS to emulate font-variant&#58;small-caps

example: |
 <cfset TextToConvert = "Title of a Book">
 <cfdocument format="PDF" filename="#expandPath('./smallCaps.pdf')#" overwrite="true">
 <cfoutput>
 <html>
     <head>
         <style type="text/css" media="screen">
             .SmallCaps{font-size:24pt;}
             .SmallCaps .SCLarger{font-size:36pt;}
         </style>
     </head>
     <body>
         <div class="SmallCaps">#SmallCaps(TextToConvert)#</div>
         
         <div style="font-variant:small-caps">#TextToConvert#</div>
     </body>
 </html>
 </cfoutput>
 </cfdocument>

args:
 - name: inputText
   desc: String to format
   req: true
 - name: largerClassName
   desc: CSS class to use for larger caps
   req: false


javaDoc: |
 <!---
  Formats a string to simulate the small-caps style without using the css font-variant attribute.
  v1.0 by Joshua Siok
  
  @param inputText      String to format (Required)
  @param largerClassName      CSS class to use for larger caps (Optional)
  @return A string wrapped with CSS to emulate font-variant:small-caps 
  @author Joshua Siok (Joshua.Siok@gmail.com) 
  @version 1, July 18, 2013 
 --->

code: |
 <cffunction name="smallCaps" returntype="string" access="public" output="false" description="Styles and returns text.">
     <cfargument name="inputText" type="string" required="true">
     <cfargument name="largerClassName" type="string" required="false" default="SCLarger">
     <cfset inputText = ucase(trim(inputText))>
     <cfset var prefixText = '<span class="#largerClassName#">'>
     <cfset var suffixtext = '</span>'>
     <cfset var outputText = prefixText><!--- ALWAYS START WITH A LARGE LETTER--->
     <cfset var insertSuffixAfterNextChar = true><!--- THIS WILL TELLS OUR LOOP WHEN TO INSERT THE SUFFIXTEXT--->
     <cfset var i = 0>
         
     <!--- WE'RE GOING LOOP THROUGH AND WRAP THE FIRST LETTER OF EACH WORD IN A SPAN CLASS BLOCK---->
     <cfloop from="1" to="#len(inputText)#" index="i">
         <cfset var currentChar = Mid(inputText,i,1)>
         <cfset outputText = outputText & currentChar>
         <cfif insertSuffixAfterNextChar>
             <cfset outputText = outputText & SuffixText>
             <cfset insertSuffixAfterNextChar = false><!---NOT TO INSERT THE SUFFIXTEXT NEXT TIME--->
         </cfif>    
         <cfif currentChar EQ " ">
             <cfset outputText = outputText & prefixText><!--- ALWAYS ADD THE PREFIXTEXT AFTER A SPACE--->
             <cfset insertSuffixAfterNextChar = true><!--- THIS WILL TELLS OUR LOOP TO INSERT THE SUFFIXTEXT--->
         </cfif>
     </cfloop>    
     <cfreturn outputText>
 </cffunction>

---

