---
layout: udf
title:  hasDoNotTrackHeader
date:   2013-12-04T09:28:41.000Z
library: CFMLLib
argString: ""
author: Indy Griffiths
authorEmail: indy@indygriffiths.com
version: 1
cfVersion: CF9
shortDescription: Support for the &quot;Do Not Track&quot; HTTP header
tagBased: false
description: |
 This UDF will return true if the user has opted out of tracking via the Do Not Track header. 
 
 The &quot;Do Not Track&quot; HTTP header is a privacy option provided by some browsers indicating that the user has opted out of tracking (such as analytics or behavioural advertising).

returnValue: Returns a boolean indicating if the header was found and set to 1

example: |
 <cfif NOT hasDoNotTrackHeader()>
     <!--- Analytics code goes here --->
 </cfif>

args:


javaDoc: |
 /**
  * Support for the &quot;Do Not Track&quot; HTTP header
  * v1.0 by Indy Griffiths
  * v1.1 by Adam Cameron slight performance optimisation and rename
  * 
  * @return Returns a boolean indicating if the header was found and set to 1 
  * @author Indy Griffiths (indy@indygriffiths.com) 
  * @version 1.1, December 4, 2013 
  */

code: |
 function hasDoNotTrackHeader() {
     var requestHeaders = getHttpRequestData().headers;
     return structKeyExists(requestHeaders, "DNT") && requestHeaders.DNT == 1;
 }

---

