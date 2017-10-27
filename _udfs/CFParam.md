---
layout: udf
title:  CFParam
date:   2001-11-13T14:06:06.000Z
library: UtilityLib
argString: "varname[, value]"
author: Fred T. Sanders
authorEmail: fred@fredsanders.com
version: 2
cfVersion: CF5
shortDescription: Function to duplicate the <cfparam> tag within CFSCRIPT.
tagBased: false
description: |
 Allows you to cfparam variables from within cfscript.

returnValue: Returns the value of the variable parammed.

example: |
 <CFSET X = 1>
 <CFSCRIPT>
 cfparam("x","fred");
 cfparam("y",2);
 </CFSCRIPT>
 <CFOUTPUT>
 X=#X#, Y=#Y#
 </CFOUTPUT>

args:
 - name: varname
   desc: The name of the variable.
   req: true
 - name: value
   desc: The default value. If not passed, use 
   req: false


javaDoc: |
 /**
  * Function to duplicate the <cfparam> tag within CFSCRIPT.
  * Rewritten by RCamden
  * V2 mods by John Farrar
  * 
  * @param varname      The name of the variable. 
  * @param value      The default value. If not passed, use  
  * @return Returns the value of the variable parammed. 
  * @author Fred T. Sanders (fred@fredsanders.com) 
  * @version 2, November 13, 2001 
  */

code: |
 function cfparam(varname) {
     var value = "";
     
     if(arrayLen(Arguments) gt 1) value = Arguments[2];
     if(not isDefined(varname)) setVariable(varname,value);
         return evaluate(varname);
 }

oldId: 144
---

