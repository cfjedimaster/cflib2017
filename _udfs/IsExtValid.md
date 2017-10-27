---
layout: udf
title:  IsExtValid
date:   2001-12-19T11:50:14.000Z
library: FileSysLib
argString: "path, extlist"
author: Gyrus
authorEmail: gyrus23@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Checks for a valid file extension.
tagBased: false
description: |
 Takes a file path and a comma-separated list of three-letter extensions. Returns TRUE if there's a three-letter extension that matches one in the list, otherwise FALSE. Can be tweaked to accept 4-letter extensions.

returnValue: Returns a boolean.

example: |
 <cfset path1="d:\docs\letter.doc">
 <cfset path2="c:\blah.exe">
 <cfset path3="d:\images\pic.tiff">
 <cfset path4="d:\images\macImage">
 
 <cfoutput>
 path1 (#path1#) valid? #YesNoFormat(IsExtValid(path1, "doc,txt,pdf"))#<br />
 path2 (#path2#) valid? #YesNoFormat(IsExtValid(path2, "doc,txt,pdf"))#<br />
 path3 (#path3#) valid? #YesNoFormat(IsExtValid(path3, "doc,txt,pdf"))#<br />
 path4 (#path4#) valid? #YesNoFormat(IsExtValid(path4, "doc,txt,pdf"))#<br />
 </cfoutput>

args:
 - name: path
   desc: The file path.
   req: true
 - name: extlist
   desc: The list of valid extensions.
   req: true


javaDoc: |
 /**
  * Checks for a valid file extension.
  * 
  * @param path      The file path. 
  * @param extlist      The list of valid extensions. 
  * @return Returns a boolean. 
  * @author Gyrus (gyrus23@hotmail.com) 
  * @version 1, December 19, 2001 
  */

code: |
 function IsExtValid(path,extlist) {
     // Find the last dot
     var DotPos = Find(".", Reverse(path));
     // Grab the extension
     var ext = Right(path, 3);
         return (not ((DotPos NEQ 4) OR (NOT ListFindNoCase(extlist, ext))));
 }

oldId: 423
---

