---
layout: udf
title:  URLToHidden
date:   2002-03-10T13:59:30.000Z
library: UtilityLib
argString: "[excludeList]"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Converts the URL structure to hidden form fields.
tagBased: false
description: |
 This is a quick way to capture the URL variables on a given page as hidden fields in a form.  This is useful when you have a multi-step process.

returnValue: Returns a string.

example: |
 <cfoutput>
     #htmlCodeFormat(urlToHidden())#
 </cfoutput>

args:
 - name: excludeList
   desc: A list of keys not to copy from the URL structure.
   req: false


javaDoc: |
 /**
  * Converts the URL structure to hidden form fields.
  * 
  * @param excludeList      A list of keys not to copy from the URL structure. 
  * @return Returns a string. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, March 10, 2002 
  */

code: |
 function urlToHidden(){
     //a variable for iterating
     var key = "";
     //should we exlude any?  by default, no
     var excludeList = "";
     //a variable to return stuff
     var outVar = "";
     //if there is an argument, it is a list to exclude
     if(arrayLen(arguments))
         excludeList = arguments[1];
     //now loop through the form scope and make hidden fields
     for(key in url){
         if(NOT listFindNoCase(excludeList,key))
             outVar = outVar & "<input type=""hidden"" name=""" & key & """ value=""" & htmlEditFormat(url[key]) & """>";
     }
     return outVar;        
 }

oldId: 535
---

