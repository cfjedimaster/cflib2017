---
layout: udf
title:  FolderCheck
date:   2003-05-09T19:04:50.000Z
library: FileSysLib
argString: "folder"
author: Mike Gillespie
authorEmail: mike@striking.com
version: 1
cfVersion: CF5
shortDescription: Will replace chars in a string to be used to create a folder with valid equivalent replacements
tagBased: false
description: |
 This function will replace the characters in a string to be used for a folder name with acceptable character replacements. Will support high ascii chars and replace spaces with &quot;_&quot;.  Great way to keep folder names legal, especially when dealing with &quot;international&quot; characters.

returnValue: Returns a string.

example: |
 <cfoutput>
 #foldercheck("Espa�ol and Fran�ais")#
 </cfoutput>

args:
 - name: folder
   desc: Name of folder.
   req: true


javaDoc: |
 /**
  * Will replace chars in a string to be used to create a folder with valid equivalent replacements
  * 
  * @param folder      Name of folder. (Required)
  * @return Returns a string. 
  * @author Mike Gillespie (mike@striking.com) 
  * @version 1, May 9, 2003 
  */

code: |
 function foldercheck(folder) {
    var bad_chars="�,/,\,*,&,%,$,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�,�";
    var good_chars="A,-,-,-,-,-,-,A,A,A,A,A,A,C,D,E,E,E,E,I,I,I,I,N,O,O,O,O,O,U,U,U,U,Y,a,a,a,a,a,a,a,c,e,e,e,o,e,i,i,i,i,n,o,o,o,o,o,u,u,u,u,y,y,i";
    var scrubbed="";
 
    if(folder eq "") return "";
    return replace(replace(ReplaceList(trim(folder), bad_chars, good_chars)," ","_","all"),"'","","all");
 }

oldId: 877
---

