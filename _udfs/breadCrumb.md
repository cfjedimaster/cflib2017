---
layout: udf
title:  breadCrumb
date:   2006-07-25T16:13:35.000Z
library: StrLib
argString: ""
author: Jon Lesser
authorEmail: jdl1101@rit.edu
version: 1
cfVersion: CF5
shortDescription: Creates a bread crumb trail based on your sites sirectory structure.
tagBased: false
description: |
 BreadCrumbs() can be called from any page and will return a string of links.

returnValue: Returns a string.

example: |
 <span class="breadCrumbLinks"><cfoutput>#BreadCrumb()#</cfoutput></span>

args:


javaDoc: |
 /**
  * Creates a bread crumb trail based on your sites sirectory structure.
  * 
  * @return Returns a string. 
  * @author Jon Lesser (jdl1101@rit.edu) 
  * @version 1, July 25, 2006 
  */

code: |
 function breadCrumb() {
     var baseLink = "/";
     var delimiter = " > ";
     var crumbs = "<a href='" & baseLink & "'>Home</a>" & delimiter;
     var breadCrumbArray = listToArray(replace(cgi.script_name, "_", " ", "all") , "/");
     var i = 1;
     
     for(i=1; i lt arrayLen(breadCrumbArray); i=i+1) {
         baseLink = baseLink & replace(breadCrumbArray[i], " ", "_", "all") & "/";
         
         if(i lt ArrayLen(breadCrumbArray)-1) crumbs = crumbs & "<a href='" & baseLink & "'>" & capFirstTitle(breadCrumbArray[i]) & "</a>" & delimiter;
         else crumbs = crumbs & capFirstTitle(breadCrumbArray[i]);        
     }
     return crumbs;
 }

---

