---
layout: udf
title:  FixMacPost
date:   2003-02-07T12:23:46.000Z
library: StrLib
argString: ""
author: Anthony Cooper
authorEmail: ant@bluevan.co.uk
version: 2
cfVersion: CF5
shortDescription: Remove extra characters from a form post added by Mac IE.
tagBased: false
description: |
 Removes extra characters (CR,LF) that are added to form variables when a method=&quot;post&quot; is submitted from Internet Explorer on a Mac.  This function operates on all variables in the Form scope structure. Thanks to Joshua Miller for his suggestions.

returnValue: Returns True.

example: |
 <CFSET FixMacPost()>
 
 Because this UDF operates on the Form scope structure, there is no visible output.

args:


javaDoc: |
 /**
  * Remove extra characters from a form post added by Mac IE.
  * Changed attributes check to form[ check.
  * 
  * @return Returns True. 
  * @author Anthony Cooper (ant@bluevan.co.uk) 
  * @version 2, February 7, 2003 
  */

code: |
 function FixMacPost() {
   var thisField    = "";
     
   if (findNoCase("mac", cgi.HTTP_USER_AGENT) AND findNoCase("msie", cgi.HTTP_USER_AGENT)) {
     for (thisField in form) {
       if ((len(form[thisField]) GTE 2) AND NOT findNoCase(getTempDirectory(), form[thisField])) {
        form[thisField] = trim(form[thisField]);
       }
     }
   }
   return true;
 
 }

---

