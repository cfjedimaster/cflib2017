---
layout: udf
title:  parseQuotedPrintable
date:   2007-01-10T12:18:23.000Z
library: StrLib
argString: "text"
author: Isaac Dealey
authorEmail: info@turnkey.to
version: 1
cfVersion: CF6
shortDescription: Converts a string of text from Quoted-Printable format to UTF-8.
tagBased: true
description: |
 Allows a string which is encoded with the Quoted-Printable format to be converted into UTF-8 for parsing various document formats such as vCard and iCal.

returnValue: Returns a string.

example: |
 <cfoutput>#ParseQuotedPrintable("1=3D1")#</cfoutput>

args:
 - name: text
   desc: String to parse.
   req: true


javaDoc: |
 <!---
  Converts a string of text from Quoted-Printable format to UTF-8.
  
  @param text      String to parse. (Required)
  @return Returns a string. 
  @author Isaac Dealey (info@turnkey.to) 
  @version 1, January 10, 2007 
 --->

code: |
 <cffunction name="parseQuotedPrintable" output="false">
     <cfargument name="text" type="string" required="true">
     <cfset var crlf = chr(13) & chr(10)>
     <cfset var char = "">
     <cfset var x = 0>
     
     <cfset text = ListToArray(crlf & text,"=")>
     <cfloop index="x" from="1" to="#arrayLen(text)#">
         <cfset char = left(text[x],2)>
         <cfset text[x] = removechars(text[x],1,2)>
         <cfif char is not crlf>
             <cfset text[x] = CHR(InputBaseN(char, 16)) & text[x]>
         </cfif>
     </cfloop>
     
     <cfreturn ArrayToList(text,"")>
 </cffunction>

oldId: 1553
---

