---
layout: udf
title:  customTagContext
date:   2003-05-09T18:46:56.000Z
library: UtilityLib
argString: ""
author: Matthew Walker
authorEmail: matthew@electricsheep.co.nz
version: 1
cfVersion: CF6
shortDescription: Return the calling template for a custom tag.
description: |
 customTagContext returns the absolute path of the calling template of a custom tag. This is useful where the custom tag may want to access resources relative to the path of the calling template rather than relative to the path of the tag. This code may be adapted for CF5 by inserting it directly rather than calling as a UDF, and changing the &quot;3&quot;s to &quot;2&quot;s.

returnValue: Returns a string.

example: |
 <cfoutput>#customTagContext()#</cfoutput>

args:


javaDoc: |
 <!---
  Return the calling template for a custom tag.
  
  @return Returns a string. 
  @author Matthew Walker (matthew@electricsheep.co.nz) 
  @version 1, May 9, 2003 
 --->

code: |
 <cffunction name="customTagContext">
     <cfset var parentTemplate = "">
     <cftry>
         <cfthrow>
         <cfcatch>
             <cfif arrayLen(cfcatch.tagcontext) gte 3>
                 <cfset parentTemplate = cfcatch.tagcontext[3].template>
             </cfif>
         </cfcatch>
     </cftry>
     <cfreturn parentTemplate>
 </cffunction>

---

