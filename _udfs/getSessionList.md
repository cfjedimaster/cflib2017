---
layout: udf
title:  getSessionList
date:   2006-12-06T03:15:00.000Z
library: UtilityLib
argString: "appname"
author: Bobby Hartsfield
authorEmail: bobby@acoderslife.com
version: 3
cfVersion: CF6
shortDescription: Gets all the session keys and session ids for an application.
tagBased: false
description: |
 In order for this tag to work, you need an application name using cfapplication defined in the ColdFusion MX Server.

returnValue: Returns a struct.

example: |
 <cfdump var="#getSessionList(application.applicationname)#">

args:
 - name: appname
   desc: Application name.
   req: true


javaDoc: |
 /**
  * Gets all the session keys and session ids for an application.
  * v1 by Rupert de Guzman (rndguzmanjr@yahoo.com)
  * 
  * @param appname      Application name. (Required)
  * @return Returns a struct. 
  * @author Bobby Hartsfield (bobby@acoderslife.com) 
  * @version 3, December 5, 2006 
  */

code: |
 function getSessionList(appname){
     var obj = CreateObject("java","coldfusion.runtime.SessionTracker");
     return obj.getSessionCollection(appname);
 }

oldId: 1135
---

