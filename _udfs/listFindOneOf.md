---
layout: udf
title:  listFindOneOf
date:   2005-08-06T03:11:28.000Z
library: StrLib
argString: "list, values[, delimiters]"
author: Sam Curren
authorEmail: telegramsam@byu.edu
version: 1
cfVersion: CF6
shortDescription: returns true if one of the values in the values list is found in the list.
description: |
 returns true if one of the values in the values list is found in the list.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 True: #ListFindOneOf("a.b.c", "f.b", ".")#<br/>
 False: #ListFindOneOf("a.b.c", "d.f", ".")#<br/>
 </cfoutput>

args:
 - name: list
   desc: List of to search.
   req: true
 - name: values
   desc: List of values to search for.
   req: true
 - name: delimiters
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 <!---
  returns true if one of the values in the values list is found in the list.
  
  @param list      List of to search. (Required)
  @param values      List of values to search for. (Required)
  @param delimiters      List delimiter. Defaults to a comma. (Optional)
  @return Returns a boolean. 
  @author Sam Curren (telegramsam@byu.edu) 
  @version 1, August 5, 2005 
 --->

code: |
 <cffunction name="listFindOneOf" output="false" returntype="boolean">
     <cfargument name="list" type="string" required="yes"/>
     <cfargument name="values" type="string" required="yes"/>
     <cfargument name="delimiters" type="string" required="no" default=","/>
     <cfset var value = 0/>
     <cfloop list="#arguments.values#" index="value" delimiters="#arguments.delimiters#">
         <cfif ListFind(arguments.list, value, arguments.delimiters)>
             <cfreturn true />
         </cfif>
     </cfloop>
     <cfreturn false />
 </cffunction>

---

