---
layout: udf
title:  chrex
date:   2004-07-15T19:30:16.000Z
library: StrLib
argString: "value[, charset][, radix]"
author: Hiroshi Okugawa
authorEmail: okugawa@mail.com
version: 1
cfVersion: CF6
shortDescription: Charset attribute enabled extended chr function.
tagBased: true
description: |
 Charset attribute enabled extended chr function.

returnValue: Returns a string.

example: |
 <cfoutput>#chrex("53 4A 49 53 82 CC 95 B6  8E 9A 0D 0A")#</cfoutput>
 <hr>
 <cfoutput>#chrex("a4 a2 a4 a4 a4 a6 a4 a8 a4 aa", "EUCJP")#</cfoutput>
 <hr>
 <cfoutput>#chrex("144 86", "MS932", "10")#</cfoutput>

args:
 - name: value
   desc: Value to encode.
   req: true
 - name: charset
   desc: Character set. Defaults to systems default.
   req: false
 - name: radix
   desc: Radix for value.
   req: false


javaDoc: |
 <!---
  Charset attribute enabled extended chr function.
  
  @param value      Value to encode. (Required)
  @param charset      Character set. Defaults to systems default. (Optional)
  @param radix      Radix for value. (Optional)
  @return Returns a string. 
  @author Hiroshi Okugawa (okugawa@mail.com) 
  @version 1, July 15, 2004 
 --->

code: |
 <cffunction name="chrex" return="string" output="false">
   <cfargument name="value" type="string" required="true">
   <cfargument name="charset" type="string" required="false" default="">
   <cfargument name="radix" type="numeric" required="false" default="16">
   <cfset var a="">
   <cfset var tmp="">
   <cfset var st = "">
   <cfset var integer = "">
   <cfset var string = "">
   <cfset var byte = "">
   <cfset var system = "">
   
   <cfobject type="java" class="java.util.StringTokenizer" action="create" name="st">
   <cfobject type="java" class="java.lang.Integer" action="create" name="integer">
   <cfobject type="java" class="java.lang.String" action="create" name="string">
   <cfobject type="java" class="java.lang.Byte" action="create" name="byte">
 
   <cfif not len(arguments.charset)>
     <cfobject type="java" class="java.lang.System" action="create" name="system">
     <cfset arguments.charset=system.getProperty("file.encoding")>
   </cfif>
  
   <cfset a=arraynew(1)>
   <cfset st.init(arguments.value, " ,#chr(9)#")>
   <cfloop condition="#st.hasMoreTokens()#">
     <cfset tmp=integer.parseInt(st.nextToken(), arguments.radix)>
     <cfset arrayappend(a, byte.init(tmp))>
   </cfloop>
   <cfreturn string.init(a, arguments.charset)>
 </cffunction>

---

