---
layout: udf
title:  ago
date:   2009-12-07T17:54:57.000Z
library: DateLib
argString: "dateThen"
author: Alan McCollough
authorEmail: amccollough@anthc.org
version: 1
cfVersion: 
shortDescription: Displays how long ago something was.
tagBased: false
description: |
 You supply a date/time, and I return a string indicating how long ago that was. e.g. &quot;5 seconds ago&quot;, &quot;1 year ago&quot;, etc. Useful for displaying &quot;Last Updated&quot; information. Does not look to the future, this is for past events.

returnValue: Returns a string.

example: |
 <cfset then = dateAdd('d',-1,Now())>
 Then was #ago(then)#.

args:
 - name: dateThen
   desc: Date to format.
   req: true


javaDoc: |
 /**
  * Displays how long ago something was.
  * 
  * @param dateThen      Date to format. (Required)
  * @return Returns a string. 
  * @author Alan McCollough (amccollough@anthc.org) 
  * @version 1, December 7, 2009 
  */

code: |
 function ago(dateThen){
   var result = "";
   var i = "";
   var rightNow = Now();
   Do
   {
        i = dateDiff('yyyy',dateThen,rightNow);
        if(i GTE 2){
      result = "#i# years ago";
      break;}
   else if (i EQ 1){
      result = "#i# year ago";
      break;}
 
        i = dateDiff('m',dateThen,rightNow);
        if(i GTE 2){
      result = "#i# months ago";
      break;}
   else if (i EQ 1){
      result = "#i# month ago";
      break;}
 
        i = dateDiff('d',dateThen,rightNow);
        if(i GTE 2){
      result = "#i# days ago";
      break;}
   else if (i EQ 1){
      result = "#i# day ago";
      break;}
 
        i = dateDiff('h',dateThen,rightNow);
        if(i GTE 2){
      result = "#i# hours ago";
      break;}
   else if (i EQ 1){
      result = "#i# hour ago";
      break;}
 
        i = dateDiff('n',dateThen,rightNow);
        if(i GTE 2){
      result = "#i# minutes ago";
      break;}
   else if (i EQ 1){
      result = "#i# minute ago";
      break;}
 
        i = dateDiff('s',dateThen,rightNow);
        if(i GTE 2){
      result = "#i# seconds ago";
      break;}
   else if (i EQ 1){
      result = "#i# second ago";
      break;}
   else{
     result = "less than 1 second ago";
      break;
      }
   }
   While (0 eq 0);
   return result;
 }

oldId: 2020
---

