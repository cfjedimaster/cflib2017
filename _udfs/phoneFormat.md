---
layout: udf
title:  phoneFormat
date:   2011-02-11T13:12:57.000Z
library: StrLib
argString: "varInput[, varMask]"
author: Derrick Rapley
authorEmail: adrapley@rapleyzone.com
version: 4
cfVersion: CF5
shortDescription: Allows you to specify the mask you want added to your phone number.
description: |
 phoneFormat() takes a 10 digit phone number in any format and returns a value in the specified mask. Here are some mask examples, (xxx) xxx-xxxx, xxx.xxx.xxxx, xxx xxx-xxxx, etc. The only requirement is that numeric values in the mask must be represneted by an &quot;x.&quot;

returnValue: Returns a string.

example: |
 <cfset number1="3019876352">
 <cfset number2="(301) 987-6352">
 <cfset number3="301.987.6352">
 <cfoutput>
 #number1# = #phoneFormat(number1, "(xxx) xxx-xxxx")#<br>
 #number2# = #phoneFormat(number2, "xxx.xxx.xxxx")#<br>
 #number3# = #phoneFormat(number3, "xxx xxx-xxxx")#<br>
 </cfoutput>

args:
 - name: varInput
   desc: Phone number to be formatted.
   req: true
 - name: varMask
   desc: Mask to use for formatting. x represents a digit. Defaults to (xxx) xxx-xxxx
   req: false


javaDoc: |
 /**
  * Allows you to specify the mask you want added to your phone number.
  * v2 - code optimized by Ray Camden
  * v3.01 
  * v3.02 added code for single digit phone numbers from John Whish   
  * v4 make a default format - by James Moberg
  * 
  * @param varInput      Phone number to be formatted. (Required)
  * @param varMask      Mask to use for formatting. x represents a digit. Defaults to (xxx) xxx-xxxx (Optional)
  * @return Returns a string. 
  * @author Derrick Rapley (adrapley@rapleyzone.com) 
  * @version 4, February 11, 2011 
  */

code: |
 function phoneFormat(varInput) {
        var curPosition = "";
        var i = "";
        var varMask = "(xxx) xxx-xxxx";
        var newFormat = "";
        var startpattern = "";
    if (arrayLen(arguments) gte 2){ varMask = arguments[2]; }
        newFormat = trim(ReReplace(varInput, "[^[:digit:]]", "", "all"));
        startpattern = ReReplace(ListFirst(varMask, "- "), "[^x]", "", "all");
        if (Len(newFormat) gte Len(startpattern)) {
                varInput = trim(varInput);
                newFormat = " " & reReplace(varInput,"[^[:digit:]]","","all");
                newFormat = reverse(newFormat);
                varmask = reverse(varmask);
                for (i=1; i lte len(trim(varmask)); i=i+1) {
                        curPosition = mid(varMask,i,1);
                        if(curPosition neq "x") newFormat = insert(curPosition,newFormat, i-1) & " ";
                }
                newFormat = reverse(newFormat);
                varmask = reverse(varmask);
        }
        return trim(newFormat);
 }

---

