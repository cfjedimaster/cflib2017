---
layout: udf
title:  HTMLHead
date:   2002-10-15T13:05:01.000Z
library: CFMLLib
argString: "text"
author: Kreig Zimmerman
authorEmail: kkz@foureyes.com
version: 1
cfVersion: CF6
shortDescription: Mimics the CFHTMLHEAD tag.
tagBased: true
description: |
 Mimics the CFHTMLHEAD tag, which writes text into the  HEAD portion of the page.

returnValue: Does not return a value.

example: |
 <cfsavecontent variable="headerStuff">
 <cfoutput>
 <script type="text/javascript">
 function msg() { 
 alert('Don\'t touch that.');
 }
 </script>
 </cfoutput>
 </cfsavecontent>
 <cfscript>
 //HTMLHead(headerStuff);
 </cfscript>

args:
 - name: text
   desc: Text to insert.
   req: true


javaDoc: |
 <!---
  Mimics the CFHTMLHEAD tag.
  
  @param text      Text to insert. (Required)
  @return Does not return a value. 
  @author Kreig Zimmerman (kkz@foureyes.com) 
  @version 1, October 15, 2002 
 --->

code: |
 <cffunction name="HTMLHead" output="false" returnType="void">
     <cfargument name="text" type="string" required="yes">
     <cfhtmlhead text="#text#">
 </cffunction>

oldId: 740
---

