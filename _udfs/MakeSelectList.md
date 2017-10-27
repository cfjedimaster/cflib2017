---
layout: udf
title:  MakeSelectList
date:   2002-06-21T17:01:08.000Z
library: UtilityLib
argString: "name, displayList[, defaultSelected][, valueListSTR][, delimiter][, mutliple][, size]"
author: Seth Duffey
authorEmail: sduffey@ci.davis.ca.us
version: 2
cfVersion: CF5
shortDescription: Creates a Select form item populated with given string items.
tagBased: false
description: |
 Creates a Select form item populated with given string items.

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 <FORM ACTION="">
 Day of Week: #MakeSelectList("DOW",
 "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
 DateFormat(Now(),"dddd"),"1,2,3,4,5,6,7")#
 </FORM>
 </CFOUTPUT>

args:
 - name: name
   desc: The name of the Select item.
   req: true
 - name: displayList
   desc: The text values for the drop down.
   req: true
 - name: defaultSelected
   desc: The selected item.
   req: false
 - name: valueListSTR
   desc: The values for the drop down. Defaults to displayList.
   req: false
 - name: delimiter
   desc: The delimiter to use for all lists.
   req: false
 - name: mutliple
   desc: Turns on multiple for the drop down. Default is false.
   req: false
 - name: size
   desc: Size of the drop down. 
   req: false


javaDoc: |
 /**
  * Creates a Select form item populated with given string items.
  * Mods by RCamden and Grant Furick.
  * 
  * @param name      The name of the Select item. (Required)
  * @param displayList      The text values for the drop down. (Required)
  * @param defaultSelected      The selected item. (Optional)
  * @param valueListSTR      The values for the drop down. Defaults to displayList. (Optional)
  * @param delimiter      The delimiter to use for all lists. (Optional)
  * @param mutliple      Turns on multiple for the drop down. Default is false. (Optional)
  * @param size      Size of the drop down.  (Optional)
  * @return Returns a string. 
  * @author Seth Duffey (sduffey@ci.davis.ca.us) 
  * @version 2, June 21, 2002 
  */

code: |
 function MakeSelectList(name, displayList) {
     var outstring = "<select name=""#name#""";
     var defaultSelected = "";
     var valueListSTR = displayList;
     var delimiter = ",";
     var i = 1;
 
     if(arrayLen(arguments) gt 2) defaultSelected = arguments[3];
     if(arrayLen(arguments) gt 3) valueListSTR = arguments[4];
     if(arrayLen(arguments) gt 4) delimiter = arguments[5];
     if(arrayLen(arguments) gt 5 AND arguments[6]) outstring = outstring & " multiple";
     if(arrayLen(arguments) gt 6) outstring = outstring & " size=#arguments[7]#";
     outstring = outstring & ">";
 
     for (i=1; i LTE listLen(displayList,delimiter); i=i+1) {
         outstring = outstring & "<option value=""#listGetAt(valueListSTR,i,delimiter)#""";
         if(defaultSelected eq listGetAt(valueListSTR,i,delimiter)) outstring = outstring & " selected";
         outstring = outstring & ">#listGetAt(displayList,i,delimiter)#</option>";
     }
 
     outstring = outstring & "</select>";
     
     return outstring;
 }

oldId: 360
---

