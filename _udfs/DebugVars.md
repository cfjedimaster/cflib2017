---
layout: udf
title:  DebugVars
date:   2003-04-30T09:31:57.000Z
library: UtilityLib
argString: "[scopes]"
author: Eric C. Davis
authorEmail: cflib@10mar2001.com
version: 1
cfVersion: CF6
shortDescription: Outputs a load of variables for debugging purposes.
tagBased: true
description: |
 Output more extensive debugging information than just the CF debug info, using the &lt;cfdump&gt; tag. It fits easiest at the end of the template, but can be placed anywhere.

returnValue: Returns a string.

example: |
 <cfset DebugInfo = DebugVars("url") />
 <cfoutput>
   #DebugInfo#
 </cfoutput>

args:
 - name: scopes
   desc: Scopes to display. Must be one of&#58; variables,form,url,request,cookie,session,client,application,server,cgi
   req: false


javaDoc: |
 <!---
  Outputs a load of variables for debugging purposes.
  
  @param scopes      Scopes to display. Must be one of: variables,form,url,request,cookie,session,client,application,server,cgi (Optional)
  @return Returns a string. 
  @author Eric C. Davis (cflib@10mar2001.com) 
  @version 1, April 30, 2003 
 --->

code: |
 <cffunction name="debugVars" output="true" returntype="string" access="public" hint="Output more extensive debugging information than just the CF debug info" displayname="DebugVars()">
    <cfargument name="scopes" required="false" default="variables,form,url,request,cookie,session,client,application,server,cgi" hint="Scopes to be dumped" type="string" displayname="Scopes" />
    <cfsavecontent variable="returnVar">
       <cfloop list="#arguments.scopes#" index="myScope" delimiters=",">
          <cftry>
             <cfdump label="#Trim(myScope)#" var="#Evaluate(Trim(myScope))#" />
             <cfcatch>
                <cfoutput>
                   #cfcatch.Message#
                </cfoutput>
             </cfcatch>
          </cftry>
       </cfloop>
    </cfsavecontent>
    <cfreturn returnVar />
 </cffunction>

oldId: 834
---

