---
layout: udf
title:  FileSetReadOnly
date:   2002-11-15T17:54:06.000Z
library: FileSysLib
argString: "filename"
author: Jesse Houwing
authorEmail: j.houwing@student.utwente.nl
version: 1
cfVersion: CF6
shortDescription: Makes a file ReadOnly.
description: |
 Makes a file ReadOnly. WARNING: there is no way to make it writable again from Coldfusion. It uses the standard Java File object, which makes it very fast under Coldfusion MX.

returnValue: Returns nothing.

example: |
 <!---
 <cfset filename="c:\autoexec.bat">
 <cfset FileSetReadOnly(filename)>
 --->

args:
 - name: filename
   desc: Filename to use.
   req: true


javaDoc: |
 /**
  * Makes a file ReadOnly.
  * 
  * @param filename      Filename to use. (Required)
  * @return Returns nothing. 
  * @author Jesse Houwing (j.houwing@student.utwente.nl) 
  * @version 1, November 15, 2002 
  */

code: |
 function FileSetReadOnly(filename){
     var _File =  createObject("java", "java.io.File");
     _File.init(JavaCast("string", filename));
     _File.setReadOnly();
 }

---

