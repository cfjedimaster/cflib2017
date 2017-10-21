---
layout: udf
title:  XmlSafeText
date:   2009-07-12T18:48:32.000Z
library: StrLib
argString: "txt"
author: David Hammond
authorEmail: dave@modernsignal.com
version: 0
cfVersion: CF8
shortDescription: Replacement for XmlFormat that also replaces all special characters.
description: |
 This was inspired by the xmlFormat2 function.  I was worried about the performance of that function, however, and so rewrote the same basic functionality using the REMatch function that was introduced in CF8.

returnValue: Returns a string.

example: |
 <cfset s = "text with high-ascii (#chr(982)#) char.">
 <cfoutput>
 <pre>
 #xmlFormat(s)#
 #xmlSafeText(s)#
 </pre>
 </cfoutput>

args:
 - name: txt
   desc: String to format.
   req: true


javaDoc: |
 <!---
  Replacement for XmlFormat that also replaces all special characters.
  
  @param txt      String to format. (Required)
  @return Returns a string. 
  @author David Hammond (dave@modernsignal.com) 
  @version 0, July 12, 2009 
 --->

code: |
 <cffunction name="XmlSafeText" hint="Replaces all characters that would break an xml file." returnType="string" output="false">        
     <cfargument name="txt" type="string" required="true">
     <cfset var chars = "">
     <cfset var replaced = "">
     <cfset var i = "">
     
     <!--- Use XmlFormat function first --->
     <cfset txt = XmlFormat(txt)>
     <!--- Get all other characters to replace. ---> 
     <cfset chars = REMatch("[^[:ascii:]]",txt)>
     <!--- Loop through characters and do replace. Maintain a list of characters already replaced to avoid duplicate work. --->
     <cfloop index="i" from="1" to="#ArrayLen(chars)#">
         <cfif listFind(replaced,chars[i]) is 0>
             <cfset txt = Replace(txt,chars[i],"&##" & asc(chars[i]) & ";","all")>
             <cfset replaced = ListAppend(replaced,chars[i])>
         </cfif>
     </cfloop>
     <cfreturn txt>
 </cffunction>

---

