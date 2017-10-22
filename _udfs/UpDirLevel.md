---
layout: udf
title:  UpDirLevel
date:   2004-09-20T12:21:49.000Z
library: FileSysLib
argString: "currDir, upCt"
author: Joshua Miller
authorEmail: joshuamil@gmail.com
version: 1
cfVersion: CF5
shortDescription: Climbs up a given UNC Path a specified number of levels.
tagBased: false
description: |
 The UpDirLevel UDF climbs up a UNC Path a specified number of levels. I've found this useful when creating site management tools in one directory that affect files in another directory. You could return the ROOT of a path or use it to move to the directoy immediately above the current location.

returnValue: Returns a string.

example: |
 Root Location: <cfoutput>#upDirLevel('c:/inetpub/wwwroot',2)#</cfoutput>

args:
 - name: currDir
   desc: The directory to use as a starting point from which to climb.
   req: true
 - name: upCt
   desc: Integer specifying the number of directory levels to move up.
   req: true


javaDoc: |
 /**
  * Climbs up a given UNC Path a specified number of levels.
  * 
  * @param currDir      The directory to use as a starting point from which to climb. (Required)
  * @param upCt      Integer specifying the number of directory levels to move up. (Required)
  * @return Returns a string. 
  * @author Joshua Miller (josh@joshuasmiller.com) 
  * @version 1, September 20, 2004 
  */

code: |
 function upDirLevel(currDir,upCt){
     var i=1;
     var currDirTemp=Reverse(currDir);
     var s=0;
     for(i=1;i LTE upCt;i=i+1){
         s=findoneof("\/",currDirTemp,1);
         if(s EQ 1){
             currDirTemp=Right(currDirTemp,val(Len(currDirTemp)-s));
             s=find("\",currDirTemp,1);
             currDirTemp=Right(currDirTemp,val(Len(currDirTemp)-s));
         }else{
             currDirTemp=Right(currDirTemp,val(Len(currDirTemp)-s));
         }
     }
     currDirTemp="#reverse(replacenocase(currDirTemp,'/','\','ALL'))#\";
     return currDirTemp;
 }

---

