---
layout: udf
title:  relativeFilePath
date:   2003-05-19T20:21:59.000Z
library: FileSysLib
argString: "startFile, endFile"
author: Massimo Foti
authorEmail: massimo@massimocorner.com
version: 1
cfVersion: CF5
shortDescription: Calculate the relative path from startFile to endFile.
description: |
 Paths can be system path (C:\myroot\mydir\myfile.cfm) or url (http://www.mydomain/myfile.cfm) but different kinds of paths (system and url) can't be used at the very same time.

returnValue: Returns a string.

example: |
 <cfoutput>
 relativeFilePath("C:\myroot\mydir\myfile.cfm", "C:\myroot\mydir\mySubdir\myfile.cfm") =
 #relativeFilePath("C:\myroot\mydir\myfile.cfm", "C:\myroot\mydir\mySubdir\myfile.cfm")#
 </cfoutput>

args:
 - name: startFile
   desc: First file.
   req: true
 - name: endFile
   desc: Second file.
   req: true


javaDoc: |
 /**
  * Calculate the relative path from startFile to endFile.
  * when two
  * Ver 1.1 fixes a minor bug when multiple files are located inside the same directory and their names start with the same letter.
  * 
  * @param startFile      First file. (Required)
  * @param endFile      Second file. (Required)
  * @return Returns a string. 
  * @author Massimo Foti (massimo@massimocorner.com) 
  * @version 1.1, May 19, 2003 
  */

code: |
 function relativeFilePath(startFile,endFile){
     //In case we have absolute local paths, turn backward to forward slashes
     var startpath = Replace(startFile,"\","/","ALL"); 
     var endPath = Replace(endFile,"\","/","ALL"); 
     //Declare variables
     var i = 1;
     var j = 1;
     var endStr = "";
     var commonStr = "";
     var retVal = "";
     var whatsLeft = "";
     var slashPos = "";
     var slashCount = 0;
     var dotDotSlash = "";
     //Be sure the paths aren't equal
     if(startpath NEQ endPath){
         //If the starting path is longer, the destination path is our starting point
         if(len(startpath) GT len(endPath)){
             endStr = len(endPath);
         }
         //Else the starting point is the start path
         else{
             endStr = len(startpath);
         }
         //Check if the two paths share a base path and store it into the commonStr variable
         for(i;i LT endStr; i=i+1){
             //Compare one character at time
             if(mid(startpath,i,1) EQ mid(endPath,i,1)){
                 commonStr = commonStr & mid(startpath,i,1);
             }
             else{
                 break;
             }
         }
         //We just need the base directory
         commonStr=REReplaceNoCase(commonStr,"[^/]*$","");
         //If there is a common base path, remove it
         if(len(commonStr) GT 0){
             whatsLeft = mid(startpath,len(commonStr)+1,len(startpath));
         }
         else{
             whatsLeft = startpath;
         }
         slashPos = find("/",startpath);
         //Count how many directories we have to climb
         while(slashPos NEQ 0){
             slashCount = slashCount + 1;
             slashPos = find("/",whatsLeft,slashPos+1);
         }
         //Append "../" for each directory we have to climb
         for(j;j LT slashCount; j=j+1){
             dotDotSlash = dotDotSlash & "../";
         }
         //Assemble the final path
         retVal = dotDotSlash & mid(endPath,len(commonStr)+1,len(endPath));
     }
     //Paths are the same
     else{
         retVal = "";
     }
     return retVal;
 }

---

