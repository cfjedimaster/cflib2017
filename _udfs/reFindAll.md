---
layout: udf
title:  reFindAll
date:   2011-10-12T02:15:52.000Z
library: StrLib
argString: "regExpression, string[, start][, caseSensitive]"
author: Raymond Selzer
authorEmail: raymond@kingcommedia.com
version: 1
cfVersion: CF6
shortDescription: Finds all occurences of a regex in a string.
tagBased: true
description: |
 Like Ben Forta's reFindAll (which this replaces), except case sensitivity can be toggled and a start position can be defined. Also it returns an array of structs instead of one big struct

returnValue: Returns an array of structs.

example: |
 <cfdump var="#refindall('CAT_([\d]+)','SUBMIT2CAT_1CAT_2CAT_3cat_4',1,false)#">

args:
 - name: regExpression
   desc: The regular expression to test with
   req: true
 - name: string
   desc: String to search.
   req: true
 - name: start
   desc: Starting position. Defaults to 1.
   req: false
 - name: caseSensitive
   desc: Whether or not to use case sensitive matching.  Defaults to false.
   req: false


javaDoc: |
 <!---
  Finds all occurences of a regex in a string.
  
  @param regExpression      The regular expression to test with (Required)
  @param string      String to search. (Required)
  @param start      Starting position. Defaults to 1. (Optional)
  @param caseSensitive      Whether or not to use case sensitive matching.  Defaults to false. (Optional)
  @return Returns an array of structs. 
  @author Raymond Selzer (raymond@kingcommedia.com) 
  @version 1, October 11, 2011 
 --->

code: |
 <cffunction name="reFindAll" output="yes" returntype="array">
     <cfargument name="regExpression" type="string" required="yes">
     <cfargument name="string" type="string" required="yes">
     <cfargument name="start" type="numeric" required="no" default="1">
     <cfargument name="caseSensitive" type="boolean" required="no" default="false">
     
     <cfset var result = arrayNew(1)>
     <cfset var matches = ''>
     
     <cfif caseSensitive>
         <cfset matches = refind(regExpression,string,start,true)>
     <cfelse>
         <cfset matches = refindnocase(regExpression,string,start,true)>
     </cfif>
     
     <cfloop condition="#matches.len[1]# neq 0">
         
         <cfset result[arraylen(result) + 1] = matches> 
         <cfset start = matches.pos[1] + matches.len[1]>
         
         <cfif caseSensitive>
             <cfset matches = refind(regExpression,string,start,true)>
         <cfelse>
             <cfset matches = refindnocase(regExpression,string,start,true)>
         </cfif>
         
     </cfloop>
     
     <cfreturn result>
 </cffunction>

---

