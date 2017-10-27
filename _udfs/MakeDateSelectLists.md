---
layout: udf
title:  MakeDateSelectLists
date:   2002-06-21T17:52:38.000Z
library: DateLib
argString: "NameList, StartYear, EndYear[, DefaultDate][, theDelim]"
author: Shawn Seley
authorEmail: shawnse@aol.com
version: 1
cfVersion: CF5
shortDescription: Creates pulldowns for month, day and year.
tagBased: false
description: |
 Creates a three-part date entry via HTML pulldowns for month, day and year, defaulting to the passed DefaultDate, and restricting the year to a range between StartYear and EndYear. Each fieldname is specified via NameList.

returnValue: Returns a string.

example: |
 <form action="" method="post">
 Enter date:<br>
 <cfoutput>#MakeDateSelectLists("month,day,year", Year(now()), Year(DateAdd("yyyy", 4, now())) )#</cfoutput>
 </form>

args:
 - name: NameList
   desc: A list specifying the names to use for the form fields created.
   req: true
 - name: StartYear
   desc: The first year in the year drop down.
   req: true
 - name: EndYear
   desc: The last year in the year drop down.
   req: true
 - name: DefaultDate
   desc: The date the drop downs will default to. Default is now().
   req: false
 - name: theDelim
   desc: Delimiter for NameList. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Creates pulldowns for month, day and year.
  * 
  * @param NameList      A list specifying the names to use for the form fields created. (Required)
  * @param StartYear      The first year in the year drop down. (Required)
  * @param EndYear      The last year in the year drop down. (Required)
  * @param DefaultDate      The date the drop downs will default to. Default is now(). (Optional)
  * @param theDelim      Delimiter for NameList. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Shawn Seley (shawnse@aol.com) 
  * @version 1, June 21, 2002 
  */

code: |
 function MakeDateSelectLists(NameList, StartYear, EndYear) {
     var out_string  = "";
     var i           = 1;
     var theDelim    = ",";
     var CR          = chr(13);
     var defaultDate = now();
     
     if(arrayLen(arguments) gte 4) defaultDate = arguments[4];
     if(ArrayLen(Arguments) GTE 5) theDelim = Arguments[5];
 
     // Month
     out_string = "<select name='#ListFirst(NameList, theDelim)#'>#CR#";
     for(i=1; i LTE 12; i=i+1){
         if(i EQ Month(DefaultDate)){
             out_string  = out_string & "<option value='#i#' selected>#MonthAsString(i)#</option>#CR#";
         } else {
             out_string  = out_string & "<option value='#i#'>#MonthAsString(i)#</option>#CR#";
         }
     }
     out_string = out_string & "</select>#CR##CR#";
 
     // Day
     out_string = out_string & "<select name='#ListGetAt(NameList, 2, theDelim)#'>#CR#";
     for(i=1; i LTE 31; i=i+1){
         if(i EQ Day(DefaultDate)){
             out_string  = out_string & "<option value='#i#' selected>#i#</option>#CR#";
         } else {
             out_string  = out_string & "<option value='#i#'>#i#</option>#CR#";
         }
     }
     out_string = out_string & "</select>#CR##CR#";
 
     // Year
     out_string = out_string & "<select name='#ListLast(NameList, theDelim)#'>#CR#";
     for(i = StartYear; i LTE EndYear; i=i+1){
         if(i EQ Year(DefaultDate)){
             out_string  = out_string & "<option value='#i#' selected>#i#</option>#CR#";
         } else {
             out_string  = out_string & "<option value='#i#'>#i#</option>#CR#";
         }
     }
     out_string = out_string & "</select>#CR##CR#";
 
 
     return out_string;
 }

oldId: 525
---

