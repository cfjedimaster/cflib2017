---
layout: udf
title:  WriteCalendar
date:   2002-04-12T11:25:41.000Z
library: StrLib
argString: "curMonth, curYear[, height][, width][, titleStyle][, numberStyle]"
author: William Steiner
authorEmail: williams@hkusa.com
version: 1
cfVersion: CF5
shortDescription: Produces a Calendar for a given month and year.
description: |
 Pass in the month and year for the calendar, the height and width you want the calendar boxes to be, and the styles for the Title and Numbers.  Returns a string that contains a table that contains the formated calendar.

returnValue: Returns a string.

example: |
 <STYLE TYPE="text/css">    <!--
     td.calendarNums { font-size : 10px; font-family : Arial, Helvetica, sans-serif; font-style : normal; font-weight : normal; }
     td.calendarTitle { font-size : 12px; font-family : Arial, Helvetica, sans-serif; font-style : normal; font-weight : Bold; }
     -->
 </STYLE>
 
 <CFOUTPUT>
 #createCalendar(4,2002,40,60,"calendarTitle","calendarNums")# 
 </CFOUTPUT>

args:
 - name: curMonth
   desc: The month to display.
   req: true
 - name: curYear
   desc: The year to display.
   req: true
 - name: height
   desc: Height of the table cells. Defaults to 40.
   req: false
 - name: width
   desc: Width of the table cells. Defaults to 60.
   req: false
 - name: titleStyle
   desc: Style to apply to title row.
   req: false
 - name: numberStyle
   desc: Style to apply to days of the month.
   req: false


javaDoc: |
 /**
  * Produces a Calendar for a given month and year.
  * 
  * @param curMonth      The month to display. 
  * @param curYear      The year to display. 
  * @param height      Height of the table cells. Defaults to 40. 
  * @param width      Width of the table cells. Defaults to 60. 
  * @param titleStyle      Style to apply to title row. 
  * @param numberStyle      Style to apply to days of the month. 
  * @return Returns a string. 
  * @author William Steiner (williams@hkusa.com) 
  * @version 1, April 12, 2002 
  */

code: |
 function createCalendar(curMonth,curYear) {
     var outString = "";
     var firstDay = CreateDate(curYear, curMonth, 1);
     var firstDayDigit = DayOfWeek(FirstDay);
     var i = 1;
     var h = 1;
     var height = 40;
     var width = 60;
     var titleStyle = "";
     var numberStyle = "";
 
     if(arrayLen(arguments) gte 3) height = arguments[3];
     if(arrayLen(arguments) gte 4) width = arguments[4];        
     if(arrayLen(arguments) gte 5) titleStyle = arguments[5];
     if(arrayLen(arguments) gte 6) numberStyle = arguments[6];
     
     outString = "<table border='1'><tr><td align=center colspan='7'  ";
     if(len(titleStyle)) outString = outString & "class='#titleStyle#'";
     outString = outString & ">#DateFormat(firstDay, 'mmmm')#</td></tr>";
     
     // if it isn't sunday, then we need to if space over to start on the corrent day of week
     if (firstDayDigit neq 1) {
         for (h=1; h lt DayOfWeek(FirstDay); h = h+1) {
             outString = outString & "<td>&nbnbsp;</td>";
         }
     }
     
     // loop thru all the dates in this month
     for (i=1; i lte DaysInMonth(firstDay); i = i+1) {
         //is it Sunday? if so start new row.
         if (DayOfWeek(CreateDate(curYear, curMonth, i)) eq 1) {
             outString = outString & "<tr>";
         }
         // insert a day
         outString = outString & "<td align='left' valign='top' width='#width#px' ";
         if(len(numberStyle)) outString = outString & "class='#numberStyle#' ";
         outString = outString & "height='#height#'>#i#<br></td> ";
         // is it the last day of the month?  if so, fill row with blanks.
         if (i eq DaysInMonth(firstDay)) {
             for (h=1; h lte (7-DayOfWeek(CreateDate(curYear, curMonth, i))); h = h+1) {
                 outString = outString & "<td>&nbsp;</td>";
             }
         }
         if (DayOfWeek(CreateDate(curYear, curMonth, i)) eq 7){
             outString = outString & "</tr>";
         }
     }
     outString=outString & "</table>";
     return outString;
 }

---

