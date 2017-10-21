---
layout: udf
title:  UniqueFilename
date:   2004-09-20T12:21:33.000Z
library: FileSysLib
argString: "prepend, ext"
author: Joshua Miller
authorEmail: joshuamil@gmail.com
version: 2
cfVersion: CF5
shortDescription: Creates a unique filename from a passed prefix, file extension and current date/time.
description: |
 Creates a unique filename from a passed prefix, file extension and current date/time. Filename format: prepend_080701_023052.ext

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 #uniquefilename('nws','xml')#
 </CFOUTPUT>

args:
 - name: prepend
   desc: Prefix for the filename.
   req: true
 - name: ext
   desc: Extension to give the file.
   req: true


javaDoc: |
 /**
  * Creates a unique filename from a passed prefix, file extension and current date/time.
  * Modified by RCamden, changed hh to HH, thanks to Nathan D. for idea.
  * 
  * @param prepend      Prefix for the filename. (Required)
  * @param ext      Extension to give the file. (Required)
  * @return Returns a string. 
  * @author Joshua Miller (josh@joshuasmiller.com) 
  * @version 2, September 20, 2004 
  */

code: |
 function uniquefilename(prepend,ext)
 {
   Return "#prepend#_#dateformat(now(),"mmddyy")#_#timeformat(now(),"HHmmss")#.#ext#";
 }

---

