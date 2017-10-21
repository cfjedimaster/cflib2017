---
layout: udf
title:  ListNew
date:   2004-01-12T15:56:16.000Z
library: StrLib
argString: ""
author: Samuel Neff
authorEmail: sam@serndesign.com
version: 1
cfVersion: CF5
shortDescription: Creates a list from the passed arguments, skipping empty elements.
description: |
 Converts the passed arguments array to a list and filters blanks.  Helpful for creating lists from several values stored in different variables where some may be blank.  Since it uses the arguments array as the source data for a list, there is no way to specify delimiters.  To use custom delimiters use ListChangeDelims on the returned list.

returnValue: Returns a list.

example: |
 <cfparam name="form.var1" default="">
 <cfparam name="form.var2" default="">
 <cfparam name="form.var3" default="">
 
 <cfset formValues = ListNew(form.var1, form.var2, form.var3)>

args:


javaDoc: |
 /**
  * Creates a list from the passed arguments, skipping empty elements.
  * 
  * @return Returns a list. 
  * @author Samuel Neff (sam@serndesign.com) 
  * @version 1, January 12, 2004 
  */

code: |
 function listNew() {
     var arr = arrayNew(1);
     var i = 1;
 
     for(;i lte arrayLen(arguments);i=i+1) {
         if(arguments[i] neq "") arr[arrayLen(arr)+1] = arguments[i];
     }
     
     return arrayToList(arr);
 }

---

