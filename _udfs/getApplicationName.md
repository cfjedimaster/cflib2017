---
layout: udf
title:  getApplicationName
date:   2005-09-16T22:18:05.000Z
library: UtilityLib
argString: ""
author: Steven Maglio
authorEmail: smaglio@graddiv.ucsb.edu
version: 1
cfVersion: CF6
shortDescription: returns the name of the cfapplication.
description: |
 Returns the value of the name attribute. This attribute is set within the cfapplication tag. Usually this application name can be garnered from the application structure (application.applicationname). However, sometimes this value is missing (usually due to a structClear( application ) call).

returnValue: Returns a string.

example: |
 application name =
 <cfoutput>#getApplicationName()#</cfoutput>

args:


javaDoc: |
 /**
  * returns the name of the cfapplication.
  * 
  * @return Returns a string. 
  * @author Steven Maglio (smaglio@graddiv.ucsb.edu) 
  * @version 1, September 16, 2005 
  */

code: |
 function getApplicationName() {
     var name = "";
     var appScopeTracker = createObject("java", "coldfusion.runtime.ApplicationScopeTracker");
     var keys = appScopeTracker.getApplicationKeys();
     var app = 0;
     var appName = 0;
     
     while(keys.hasNext()) {
         appName = keys.next();
         app = appScopeTracker.getApplicationScope(appName);
         if(app.equals( application ) ) return app.getName();
     }
     return "";
 }

---

