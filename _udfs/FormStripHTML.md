---
layout: udf
title:  FormStripHTML
date:   2001-12-19T11:42:55.000Z
library: StrLib
argString: "[nostrip]"
author: Douglas Williams
authorEmail: klenzade@avondale.com
version: 1
cfVersion: CF5
shortDescription: Strips HTML from all form fields.
tagBased: false
description: |
 Strips all tag-based code from all form fields submitted to the action page.

returnValue: Returns true.

example: |
 <cfset form.alpha = "Jacob Camden">
 <cfset form.beta = "This is <b>important</b>">
 <cfset form.gamma = "Don't <b>change</b> me!!">
 Form is currently:
 <cfdump var="#form#">
 Cleaning form, except for gamma.<br>
 <cfset formStripHTML("gamma")>
 Form is now:
 <cfdump var="#form#">

args:
 - name: nostrip
   desc: List of form fields that should not be modified.
   req: false


javaDoc: |
 /**
  * Strips HTML from all form fields.
  * Version 1.1 by Raymond Camden
  * 
  * @param nostrip      List of form fields that should not be modified. 
  * @return Returns true. 
  * @author Douglas Williams (klenzade@avondale.com) 
  * @version 1.1, December 19, 2001 
  */

code: |
 function FormStripHTML() {
     var nostrip = "";
     if(arraylen(Arguments)) nostrip = Arguments[1];
 
         if(structIsEmpty(form)) return;
 
     for (field in form) {
            if(NOT listfindnocase(nostrip, field)) form[field] = ReReplaceNoCase(form[field], "<[^>]*>", "", "ALL");
     }
 
         return true;
 }

oldId: 434
---

