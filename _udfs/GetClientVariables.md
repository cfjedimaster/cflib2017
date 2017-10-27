---
layout: udf
title:  GetClientVariables
date:   2003-01-30T13:43:46.000Z
library: UtilityLib
argString: ""
author: Robert Segal
authorEmail: rsegal@figleaf.com
version: 1
cfVersion: CF5
shortDescription: Function returns a structure of client variable.
tagBased: false
description: |
 A structure with the client variable names as keys and the key values equal to the client variable values is returned when the function is called.

returnValue: Returns a structure.

example: |
 <!--- Demo disabled.
 <CFAPPLICATION NAME="GetClientVarTest" CLIENTMANAGEMENT=1 CLIENTSTORAGE="Cookie">
 
 <cfset client.a="bob">
 <cfset client.b="sally">
 <cfset thisst = getclientvariables()>
 <cfdump var="#thisst#">
 --->

args:


javaDoc: |
 /**
  * Function returns a structure of client variable.
  * 
  * @return Returns a structure. 
  * @author Robert Segal (rsegal@figleaf.com) 
  * @version 1, January 30, 2003 
  */

code: |
 function getclientvariables() {
  var lclientvarlist = getclientvariableslist();
  var stclientvar = structnew();
  var i = 1;
  for(i=1;i lte listlen(lclientvarlist);i=i+1)
  structinsert(stclientvar,"#listgetat(lclientvarlist,i)#",evaluate("client.#listgetat(lclientvarlist,i)#"));
  return stclientvar;
 }

oldId: 142
---

