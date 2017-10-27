---
layout: udf
title:  deleteDoctype
date:   2005-07-11T17:56:17.000Z
library: UtilityLib
argString: ""
author: Nathan Strutz
authorEmail: mrnate@hotmail.com
version: 1
cfVersion: CF6
shortDescription: Deletes the doctype out of the current page request.
tagBased: false
description: |
 If you're having display issues on a page, call this function to remove the doctype from your request. This solves the display problems with using cfdump in CFMX under an XHTML doctype. You can modify this code to, for example, change a strict doctype to a transitional one.

returnValue: Returns nothing.

example: |
 <cfset deleteDoctype()>

args:


javaDoc: |
 /**
  * Deletes the doctype out of the current page request.
  * 
  * @return Returns nothing. 
  * @author Nathan Strutz (mrnate@hotmail.com) 
  * @version 1, July 11, 2005 
  */

code: |
 function deleteDoctype() {
     var str = getPageContext().getOut().getString();
     str = reReplace(str,"<!DOCTYPE[^>]*>","","ONE");
     getPageContext().popBody().clearBuffer();
     writeOutput(str);
 }

oldId: 1223
---

