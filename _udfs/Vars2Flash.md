---
layout: udf
title:  Vars2Flash
date:   2004-09-20T12:22:06.000Z
library: StrLib
argString: "varList, loadVar[, delim]"
author: Joshua Miller
authorEmail: joshuamil@gmail.com
version: 1
cfVersion: CF5
shortDescription: Converts a list of variable names to a Flash safe string to pass into a Flash movie.
tagBased: false
description: |
 This function takes 2 parameters: varList - a delimited list of variable names to load into a Flash movie and loadVar - the variable to append to the end of the string to tell Flash that all the variables are loaded. An optional delimiter can be passed as with any ListX() function.

returnValue: Returns a Flash safe string.

example: |
 <cfset var1="Sample Variable One">
 <cfset var2="Sample Variable Two">
 <cfset varList="var1,var2">
 <cfoutput>#vars2Flash(varList,"datacomplete")#</cfoutput>

args:
 - name: varList
   desc: A list of variable names, not the values themselves.
   req: true
 - name: loadVar
   desc: A variable to append to tell Flash the variables are loaded.
   req: true
 - name: delim
   desc: Optional delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Converts a list of variable names to a Flash safe string to pass into a Flash movie.
  * 
  * @param varList      A list of variable names, not the values themselves. (Required)
  * @param loadVar      A variable to append to tell Flash the variables are loaded. (Required)
  * @param delim      Optional delimiter. Defaults to a comma. (Optional)
  * @return Returns a Flash safe string. 
  * @author Joshua Miller (josh@joshuasmiller.com) 
  * @version 1, September 20, 2004 
  */

code: |
 function vars2Flash(varList,loadVar){
     var i=1;
     var argc = ArrayLen(arguments);
     var outputString="";
         var delim = "";
 
     if (argc EQ 2) {
         ArrayAppend(arguments,',');
     }
     delim = arguments[3];
     for(i=1;i lte ListLen(varList);i=i+1){
         outputString="#outputString#&#ListGetAt(varList,i,delim)#=#evaluate(ListGetAt(varList,i,delim))#";
     }
     return "#outputstring#&#loadVar#=yes";
 }

---

