---
layout: udf
title:  getExtension
date:   2003-05-09T17:14:26.000Z
library: FileSysLib
argString: "name"
author: Alexander Sicular
authorEmail: as867@columbia.edu
version: 2
cfVersion: CF5
shortDescription: Returns extension defined by all characters following last period.
description: |
 Submit a filename and function will return extension. If no period exists in the filename, an empty string is returned.

returnValue: Returns a string.

example: |
 <cfset tmp = "some text.stuff. . .this.that">
 <cfoutput>
 getExtension(tmp) = #getExtension(tmp)#
 </cfoutput>

args:
 - name: name
   desc: File name to use.
   req: true


javaDoc: |
 /**
  * Returns extension defined by all characters following last period.
  * v2 by Ray Camden
  * 
  * @param name      File name to use. (Required)
  * @return Returns a string. 
  * @author Alexander Sicular (as867@columbia.edu) 
  * @version 2, May 9, 2003 
  */

code: |
 function getExtension(name) {  
     if(find(".",name)) return listLast(name,".");
     else return "";
 }

---

