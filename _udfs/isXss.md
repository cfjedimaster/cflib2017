---
layout: udf
title:  isXss
date:   2011-02-23T05:53:23.000Z
library: SecurityLib
argString: "field"
author: MIchael Bramwell
authorEmail: mbramwell@gmail.com
version: 1
cfVersion: CF8
shortDescription: Checks against all the possible combinations of the character &quot;&lt;&quot; in HTML and JavaScript (in UTF-8) and returns a boolean value based on the result.
tagBased: true
description: |
 Checks against all the possible combinations of the character &quot;&lt;&quot; in HTML and JavaScript (in UTF-8) and returns a boolean value based on the result. This can prove useful in passing PCI compliance automated scanning.

returnValue: Returns a boolean.

example: |
 <cfparam name="hasSecurityError" default="false">
 
 <form method="POST">
     <input type="text" name="foo">
     <input type="text" name="who">
     <input type="submit">
 </form>
 
 <cfif structKeyExists(form, "fieldnames")>
     
     <cfloop list="#form.fieldNames#" index="i">
         
         <cfif isXss(form[i])>
             <cfset hasSecurityError = true>
             <cfbreak>
         </cfif>
     </cfloop>
 </cfif>
 
 <cfdump var="#hasSecurityError#">

args:
 - name: field
   desc: String to check.
   req: true


javaDoc: |
 <!---
  Checks against all the possible combinations of the character &quot;&lt;&quot; in HTML and JavaScript (in UTF-8) and returns a boolean value based on the result.
  
  @param field      String to check. (Required)
  @return Returns a boolean. 
  @author MIchael Bramwell (mbramwell@gmail.com) 
  @version 1, February 22, 2011 
 --->

code: |
 <cffunction name="isXss" hint="" access="public" returntype="boolean">
     <cfargument name="field" type="string" required="yes" />
     
     <cfset var bReturn = false />
     <cfset var encodingsOfLessThan = "<
 %3C
 &lt
 &lt;
 &LT
 &LT;
 &##
 &##60
 &##060
 &##0060
 &##00060
 &##000060
 &##0000060
 &##60;
 &##060;
 &##0060;
 &##00060;
 &##000060;    
 &##0000060;
 &##x3c
 &##x03c
 &##x003c
 &##x0003c
 &##x00003c
 &##x000003c
 &##x3c;
 &##x03c;
 &##x003c;
 &##x0003c;
 &##x00003c;
 &##x000003c;
 &##X3c
 &##X03c
 &##X003c
 &##X0003c
 &##X00003c
 &##X000003c
 &##X3c;
 &##X03c;
 &##X003c;
 &##X0003c;
 &##X00003c;
 &##X000003c;
 &##x3C
 &##x03C
 &##x003C
 &##x0003C
 &##x00003C
 &##x000003C
 &##x3C;
 &##x03C;
 &##x003C;
 &##x0003C;
 &##x00003C;
 &##x000003C;
 &##X3C
 &##X03C
 &##X003C
 &##X0003C
 &##X00003C
 &##X000003C
 &##X3C;
 &##X03C;
 &##X003C;
 &##X0003C;
 &##X00003C;
 &##X000003C;
 \x3c
 \x3C
 \u003c
 \u003C">
     
     <cfloop list="#encodingsOfLessThan#" index="i" delimiters="#chr(10)#">
         
         <cfif Find(i, arguments.field)>
             <cfset bReturn = true >
         </cfif>
     </cfloop>
     
     <cfreturn bReturn />
     
 </cffunction>

oldId: 2116
---

