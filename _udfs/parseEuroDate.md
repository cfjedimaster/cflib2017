---
layout: udf
title:  parseEuroDate
date:   2003-05-13T14:12:18.000Z
library: DateLib
argString: "euroDate"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF6
shortDescription: Makes a &quot;European&quot; date (day before month) into a U.S. style date.
description: |
 If you are a U.S. developer who has end users in other parts of the world, you may have run into the fact that they write dates with the day before the month, whereas Americans write the month before the day.
 
 This function takes a &quot;European-style&quot; date and makes it a &quot;U.S.-style&quot; dateTime string.

returnValue: Returns a date string.

example: |
 <cfset theDate = "05/02/2003">
 <cfoutput>
 original date string ("dd/mm/yyyy"): #theDate#
 <br /><br />
 what CF thinks that is on an American machine: #parseDateTime(theDate)#
 <br /><br />
 what it should be, after using parseEuroDate: #parseEuroDate(theDate)#
 </cfoutput>

args:
 - name: euroDate
   desc: Date string.
   req: true


javaDoc: |
 /**
  * Makes a &quot;European&quot; date (day before month) into a U.S. style date.
  * 
  * @param euroDate      Date string. (Required)
  * @return Returns a date string. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, May 13, 2003 
  */

code: |
 function parseEuroDate(euroDate){
     //grab the old locale, so we can switch it back
     var oldLocale = getLocale();
     //a var to hold our dateTime
     var dateTime = "";
     //set the locale to British -- they use the Euro format!
     setLocale("English (UK)");
     //parse it using the localization function for parsing date time
     dateTime = LSParseDateTime(arguments.euroDate);
     //now set the Locale back, so we don't mess up the server
     setLocale(oldLocale);
     //return our dateTime that was parsed
     return dateTime;
 }

---

