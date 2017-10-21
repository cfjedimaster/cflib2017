---
layout: udf
title:  indentXml
date:   2010-07-31T03:00:59.000Z
library: CFMLLib
argString: "xml[, indent]"
author: Barney Boisvert
authorEmail: bboisvert@gmail.com
version: 2
cfVersion: CF8
shortDescription: indentXml pretty-prints XML and XML-like markup without requiring valid XML.
description: |
 XML and other markup is much easier to visually scan when the indentation is carefully balanced.  This UDF will reformat markup into properly indented lines.  Unlike most XML pretty-printers, however, it doesn't NOT use XSLT, just simple string manipulation.  This allows it to format pretty much any XML-like markup, well-formed or not.  Non-well-formed markup might not be perfectly indented (e.g. a non-closed BR tag will offset following tags by one stop), but it will at least be indented in a useful fashion.

returnValue: Returns a string.

example: |
 <pre>#htmlEditFormat(indentXml('<html><head><title>Test Page</title></head><body><h1>Hello!</h1></body></html>'))#</pre>

args:
 - name: xml
   desc: XML string to format.
   req: true
 - name: indent
   desc: String used for creating the indention. Defaults to a space.
   req: false


javaDoc: |
 <!---
  indentXml pretty-prints XML and XML-like markup without requiring valid XML.
  
  @param xml      XML string to format. (Required)
  @param indent      String used for creating the indention. Defaults to a space. (Optional)
  @return Returns a string. 
  @author Barney Boisvert (bboisvert@gmail.com) 
  @version 2, July 30, 2010 
 --->

code: |
 <cffunction name="indentXml" output="false" returntype="string">
   <cfargument name="xml" type="string" required="true" />
   <cfargument name="indent" type="string" default="  "
     hint="The string to use for indenting (default is two spaces)." />
   <cfset var lines = "" />
   <cfset var depth = "" />
   <cfset var line = "" />
   <cfset var isCDATAStart = "" />
   <cfset var isCDATAEnd = "" />
   <cfset var isEndTag = "" />
   <cfset var isSelfClose = "" />
   <cfset xml = trim(REReplace(xml, "(^|>)\s*(<|$)", "\1#chr(10)#\2", "all")) />
   <cfset lines = listToArray(xml, chr(10)) />
   <cfset depth = 0 />
   <cfloop from="1" to="#arrayLen(lines)#" index="i">
     <cfset line = trim(lines[i]) />
     <cfset isCDATAStart = left(line, 9) EQ "<![CDATA[" />
     <cfset isCDATAEnd = right(line, 3) EQ "]]>" />
     <cfif NOT isCDATAStart AND NOT isCDATAEnd AND left(line, 1) EQ "<" AND right(line, 1) EQ ">">
       <cfset isEndTag = left(line, 2) EQ "</" />
       <cfset isSelfClose = right(line, 2) EQ "/>" OR REFindNoCase("<([a-z0-9_-]*).*</\1>", line) />
       <cfif isEndTag>
         <!--- use max for safety against multi-line open tags --->
         <cfset depth = max(0, depth - 1) />
       </cfif>
       <cfset lines[i] = repeatString(indent, depth) & line />
       <cfif NOT isEndTag AND NOT isSelfClose>
         <cfset depth = depth + 1 />
       </cfif>
     <cfelseif isCDATAStart>
       <!---
       we don't indent CDATA ends, because that would change the
       content of the CDATA, which isn't desirable
       --->
       <cfset lines[i] = repeatString(indent, depth) & line />
     </cfif>
   </cfloop>
   <cfreturn arrayToList(lines, chr(10)) />
 </cffunction>

---

