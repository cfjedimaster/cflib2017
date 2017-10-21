---
layout: udf
title:  ByteConvert
date:   2002-01-07T12:58:21.000Z
library: FileSysLib
argString: "size[, unit]"
author: Paul Mone
authorEmail: paul@ninthlink.com
version: 2
cfVersion: CF5
shortDescription: Pass in a value in bytes, and this function converts it to a human-readable format of bytes, KB, MB, or GB.
description: |
 Given a number of bytes, this UDF converts that string to the appropriate value in kilobytes, megabytes, or gigabytes, using the notation and rules that MS Windows Explorer uses for placing the decimal and choosing units.  An optional second argument allows you to specify the preferred unit.

returnValue: Returns a string.

example: |
 <cfoutput>
 byteConvert(-12345)<br>
 #byteConvert(-12345)#<br><br>
 
 byteConvert(0)<br>
 #byteConvert(0)#<br><br>
 
 byteConvert(25691435)<br>
 #byteConvert(25691435)#<br><br>
 
 byteConvert(25691435,"bytes")<br>
 #byteConvert(25691435,"bytes")#<br><br>
 
 byteConvert(25691435,"KB")<br>
 #byteConvert(25691435,"KB")#<br><br>
 
 byteConvert(25691435,"MB")<br>
 #byteConvert(25691435,"MB")#<br><br>
 
 byteConvert(25691435,"GB")<br>
 #byteConvert(25691435,"GB")#<br><br>
 </cfoutput>

args:
 - name: size
   desc: Size to convert.
   req: true
 - name: unit
   desc: Unit to return results in.  Valid options are bytes,KB,MB,GB.
   req: false


javaDoc: |
 /**
  * Pass in a value in bytes, and this function converts it to a human-readable format of bytes, KB, MB, or GB.
  * Updated from Nat Papovich's version.
  * 01/2002 - Optional Units added by Sierra Bufe (sierra@brighterfusion.com)
  * 
  * @param size      Size to convert. 
  * @param unit      Unit to return results in.  Valid options are bytes,KB,MB,GB. 
  * @return Returns a string. 
  * @author Paul Mone (paul@ninthlink.com) 
  * @version 2.1, January 7, 2002 
  */

code: |
 function byteConvert(num) {
     var result = 0;
     var unit = "";
     
     // Set unit variables for convenience
     var bytes = 1;
     var kb = 1024;
     var mb = 1048576;
     var gb = 1073741824;
 
     // Check for non-numeric or negative num argument
     if (not isNumeric(num) OR num LT 0)
         return "Invalid size argument";
     
     // Check to see if unit was passed in, and if it is valid
     if ((ArrayLen(Arguments) GT 1)
         AND ("bytes,KB,MB,GB" contains Arguments[2]))
     {
         unit = Arguments[2];
     // If not, set unit depending on the size of num
     } else {
           if      (num lt kb) {    unit ="bytes";
         } else if (num lt mb) {    unit ="KB";
         } else if (num lt gb) {    unit ="MB";
         } else                {    unit ="GB";
         }        
     }
     
     // Find the result by dividing num by the number represented by the unit
     result = num / Evaluate(unit);
     
     // Format the result
     if (result lt 10)
     {
         result = NumberFormat(Round(result * 100) / 100,"0.00");
     } else if (result lt 100) {
         result = NumberFormat(Round(result * 10) / 10,"90.0");
     } else {
         result = Round(result);
     }
     // Concatenate result and unit together for the return value
     return (result & " " & unit);
 }

---

