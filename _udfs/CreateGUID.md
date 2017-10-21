---
layout: udf
title:  CreateGUID
date:   2001-07-17T18:56:15.000Z
library: StrLib
argString: ""
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Returns a UUID in the Microsoft form.
description: |
 Modifies the CF CreateUUID() function to return a UUID in the form that Microsoft uses.

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 CreateGUID returns #CreateGUID()#<BR>
 </CFOUTPUT>

args:


javaDoc: |
 /**
  * Returns a UUID in the Microsoft form.
  * 
  * @return Returns a string. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, July 17, 2001 
  */

code: |
 function CreateGUID() {
     return insert("-", CreateUUID(), 23);
 }

---

