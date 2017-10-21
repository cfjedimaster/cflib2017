---
layout: udf
title:  getRelative
date:   2012-08-30T22:18:45.000Z
library: FileSysLib
argString: "abspath"
author: Isaac Dealey
authorEmail: info@turnkey.to
version: 2
cfVersion: CF5
shortDescription: Returns a relative path from the current template to an absolute file path.
description: |
 Use getRelative() is the inverse of the ColdFusion native ExpandPath() function -- it takes an absolute file path and returns a relative path to the given file from the current template. As opposed to expandpath(), getRelative() creates a path relative to the current template, not the base template.

returnValue: Returns a string.

example: |
 <cfoutput>#getRelative('d:\temp\test.txt')#</cfoutput>

args:
 - name: abspath
   desc: Absolute path.
   req: true


javaDoc: |
 /**
  * Returns a relative path from the current template to an absolute file path.
  * v2 fix by Tony Monast
  * v2.1 fix by Tony Monast to deal with situations in which the specified path was the same as the current path, resulting in an error
  * 
  * @param abspath      Absolute path. (Required)
  * @return Returns a string. 
  * @author Isaac Dealey (info@turnkey.to) 
  * @version 2, August 30, 2012 
  */

code: |
 function getRelative(abspath) {
         var currentPath = ListToArray(GetDirectoryFromPath(GetBaseTemplatePath()),"\/");
         var filePath = ListToArray(abspath,"\/");
         var relativePath = ArrayNew(1);
         var pathStart = 0;
         var i = 0;
 
         /* Define the starting path (path in common) */
         for (i = 1; i LTE ArrayLen(currentPath); i = i + 1) {
 
                 if (currentPath[i] NEQ filePath[i]) {
                         pathStart = i;
                         break;
                 }
         }
 
         if (pathStart GT 0) {
                 /* Build the prefix for the relative path (../../etc.) */
                 for (i = ArrayLen(currentPath) - pathStart ; i GTE 0 ; i = i - 1) {
                         ArrayAppend(relativePath,"..");
                 }
 
                 /* Build the relative path */
                 for (i = pathStart; i LTE ArrayLen(filePath) ; i = i + 1) {
                         ArrayAppend(relativePath,filePath[i]);
                 }
         }
 
         /* Same level */
         else
                 ArrayAppend(relativePath,filePath[ArrayLen(filePath)]);
 
         /* Return the relative path */
         return ArrayToList(relativePath,"/");
 }

---

