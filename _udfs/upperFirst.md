---
layout: udf
title:  upperFirst
date:   2010-03-17T07:01:35.000Z
library: StrLib
argString: "name"
author: Brian Meloche
authorEmail: brianmeloche@gmail.com
version: 0
cfVersion: CF5
shortDescription: Upper cases the first letter of a string.
description: |
 Converts the first letter of a string to upper case, while keeping the rest of the string as is.

returnValue: Returns a string.

example: |
 <cfoutput>
 #upperFirst("myFirst")#
 </cfoutput>

args:
 - name: name
   desc: String to capitalize the first letter of
   req: true


javaDoc: |
 <!---
  Upper cases the first letter of a string.
  Phil Arnold (philip.r.j.arnold@googlemail.com
  
  @param name      String to capitalize the first letter of (Required)
  @return Returns a string. 
  @author Brian Meloche (brianmeloche@gmail.com) 
  @version 0, March 17, 2010 
 --->

code: |
 <cffunction name="upperFirst" access="public" returntype="string" output="false" hint="I convert the first letter of a string to upper case, while leaving the rest of the string alone.">
         <cfargument name="name" type="string" required="true">
         <cfreturn uCase(left(arguments.name,1)) & right(arguments.name,len(arguments.name)-1)>
 </cffunction>

---

