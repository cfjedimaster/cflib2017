---
layout: udf
title:  thisMonth
date:   2005-07-25T14:35:44.000Z
library: DateLib
argString: "[current_date]"
author: Ian Winter
authorEmail: ianwinter@gmail.com
version: 1
cfVersion: CF6
shortDescription: Returns structure containing month information.
tagBased: false
description: |
 Returns structure containing information about the month including date object for each day, each day as a string and each day's date letters ie &quot;st,nd,rd,th&quot;. Also start and end day as entries, number of days in that month and the month number.

returnValue: Returns a structure.

example: |
 <cfset thisMonthData = thisMonth()>
 <cfdump var="#thisMonthData#">
 <cfset nextMonth = dateAdd("m",1,now())>
 <cfset nextMonthData = thisMonth(nextMonth)>
 <cfdump var="#nextMonthData #">

args:
 - name: current_date
   desc: The date to use. Defaults to now().
   req: false


javaDoc: |
 /**
  * Returns structure containing month information.
  * 
  * @param current_date      The date to use. Defaults to now(). (Optional)
  * @return Returns a structure. 
  * @author Ian Winter (ianwinter@gmail.com) 
  * @version 1, July 25, 2005 
  */

code: |
 function thisMonth() {
     var returnStruct = structNew();
     var current_date = now();
     var letterList="st,nd,rd,th";
     var domLetters="";
     var i = "";
     var thisDate = "";
     var thisKey = "";
     var domStr = "";
     
     if (arrayLen(arguments)) current_date = arguments[1];
     
     returnStruct.monthBegin = CreateDate(Year(current_date),Month(current_date),01);
     returnStruct.monthEnd = CreateDate(Year(current_date),Month(current_date),DaysInMonth(current_date));
     returnStruct.monthNumber = Month(current_date);
     returnStruct.monthDays = DaysInMonth(current_date);
     
     for(i=1; i LTE returnStruct.monthDays ; i=i+1) {
         thisDate = CreateDate(Year(current_date),Month(current_date),i);
         thisKey = dateAdd("d",i-1,returnStruct.monthBegin);
         domStr = DateFormat(thisDate,"d");
         switch (domStr) {
             case "1": case "21": case "31":  domLetters=ListGetAt(letterList,'1'); break;
             case "2": case "22": domLetters=ListGetAt(letterList,'2'); break;
             case "3": case "23": domLetters=ListGetAt(letterList,'3'); break;
             default: domLetters=ListGetAt(letterList,'4');
         }
         StructInsert(returnStruct,i,StructNew());
         StructInsert(returnStruct[i],"dayAsString",DayOfWeekAsString(DayOfWeek(thisDate)));
         StructInsert(returnStruct[i],"date",thisKey);
         StructInsert(returnStruct[i],"dateLetters",domLetters);
     }
     
     return returnStruct;
 
 }

---

