---
layout: udf
title:  getCurrentPage
date:   2006-08-27T02:10:09.000Z
library: UtilityLib
argString: ""
author: Jack Poe
authorEmail: jpoe@afit.edu
version: 1
cfVersion: CF5
shortDescription: Returns the filename of the current URL.
description: |
 Returns the filename of the current URL.

returnValue: Returns a string.

example: |
 The current page is: #getCurrentPage()#

args:


javaDoc: |
 /**
  * Returns the filename of the current URL.
  * 
  * @return Returns a string. 
  * @author Jack Poe (jpoe@afit.edu) 
  * @version 1, August 26, 2006 
  */

code: |
 function getCurrentPage() {
     var thisPage = spanExcluding(reverse(CGI.SCRIPT_NAME),'/');
     thisPage = reverse(thispage);
     return thisPage;
 }

---

