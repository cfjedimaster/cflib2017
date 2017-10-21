---
layout: udf
title:  GetFileCount
date:   2003-05-13T16:05:45.000Z
library: FileSysLib
argString: "dir"
author: Bob Remeika
authorEmail: bobr@autobytel.com
version: 1
cfVersion: CF5
shortDescription: Returns the number of files in a directory. (Windows only)
description: |
 This function accepts a directory path as it's only argument, and requires the Windows Scripting Runtime host to work.

returnValue: Returns a number.

example: |
 <cfset count = GetFileCount("C:\")>
 <cfoutput>#count#</cfoutput>

args:
 - name: dir
   desc: Directory.
   req: true


javaDoc: |
 /**
  * Returns the number of files in a directory. (Windows only)
  * 
  * @param dir      Directory. (Required)
  * @return Returns a number. 
  * @author Bob Remeika (bobr@autobytel.com) 
  * @version 1, May 13, 2003 
  */

code: |
 function GetFileCount(dir) {
     var fsobj = "";
     var foldr = "";
     var b = "";
     
     if (DirectoryExists(dir)) {
         fsobj = CreateObject("COM", "Scripting.FileSystemObject");
         foldr = fsobj.GetFolder(dir);
         b = foldr.Files;    // CF 5 does not support nested dot notation.
         return b.Count;
     } else {
         return -1;
     }
 }

---

