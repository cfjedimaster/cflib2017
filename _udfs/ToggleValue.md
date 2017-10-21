---
layout: udf
title:  ToggleValue
date:   2002-07-03T17:55:01.000Z
library: UtilityLib
argString: "variable, value1, value2"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Toggles a value (ie&#58; &quot;stop&quot;/&quot;start&quot;) between two options.
description: |
 Save yourself a couple lines of coding next time you need to toggle the value of a variable.

returnValue: Returns a string.

example: |
 <cfset action = "On">
 <cfset newValue = toggleValue(action,"On","Off")>
 <cfoutput>Action = #action#, toggle is #toggleValue(action,"On","Off")#</cfoutput>

args:
 - name: variable
   desc: The variable that stores the value you will toggle.
   req: true
 - name: value1
   desc: The first value of the toggle.
   req: true
 - name: value2
   desc: The second value of the toggle.
   req: true


javaDoc: |
 /**
  * Toggles a value (ie: &quot;stop&quot;/&quot;start&quot;) between two options.
  * 
  * @param variable      The variable that stores the value you will toggle. (Required)
  * @param value1      The first value of the toggle. (Required)
  * @param value2      The second value of the toggle. (Required)
  * @return Returns a string. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, July 3, 2002 
  */

code: |
 function toggleValue(variable,value1,value2){
     //make a struct in which the value is the opposite of the key
     var toggler = structNew();
     toggler[value1] = value2;
     toggler[value2] = value1;
     //return whichever value is not the current value
     return toggler[variable];
 }

---

