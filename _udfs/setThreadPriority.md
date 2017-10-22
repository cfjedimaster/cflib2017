---
layout: udf
title:  setThreadPriority
date:   2005-02-10T15:59:03.000Z
library: UtilityLib
argString: "newPriority"
author: Joe Bernard
authorEmail: cfdev@comcast.net
version: 1
cfVersion: CF6
shortDescription: Allows you to set the scheduling priority of the current thread.
tagBased: false
description: |
 By default, ColdFusion (by way of Java) schedules all threads to run at a priority of 5. This means that computing cycles are distributed to each thread evenly. This function allows you to adjust that priority and tell CF (Java) which threads are more important and which can wait.
 
 This function is great for utility applications that run in the background and hog the CPU. By setting those apps to a lower priority, they will yield system resources to other requests, such as requests to your web site. 
 
 Conversely you can set mission critical apps to a higher priority ensuring that they can max out system resources if they need to.

returnValue: Returns a boolean.

example: |
 <cfset foo = setThreadPriority(3)>

args:
 - name: newPriority
   desc: Thread priority.
   req: true


javaDoc: |
 /**
  * Allows you to set the scheduling priority of the current thread.
  * 
  * @param newPriority      Thread priority. (Required)
  * @return Returns a boolean. 
  * @author Joe Bernard (cfdev@comcast.net) 
  * @version 1, February 10, 2005 
  */

code: |
 function setThreadPriority(newPriority) {
     var thread = createObject("java", "java.lang.Thread");
     if (arguments.newPriority le thread.max_priority and arguments.newPriority ge thread.min_priority) {
         thread.setPriority(arguments.newPriority);
         return true;
     } else {
         return false;
     }
 }

---

