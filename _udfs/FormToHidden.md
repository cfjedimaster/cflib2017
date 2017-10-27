---
layout: udf
title:  FormToHidden
date:   2002-03-11T11:52:36.000Z
library: UtilityLib
argString: "[excludeList]"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Converts the Form structure to hidden form fields.
tagBased: false
description: |
 This is a quick way to change all FORM variables into hidden fields in another form.  It is particularly useful in multi-step forms where you want to pass things on from previous forms in the current form.

returnValue: Returns a string.

example: |
 <cfset form.test = 2>
 <cfset form.foo = 1>
 <cfoutput>
 #htmlCodeFormat(formToHidden("gogoSubmit"))#
 </cfoutput>

args:
 - name: excludeList
   desc: A list of keys not to copy from the Form scope. Defaults to, and always includes, FIELDNAMES.
   req: false


javaDoc: |
 /**
  * Converts the Form structure to hidden form fields.
  * 
  * @param excludeList      A list of keys not to copy from the Form scope. Defaults to, and always includes, FIELDNAMES. 
  * @return Returns a string. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, March 11, 2002 
  */

code: |
 function formToHidden(){
     //a variable for iterating
     var key = "";
     //should we exlude any?  by default, no
     var excludeList = "FIELDNAMES";
     //a variable to return stuff
     var outVar = "";
     //if there is an argument, it is a list to exclude
     if(arrayLen(arguments))
         excludeList = excludeList & "," & arguments[1];
     //now loop through the form scope and make hidden fields
     for(key in form){
         if(NOT listFindNoCase(excludeList,key))
             outVar = outVar & "<input type=""hidden"" name=""" & key & """ value=""" & htmlEditFormat(form[key]) & """>";
     }
     return outVar;        
 }

oldId: 534
---

