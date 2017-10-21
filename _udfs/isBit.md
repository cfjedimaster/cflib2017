---
layout: udf
title:  isBit
date:   2006-02-14T13:15:22.000Z
library: DataManipulationLib
argString: "x"
author: Mike Tangorre
authorEmail: mtangorre@cfcoder.com
version: 1
cfVersion: CF5
shortDescription: Checks that a value is equal to 1 or 0.
description: |
 isBit checks to see if a value is 1 or 0. This comes in handy when checking radio button values where you have two radio buttons with bit values. While this does not save a lot of typing, it does help, especially when your form has an abundance of radio buttons, etc.

returnValue: Returns a boolean.

example: |
 <cfset var1 = 1 />
 <cfset var2 = "1" />
 <cfset var3 = "test string" />
 <cfset var4 = "-0" />
 <cfset var5 = 000 />
 <cfset var6 = arrayNew(1) />
 <cfset var7 = 0 />
 
 <cfoutput>
 #isBit(var1)# - true<br />
 #isBit(var2)# - true<br />
 #isBit(var3)# - false<br />
 #isBit(var4)# - false<br />
 #isBit(var5)# - false<br />
 #isBit(var6)# - false<br />
 #isBit(var7)# - true<br />
 </cfoutput>

args:
 - name: x
   desc: Value to check.
   req: true


javaDoc: |
 /**
  * Checks that a value is equal to 1 or 0.
  * 
  * @param x      Value to check. (Required)
  * @return Returns a boolean. 
  * @author Mike Tangorre (mtangorre@cfcoder.com) 
  * @version 1, February 14, 2006 
  */

code: |
 function isBit(x){
    if(isSimpleValue(x) and len(x) eq 1 and (x eq 0 or x eq 1))
       return true;
    else
       return false;
 }

---

