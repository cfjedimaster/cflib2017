---
layout: udf
title:  IsManipulated
date:   2002-07-02T13:04:36.000Z
library: SecurityLib
argString: ""
author: Stephan Scheele
authorEmail: stephan@stephan-t-scheele.de
version: 1
cfVersion: CF5
shortDescription: Checks if the URL (maybe a key) was manipulated or if the form was copied and changed.
description: |
 Checks if the URL (maybe a key) was Manipulated or if the form was copied and changed. The file that was called has to be on the same server as the caller file. It doesn't work with the javascript Command self.location.href = &quot;&quot;. Please note that cgi.http_refere can be faked. This is not a perfect test.

returnValue: Returns a boolean.

example: |
 <cfoutput>#IsManipulated()#</cfoutput>

args:


javaDoc: |
 /**
  * Checks if the URL (maybe a key) was manipulated or if the form was copied and changed.
  * 
  * @return Returns a boolean. 
  * @author Stephan Scheele (stephan@stephan-t-scheele.de) 
  * @version 1, July 2, 2002 
  */

code: |
 function isManipulated(){
     if (CGI.HTTP_REFERER eq "") return true;
     else if (REReplaceNoCase(REReplaceNoCase(CGI.HTTP_REFERER, ".*//", "","all"), "/.*", "","all")  neq CGI.HTTP_HOST) return true;
     else return false;
 }

---

