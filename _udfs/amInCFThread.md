---
layout: udf
title:  amInCFThread
date:   2008-04-11T12:24:37.000Z
library: UtilityLib
argString: ""
author: Mark Mandel
authorEmail: mark@compoundtheory.com
version: 1
cfVersion: CF8
shortDescription: returns 'true' if the currentthread is a cfthread, rerturns false otherwise
tagBased: true
description: |
 Allows for the checking of executing code is being run inside a cfthread block or not.

returnValue: Returns a boolean.

example: |
 <cfscript>
     //get the response writer, so we can write to the HTTP Stream 
     //from within a cfthread call
     out = getPageContext().getResponse().getWriter();
 
     out.write("on cfthread: " & amInCFThread());
 </cfscript>
 
 <hr>
 <cfthread action="run" name="test">
     <cfscript>
         out.write("on cfthread: " & amInCFThread());
     </cfscript>
 </cfthread>

args:


javaDoc: |
 <!---
  returns 'true' if the currentthread is a cfthread, rerturns false otherwise
  
  @return Returns a boolean. 
  @author Mark Mandel (mark@compoundtheory.com) 
  @version 1, April 11, 2008 
 --->

code: |
 <cffunction name="amInCFThread" hint="returns 'true' if the current thread if a cfthread, rerturns false otherwise" access="public" returntype="boolean" output="false">
     <cfscript>
         var Thread = createObject("java", "java.lang.Thread");
 
         if(Thread.currentThread().getThreadGroup().getName() eq "cfthread")
         {
             return true;
         }
 
         return false;
     </cfscript>
 </cffunction>

oldId: 1816
---

