---
layout: udf
title:  deleteFormFields
date:   2003-06-12T18:54:48.000Z
library: UtilityLib
argString: "fieldList"
author: Tom Young
authorEmail: tom@thenewmediagroup.com
version: 1
cfVersion: CF5
shortDescription: Removes specified fields from a form structure.
tagBased: false
description: |
 Useful if you need to clean up a form for whatever reason before using the cfinsert or cfupdate tag. Takes a comma-delimited list of form field names as its only argument.

returnValue: Returns nothing.

example: |
 <cfset form.field1 = "foo">
 <cfset form.field2 = "goo">
 <cfset form.field3 = "zoo">
 <cfset form.fieldnames="field1,field2,field3">
 <cfdump var="#form#">
 <cfset theFields = "field1,field2">
 <cfset deleteFormFields(theFields)>
 <cfdump var="#form#">

args:
 - name: fieldList
   desc: List of fields to return.
   req: true


javaDoc: |
 /**
  * Removes specified fields from a form structure.
  * 
  * @param fieldList      List of fields to return. (Required)
  * @return Returns nothing. 
  * @author Tom Young (tom@thenewmediagroup.com) 
  * @version 1, June 12, 2003 
  */

code: |
 function deleteFormFields(fieldList) {
     var listIndex = 1;
     var i = 1;
     fieldList = ListToArray(fieldList);
     for(i = 1; i lte ArrayLen(fieldList); i = i + 1) {
         StructDelete(form, fieldList[i]);
         listIndex = ListFindNoCase(form.fieldnames, fieldList[i]);
         form.fieldnames = ListDeleteAt(form.fieldnames, listIndex);
     }
 }

oldId: 932
---

