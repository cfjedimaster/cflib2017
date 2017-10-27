---
layout: udf
title:  IsMSSQLGUID
date:   2002-10-03T12:26:55.000Z
library: StrLib
argString: "str"
author: Michael Slatoff
authorEmail: Michael@Slatoff.com
version: 2
cfVersion: CF5
shortDescription: Returns true if the string is a MS SQL GUID.
tagBased: false
description: |
 Returns true if the string is a MS SQL GUID.

returnValue: Returns a boolean.

example: |
 <cfset t = arrayNew(1)>
 <cfset t[1] = "ray">
 <cfset t[2] = createUUID()>
 <cfset t[3] = createGUID()>
 
 <cfloop index="x" from=1 to="#arrayLen(t)#">
     <cfoutput>
     Is #t[x]# a MS SQL GUID? #isMSSQLGUID(t[x])#<br>
     </cfoutput>
 </cfloop>

args:
 - name: str
   desc: String to check.
   req: true


javaDoc: |
 /**
  * Returns true if the string is a MS SQL GUID.
  * Version 2 by Raymond Camden
  * 
  * @param str      String to check. (Required)
  * @return Returns a boolean. 
  * @author Michael Slatoff (Michael@Slatoff.com) 
  * @version 2, October 3, 2002 
  */

code: |
 function IsMSSQLGUID(str) {
     return (reFindNoCase("[0-9a-f]{8,8}-[0-9a-f]{4,4}-[0-9a-f]{4,4}-[0-9a-f]{4,4}-[0-9a-f]{12,12}",str) is 1 and len(str) is 36);
 
 }

oldId: 742
---

