---
layout: udf
title:  parseRawForm
date:   2005-09-08T02:59:56.000Z
library: UtilityLib
argString: ""
author: Ken Fricklas
authorEmail: kenf@accessnet.net
version: 1
cfVersion: CF6
shortDescription: Parses Form data structure out of HTTP header; this leaves empty entries in, unlike CFMX.
description: |
 Since Coldfusion dumps out the empty form fields, this can mess up code that depends on blank fields for placeholders.  This version keeps them in the lists.

returnValue: Returns a structure.

example: |
 <HTML>
 <body>
 <!--- assuming fn is in parseFn.cfm --->
 <cfinclude template="parseFn.cfm">
 <cfoutput>
 <form action="#cgi.SCRIPT_NAME#" method="post">
 Text:<input type="text" name="a" value="">
 <BR>blank:
 <cfloop from="1" to="10" index="i">
     <input type="checkbox" name="a" size="1" value="">
 </cfloop>
 <BR>1:
 <cfloop from="1" to="10" index="i">
     <input type="checkbox" name="a" size="1" value="1">
 </cfloop>
 <BR>
 <input type="submit">
 </form>
 </cfoutput>
 <Cfdump var="#form#">
 <cfscript>
     aK = structKeyArray(form);
     ArraySort(aK, 'text');
     for (i = 1; i LTE arrayLen(ak); i=i+1) {
         writeOutput("Item: #ak[i]#: len: #ListLen(form["#ak[i]#"])#<BR>");
     }
 </cfscript>
 <cfdump var="#parseRawForm()#" label="parseForm()">
 <Cfdump var="#GetHttpRequestData()#" label="raw http">
 </body>
 </html>

args:


javaDoc: |
 <!---
  Parses Form data structure out of HTTP header; this leaves empty entries in, unlike CFMX.
  
  @return Returns a structure. 
  @author Ken Fricklas (kenf@accessnet.net) 
  @version 1, September 7, 2005 
 --->

code: |
 <cffunction name="parseRawForm" returnType="struct" output="false">
     <cfset var raw = GetHttpRequestData().content>
     <cfset var sNewForm = structNew()>
     <cfset var iKey = "">
     <cfset var iVal = "">
 
     <cfloop list="#raw#" index="iHdr" delimiters="&">
         <cfif right(iHdr,1) EQ "=">
             <cfset iKey = ucase(left(iHdr, len(iHdr) - 1))>
             <cfset iVal = "">
         <cfelse>
             <cfset iKey = ucase(getToken(iHdr, 1, "="))>
             <cfset iVal = getToken(iHdr, 2, "=")>
         </cfif>
         <cfif structKeyExists(sNewForm, iKey)>
             <cfset sNewForm[iKey] = sNewForm[iKey] & ",#iVal#">
         <cfelse>
             <cfset sNewForm[iKey] = URLDecode(iVal)>
         </cfif>
     </cfloop>
     <cfset sNewform.fieldnames = structKeyList(sNewForm)>
     <cfreturn sNewForm>
 </cffunction>

---

