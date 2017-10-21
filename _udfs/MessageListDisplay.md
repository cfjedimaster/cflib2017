---
layout: udf
title:  MessageListDisplay
date:   2002-05-02T16:19:06.000Z
library: StrLib
argString: "emData[, beginString][, endString]"
author: Will Vautrain
authorEmail: vautrain@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Takes an array or struct of basic values and returns and HTML-formatted string.
description: |
 It takes in an array or struct of basic values, and returns each element with user-specified or default HTML tags wrapped around it. It is useful when accumulating error messages inside an array or struct during data validation and exception catching. Then you can just call MessageListDisplay when you're ready to display the output.

returnValue: Returns a string.

example: |
 <cfset em = ArrayNew(1)>
 <cfset ArrayAppend(em, "Job number must be a six-digit number.")>
 <cfset ArrayAppend(em, "You did not specify a valid user ID.")>
 <cfset ArrayAppend(em, "You can display error messages in blue text.")>
 
 <cfoutput>
 #MessageListDisplay(em, "<p style=""color : blue;"">", "</p>")#
 </cfoutput>

args:
 - name: emData
   desc: Struct or array of strings.
   req: true
 - name: beginString
   desc: String to place before each stirng in emData.
   req: false
 - name: endString
   desc: String to place after each stirng in emData.
   req: false


javaDoc: |
 /**
  * Takes an array or struct of basic values and returns and HTML-formatted string.
  * 
  * @param emData      Struct or array of strings. (Required)
  * @param beginString      String to place before each stirng in emData. (Optional)
  * @param endString      String to place after each stirng in emData. (Optional)
  * @return Returns a string. 
  * @author Will Vautrain (vautrain@yahoo.com) 
  * @version 1, May 2, 2002 
  */

code: |
 function MessageListDisplay(emData) {
     
     var returnStr = "";
     var beginStr = "<p style=""color : red;"">";
     var endStr = "</p>";
     var s = ArrayNew(1);
     var i = 1;
     
     if (ArrayLen(Arguments) gt 1) {
     
         beginStr = Arguments[2];    
     }
     
     if (ArrayLen(Arguments) gt 2) {
     
         endStr = Arguments[3];    
     }
     
     if (IsArray(emData) and not ArrayIsEmpty(emData)) {
 
         i = 1;
         while (i lte ArrayLen(emData)) {
             returnStr = returnStr & beginStr & emData[i] & endStr;
             i = i + 1;
             
         }
     } 
     
     if (IsStruct(emData) and not StructIsEmpty(emData)) {
 
         s = StructKeyArray(emData);
         i = 1;
         while (i lte ArrayLen(s)) {
             returnStr = returnStr & beginStr & StructFind(emData, s[i]) & endStr;
             i = i + 1;
         }
     }
     
     return returnStr;
 }

---

