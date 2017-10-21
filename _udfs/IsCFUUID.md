---
layout: udf
title:  IsCFUUID
date:   2003-11-25T02:17:24.000Z
library: StrLib
argString: "str"
author: Jason Ellison
authorEmail: jgedev@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Returns TRUE if the string is a valid CF UUID.
description: |
 Checks to see if the string passed is a valid CF-style UUID.  A valid UUID is a string which matches the outputed format of the CreateUUID function. Please note that there is a difference between ColdFusion-style UUIDs and Microsoft style UUIDs.

returnValue: Returns a boolean.

example: |
 <CFSET UUID = CreateUUID()>
 <CFSET BAD = "Ray">
 <CFOUTPUT>
 Is #UUID# a UUID? #YesNoFormat(IsCFUUID(UUID))#<BR>
 Is #BAD# a UUID? #YesNoFormat(IsCFUUID(BAD))#<BR>
 </CFOUTPUT>

args:
 - name: str
   desc: String to be checked.
   req: true


javaDoc: |
 /**
  * Returns TRUE if the string is a valid CF UUID.
  * 
  * @param str      String to be checked. (Required)
  * @return Returns a boolean. 
  * @author Jason Ellison (jgedev@hotmail.com) 
  * @version 1, November 24, 2003 
  */

code: |
 function IsCFUUID(str) {      
     return REFindNoCase("^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{16}$", str);
 }

---

