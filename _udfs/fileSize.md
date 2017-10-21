---
layout: udf
title:  fileSize
date:   2006-07-11T20:28:04.000Z
library: FileSysLib
argString: "filename"
author: Jesse Houwing
authorEmail: j.houwing@student.utwente.nl
version: 3
cfVersion: CF5
shortDescription: This function will return the length of a file or a directory.
description: |
 This function will return the length of a file. It uses the standard Java File object, which makes it very fast under ColdfusionMX. If a directory is passed instead of a file, the UDF will return the total size of all files in the directory. If the file or folder does not exist, it will return 0.

returnValue: Returns a number.

example: |
 <cfset filename="c:\autoexec.bat">
 <cfoutput>
     Length: #fileSize(filename)#<br>
 </cfoutput>

args:
 - name: filename
   desc: The filename or directory path.
   req: true


javaDoc: |
 /**
  * This function will return the length of a file or a directory.
  * Version 2 by Nathan Dintenfass
  * Version 3 by Nat Papovich
  * 
  * @param filename      The filename or directory path. (Required)
  * @return Returns a number. 
  * @author Jesse Houwing (j.houwing@student.utwente.nl) 
  * @version 3, July 11, 2006 
  */

code: |
 function fileSize(pathToFile) {
     var fileInstance = createObject("java","java.io.File").init(toString(arguments.pathToFile));
     var fileList = "";
     var ii = 0;
     var totalSize = 0;
 
     //if this is a simple file, just return it's length
     if(fileInstance.isFile()){
         return fileInstance.length();
     }
     else if(fileInstance.isDirectory()) {
         fileList = fileInstance.listFiles();
         for(ii = 1; ii LTE arrayLen(fileList); ii = ii + 1){
             totalSize = totalSize + fileSize(fileList[ii]);
         }
         return totalSize; 
     }
     else
         return 0;
 }

---

