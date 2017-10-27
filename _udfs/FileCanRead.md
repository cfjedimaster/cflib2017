---
layout: udf
title:  FileCanRead
date:   2002-11-14T17:29:18.000Z
library: FileSysLib
argString: "[filename]"
author: Jesse Houwing
authorEmail: j.houwing@student.utwente.nl
version: 1
cfVersion: CF6
shortDescription: Checks if a file can be read.
tagBased: false
description: |
 Checks if a file can be read. It uses the standard Java File object, which makes it very fast under Coldfusion MX

returnValue: Returns a boolean.

example: |
 <cfset filename="c:\autoexec.bat">
 <cfoutput>
     Length: #FileCanRead(filename)#<br>
 </cfoutput>

args:
 - name: filename
   desc: The file to check.
   req: false


javaDoc: |
 /**
  * Checks if a file can be read.
  * 
  * @param filename      The file to check. (Optional)
  * @return Returns a boolean. 
  * @author Jesse Houwing (j.houwing@student.utwente.nl) 
  * @version 1, November 14, 2002 
  */

code: |
 function FileCanRead(filename){
     var daFile = createObject("java", "java.io.File");
     daFile.init(JavaCast("string", filename));
     return daFile.canRead();
 }

oldId: 789
---

