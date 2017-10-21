---
layout: udf
title:  getScheduleTasks
date:   2005-02-25T00:09:30.000Z
library: UtilityLib
argString: ""
author: Qasim Rasheed
authorEmail: qasimrasheed@hotmail.com
version: 1
cfVersion: CF6
shortDescription: This function will return a query listing all the schedule task on a ColdFusion server without admin access.
description: |
 This function will return a query listing all the scheduled task on a ColdFusion server to which you do not have administrative access. Following are the columns in the returned query
 
 disabled,file,http_port,http_proxy_port,interval,operation,password,path,proxy_server,publish,request_time_out,resolveurl,start_date,start_time,task,url,username 
 
 Additionally if no schduled task exists, it will return an empty query with one column named 'nothing'.
 
 Note: Because this function uses some undocumented features, which might not be available in future releases, and Macromedia will not support code that uses these features.

returnValue: Returns a query.

example: |
 <cfdump var="#getScheduledTasks()#">

args:


javaDoc: |
 /**
  * This function will return a query listing all the schedule task on a ColdFusion server without admin access.
  * 
  * @return Returns a query. 
  * @author Qasim Rasheed (qasimrasheed@hotmail.com) 
  * @version 1, February 24, 2005 
  */

code: |
 function getScheduledTasks(){
     var i = "";
     var j = "";
     var retquery = "";
     var alltasks = createobject("java","coldfusion.server.ServiceFactory").getCronService().listall();
     if (arraylen(alltasks )) {
         retquery = querynew(structkeylist(alltasks[1]));
         queryaddrow(retquery, arraylen(alltasks));
         for (i=1; i lte arraylen(alltasks); i = i+1){
             for (j in alltasks[i])
                 querysetcell(retquery, j, alltasks[i][j]);
         }
     }
     else retquery = querynew( 'nothing' );
     return retquery;
 }

---

