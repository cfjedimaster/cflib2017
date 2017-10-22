---
layout: udf
title:  IsHomeCircuit
date:   2002-06-26T19:13:55.000Z
library: UtilityLib
argString: ""
author: Joshua Shaffner
authorEmail: joshua@curlyweb.com
version: 1
cfVersion: CF5
shortDescription: a template calling itself is at home, otherwise, its not at home.
tagBased: false
description: |
 Useful function for applications in Fusebox 2 to determine whether a template is calling itself or not. If a template is calling itself, isHomeCircuit will return true, otherwise, it will return false.

returnValue: Returns a boolean.

example: |
 <cfif isHomeCircuit()>
   I am at home.
 <cfelse>
   I am not at home.
 </cfif>

args:


javaDoc: |
 /**
  * a template calling itself is at home, otherwise, its not at home.
  * 
  * @return Returns a boolean. 
  * @author Joshua Shaffner (joshua@curlyweb.com) 
  * @version 1, June 26, 2002 
  */

code: |
 function IsHomeCircuit(){
     var baseDir=getDirectoryFromPath(getBaseTemplatePath());
     var currDir=getDirectoryFromPath(getCurrentTemplatePath());
 
     if(baseDir is currDir) return true;
     else return false;
 }

---

