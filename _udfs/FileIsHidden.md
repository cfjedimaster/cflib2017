---
layout: udf
title:  FileIsHidden
date:   2002-11-15T17:53:47.000Z
library: FileSysLib
argString: "FIlename"
author: Jesse Houwing
authorEmail: j.houwing@student.utwente.nl
version: 1
cfVersion: CF6
shortDescription: Returns if a file is hidden or not.
tagBased: false
description: |
 Returns if a file is hidden or not. It uses the native java.io.File class and is therefore very fast in Coldfusion MX.

returnValue: Returns a boolean..

example: |
 <cfset filename="c:\autoexec.bat">
 <cfoutput>
     IsHidden: #FileIsHidden(filename)#
 </cfoutput>

args:
 - name: FIlename
   desc: Filename to use.
   req: true


javaDoc: |
 /**
  * Returns if a file is hidden or not.
  * 
  * @param FIlename      Filename to use. (Required)
  * @return Returns a boolean.. 
  * @author Jesse Houwing (j.houwing@student.utwente.nl) 
  * @version 1, November 15, 2002 
  */

code: |
 function FileIsHidden(filename){
     var _File =  createObject("java", "java.io.File");
     _File.init(JavaCast("string", filename));
     return _File.isHidden();
 }

oldId: 793
---

