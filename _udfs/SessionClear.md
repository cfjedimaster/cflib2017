---
layout: udf
title:  SessionClear
date:   2004-08-06T12:47:06.000Z
library: UtilityLib
argString: ""
author: Robby Lansaw
authorEmail: robby@ohsogooey.com
version: 1
cfVersion: CF5
shortDescription: Allows you to 'structclear' an entire session without worrying about deleting ColdFusion's built in variables.
description: |
 Allows you to 'structclear' an entire session without worrying about deleting ColdFusion's built in variables.

returnValue: Returns nothing.

example: |
 ... populated session
 <cfset sessionClear() />
 ... cleaned session

args:


javaDoc: |
 /**
  * Allows you to 'structclear' an entire session without worrying about deleting ColdFusion's built in variables.
  * 
  * @return Returns nothing. 
  * @author Robby Lansaw (robby@ohsogooey.com) 
  * @version 1, August 6, 2004 
  */

code: |
 function sessionClear(){
     var dont_clear = "sessionid,cfid,cftoken,jsessionid,urltoken";
     var key = "";
     for(key in session) {
         if(not listFindNoCase(dont_clear, key)) structDelete(session,key);
     }
 }

---

