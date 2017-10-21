---
layout: udf
title:  IsNull
date:   2002-05-01T20:02:16.000Z
library: DataManipulationLib
argString: "val[, NullIdentifier]"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns True if the value passed to it represents &quot;NULL&quot;.
description: |
 Returns True if the value passed to it represents &quot;NULL&quot;.  Useful for setting NULLs in the NULL attribute of CFPROCPARAM.

returnValue: Returns a Boolean.

example: |
 <cfparam name="DieSizeX" Default = "">
 <cfoutput>
 Is DieSizeX NULL: #IsNull(DieSizeX)#
 </cfoutput>
 <p>
 Here's what it would look like in an SP:
 <p>
 cfprocparam type="In" cfsqltype="CF_SQL_VARCHAR" dbvarname="@pack" value="#Attributes.package_type#" maxlength="25" null="#IsNull(Attributes.package_type)#"

args:
 - name: val
   desc: Value to evaluate for NULL.
   req: true
 - name: NullIdentifier
   desc: String that represents NULL.  Default is an empty string ("").
   req: false


javaDoc: |
 /**
  * Returns True if the value passed to it represents &quot;NULL&quot;.
  * 
  * @param val      Value to evaluate for NULL. (Required)
  * @param NullIdentifier      String that represents NULL.  Default is an empty string (""). (Optional)
  * @return Returns a Boolean. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, May 1, 2002 
  */

code: |
 function IsNull(val){
   var NullIdentifier = "";
   if (ArrayLen(Arguments) gte 2) 
     NullIdentifier = Arguments[2];
   if (val is NullIdentifier) {
     return True;
   }
   else {
     return False;
   }
 }

---

