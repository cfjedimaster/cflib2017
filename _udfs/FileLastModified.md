---
layout: udf
title:  FileLastModified
date:   2009-06-11T22:22:38.000Z
library: FileSysLib
argString: "filename"
author: Jesse Houwing
authorEmail: j.houwing@student.utwente.nl
version: 1
cfVersion: CF6
shortDescription: Returns the date the file was last modified.
tagBased: false
description: |
 Returns the date the file was last modified. The date is adjusted according to timezone. It returns a valid coldfusion date object. It uses the standard Java File object, which makes it very fast under Coldfusion MX

returnValue: Returns a date.

example: |
 <cfset filename="c:\autoexec.bat">
 <cfoutput>
     Length: #FileLastModified(filename)#<br>
 </cfoutput>

args:
 - name: filename
   desc: Name of the file.
   req: true


javaDoc: |
 /**
  * Returns the date the file was last modified.
  * v2 fixes for DTS by Mark Woods (mwoods@online.ie)
  * 
  * @param filename      Name of the file. (Required)
  * @return Returns a date. 
  * @author Jesse Houwing (j.houwing@student.utwente.nl) 
  * @version 1, June 11, 2009 
  */

code: |
 function FileLastModified(filename){
     var oFile = createObject("java","java.io.File");
     var oDate = createObject("java","java.util.Date");
     oFile.init(fileName);
     return oDate.init(oFile.lastModified());
 }

oldId: 790
---

