---
layout: udf
title:  SubmitButton
date:   2002-04-24T15:50:59.000Z
library: StrLib
argString: "name, value[, class][, width][, onClick]"
author: Jesse Monson
authorEmail: jesse@ixstudios.com
version: 1
cfVersion: CF5
shortDescription: Create a simple submit button by providing name, value, class, width, and onClick.
tagBased: false
description: |
 Create a simple submit button by providing name, value, class, width, and onClick.

returnValue: Returns a string.

example: |
 <style>
 .button_jesse_IXStudios{font-family:verdana;background-color:darkblue;color:white;}
 </style>
 <cfoutput>
 #submitButton("subTest","Test","button_jesse_IXStudios",200,"alert('Hi')")#
 </cfoutput>

args:
 - name: name
   desc: The name of the submit button.
   req: true
 - name: value
   desc: The value of the submit button.
   req: true
 - name: class
   desc: The CSS class to use.
   req: false
 - name: width
   desc: Width of the submit button.
   req: false
 - name: onClick
   desc: JavaScript function to call when the button is clicked.
   req: false


javaDoc: |
 /**
  * Create a simple submit button by providing name, value, class, width, and onClick.
  * 
  * @param name      The name of the submit button. 
  * @param value      The value of the submit button. 
  * @param class      The CSS class to use. 
  * @param width      Width of the submit button. 
  * @param onClick      JavaScript function to call when the button is clicked. 
  * @return Returns a string. 
  * @author Jesse Monson (jesse@ixstudios.com) 
  * @version 1, April 24, 2002 
  */

code: |
 function submitButton(name,value) {
     var class="";
     var width="";
     var onClick="";
     
     if (arrayLen(arguments) gte 3) {class = " class=""#arguments[3]#""";}
     if (arrayLen(arguments) gte 4) {width = " width=""#arguments[4]#"" style=""width:#arguments[4]#px""";}
     if (arrayLen(arguments) gte 5) {onClick = " onClick=""#arguments[5]#""";}    
     return "<input type=""submit"" name=""#name#"" value=""#value#""#width##class##onClick#>";
 }

oldId: 559
---

