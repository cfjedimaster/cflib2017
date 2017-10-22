---
layout: udf
title:  CreateOrderedList
date:   2006-09-28T20:22:03.000Z
library: UtilityLib
argString: "st, end[, step][, delim]"
author: Mike Gillespie
authorEmail: mike@striking.com
version: 1
cfVersion: CF5
shortDescription: Used to create an Ordered Numeric List
tagBased: false
description: |
 Pass in Start and End numbers (with options for delim and step increment) and this UDF will generate an Ascending (or descending), ordered delimited list in your step increment.

returnValue: Returns a string.

example: |
 <cfoutput>
 Basic: #CreateOrderedList(1,10)#<br>
 Step Down: #createOrderedList(0,-25,5,"|")#
 </cfoutput>

args:
 - name: st
   desc: Start number.
   req: true
 - name: end
   desc: End number.
   req: true
 - name: step
   desc: Step value. Defaults to 1.
   req: false
 - name: delim
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Used to create an Ordered Numeric List
  * v2 mods by Raymond Camden
  * 
  * @param st      Start number. (Required)
  * @param end      End number. (Required)
  * @param step      Step value. Defaults to 1. (Optional)
  * @param delim      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Mike Gillespie (mike@striking.com) 
  * @version 1, September 28, 2006 
  */

code: |
 function createOrderedList(st,end) {
     var theList="";
     var delim=",";
     var step=1;
 
     // 3rd argument sets the step increment
     if(arraylen(arguments) gte 3) step=arguments[3];
 
     //4th argument sets the delim
     if(arraylen(arguments) eq 4) delim=arguments[4];
 
     if(st gte end) for(i = st;i gte end;i=i-step) theList=listappend(theList,i,delim);        
     else for(i = st;i lte end;i=i+step) theList=listappend(theList,i,delim);        
 
     return theList;
 }

---

