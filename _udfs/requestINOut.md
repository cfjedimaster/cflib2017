---
layout: udf
title:  requestINOut
date:   2005-09-02T16:36:52.000Z
library: UtilityLib
argString: "[orderList]"
author: Joseph Flanigan
authorEmail: joseph@switch-box.org
version: 2
cfVersion: CF5
shortDescription: Normalize input structures (URL, FORM, FLASH) to a single Request.IN structure for ubiquitous name space programming.
tagBased: false
description: |
 Normalize input structures (URL, FORM, FLASH) to a single Request.IN structure for ubiquitous name space programming.  The function prevents name space conflicts with input variable names by defining a normalization rank priority list.  The default priority list rank (URL,FORM,FLASH)  for name space assignment, can be re-prioritized  by changing the parameter list order. Also, a struct called request.out is created.

returnValue: Returns true on successful normalization.

example: |
 <cfparam name="FORM.NAME" default="Jack">
 <cfparam name="FORM.CITY" default="Loveland"> 
 <cfparam name="URL.NAME" default="Jill"> 
 <cfparam name="URL.STATE" default="CO">
 <cfparam name="FORM.FIELDNAMES" default="Name,CITY">
 
 <cfscript>
 isNormalised = RequestINOut("FORM,URL");
 </cfscript>
 
 <cfif isNormalised>
  <cfoutput>
 <br> #Request.IN.NAME# is Jill
 <br> #Request.IN.CITY# is Loveland
 <br> #Request.IN.STATE# is CO
 <br> #Request.IN.FIELDNAMES# is NAME,STATE,CITY
 </cfoutput> 
 </cfif>

args:
 - name: orderList
   desc: Order of scopes to normalize. Defaults to url, form, flash.
   req: false


javaDoc: |
 /**
  * Normalize input structures (URL, FORM, FLASH) to a single Request.IN structure for ubiquitous name space programming.
  * V2 for BlueDragon Support
  * 
  * @param orderList      Order of scopes to normalize. Defaults to url, form, flash. (Optional)
  * @return Returns true on successful normalization. 
  * @author Joseph Flanigan (joseph@switch-box.org) 
  * @version 2, September 2, 2005 
  */

code: |
 function requestInOut() {
                 var orderList = "url,form,flash";
                 var i = 0;
 
                 // if request.IN does not exist, create it
                 if(not isDefined("request.IN")) {request.IN = structNew();}
                 if(not isDefined("request.OUT")) {request.OUT = structNew();}
 
                 if(arrayLen(arguments) gte 1) orderList = arguments[1];
 
                 for (i=1;i lte listLen(orderList); i = i+1){
                         switch( UCase(listGetAt(orderList,i))) {
                                 case "URL": {
                                         structAppend(request.IN,URL); // add URL
                                         break;
                                 }
 
                                 case "FORM": {
                                         structAppend(request.IN,FORM); // add FORM
                                         break;
                                 }
 
                                 case "FLASH": {
                                         if (IsDefined("FLASH")) structAppend(Request.IN,FLASH); // add FLASH
                                         break;
                                 }
                         } //end switch
                 } // end for
 
                 if(not structIsEmpty(request.IN)) {
                         request.IN.FIELDNAMES = ""; // make sure fieldnames exist and is empty
                         request.IN.FIELDNAMES = structKeyList(request.IN); // make list of fieldnames
                         // then remove FIELDNAMES itself as a fieldname
                         request.IN.FIELDNAMES = listDeleteAt(request.IN.FIELDNAMES, listFindNoCase(request.IN.FIELDNAMES,"FIELDNAMES"));
                         return TRUE; // function end, input normalized
                 }
                 else return FALSE; // function end, nothing to normalize
 
 }

---

