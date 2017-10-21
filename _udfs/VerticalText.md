---
layout: udf
title:  VerticalText
date:   2002-08-14T11:04:58.000Z
library: StrLib
argString: "text"
author: Nathan Dintenfass
authorEmail: nathan@changemedia.com
version: 1
cfVersion: CF5
shortDescription: Take a string, make it appear vertically.
description: |
 Puts line breaks into text to make it appear vertically.

returnValue: Returns a string.

example: |
 <cfoutput>#VerticalText("Hello World")#</cfoutput>

args:
 - name: text
   desc: Text to modify.
   req: true


javaDoc: |
 /**
  * Take a string, make it appear vertically.
  * 
  * @param text      Text to modify. (Required)
  * @return Returns a string. 
  * @author Nathan Dintenfass (nathan@changemedia.com) 
  * @version 1, August 14, 2002 
  */

code: |
 function VerticalText(text){
     //build an array of the characters in the string
     var arrText = arrayNew(1);
     //a variable for looping
     var ii = 1;
     //the len of the string
     var textLen = len(text);
     //resize the array the length of the string
     arrayResize(arrText,textLen);
     //loop through the length of the string, building the array
     for(ii = 1; ii LTE textLen; ii = ii + 1){
         arrText[ii] = mid(text,ii,1);
     }
     return arrayToList(arrText,"<br />");
 }

---

