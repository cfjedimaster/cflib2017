---
layout: udf
title:  IsScheduledTask
date:   2002-10-16T12:47:59.000Z
library: UtilityLib
argString: "Task"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF6
shortDescription: Returns true if the specified task name exists as a scheduled task in the CF Administrator.
description: |
 Returns true if the specified task name exists as a scheduled task in the CF Administrator.

returnValue: Returns a Boolean.

example: |
 <CFOUTPUT>
 Is "Test" a scheduled task? #IsScheduledTask("test")#
 </CFOUTPUT>

args:
 - name: Task
   desc: Task name you want to verify.
   req: true


javaDoc: |
 <!---
  Returns true if the specified task name exists as a scheduled task in the CF Administrator.
  
  @param Task      Task name you want to verify. (Required)
  @return Returns a Boolean. 
  @author Rob Brooks-Bilson (rbils@amkor.com) 
  @version 1, October 16, 2002 
 --->

code: |
 <CFFUNCTION NAME="IsScheduledTask" RETURN="Boolean">
   <CFARGUMENT NAME="TaskName" REQUIRED="True" TYPE="String">
   <!--- var local vars for the func --->
   <CFSET Var TaskXML="">
   <CFSET Var GetTasks="">
   
   <!--- get the scheduler xml file.  It's stored as WDDX --->
   <CFFILE ACTION="Read"
           FILE="#Server.ColdFusion.RootDir#\lib\neo-cron.xml"
           VARIABLE="TaskXML">
   
   <!--- convert the WDDX to CFML - and array of structs --->        
   <CFWDDX ACTION="WDDX2CFML" INPUT="#TaskXML#" OUTPUT="GetTasks"> 
   
   <!--- search the array of structs for the name passed to the func --->
   <CFIF ListContainsNoCase(StructKeyList(GetTasks[1]), Arguments.TaskName) EQ 0>
     <CFRETURN False>
   <CFELSE>
     <CFRETURN True>
   </CFIF>
 </CFFUNCTION>

---

