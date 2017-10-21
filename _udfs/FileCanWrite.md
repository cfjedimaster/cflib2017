---
layout: udf
title:  FileCanWrite
date:   2002-11-14T17:29:30.000Z
library: FileSysLib
argString: "filename"
author: Jesse Houwing
authorEmail: j.houwing@student.utwente.nl
version: 1
cfVersion: CF6
shortDescription: Checks to see if a file can be written to.
description: |
 Checks to see if a file can be written to. It uses the standard Java File object, which makes it very fast under Coldfusion MX.

returnValue: Returns a boolean.

example: |
 <cfset filename="c:\autoexec.bat">
 <cfoutput>
     Can write to: #FileCanWrite(filename)#<br>
 </cfoutput>

args:
 - name: filename
   desc: The name of the file.
   req: true


javaDoc: |
 /**
  * Checks to see if a file can be written to.
  * 
  * @param filename      The name of the file. (Required)
  * @return Returns a boolean. 
  * @author Jesse Houwing (j.houwing@student.utwente.nl) 
  * @version 1, November 14, 2002 
  */

code: |
 function FileCanWrite(filename){
     var daFile = createObject("java", "java.io.File");
     daFile.init(JavaCast("string", filename));
     return daFile.canWrite();
 }

---

