---
layout: udf
title:  Grayscale
date:   2001-11-22T14:01:12.000Z
library: UtilityLib
argString: "hex_color[, web_safe]"
author: Sierra Bufe
authorEmail: sierra@brighterfusion.com
version: 1
cfVersion: CF5
shortDescription: Converts an HTML (hex) color code to gray.  An optional second argument allows for conversion to a web-safe color in the same step.
description: |
 Converts an HTML (hex) color code to grayscale.  Takes a valid hex color code without hash marks (for example, "00ff00") as the first argument.  An optional second argument ("web-safe") takes a boolean value such as 1/0, "YES"/"NO", or true/false.  Defaults to false.

returnValue: Returns a string.

example: |
 <cfoutput>
 Grayscale("99ccff")<br>
 #Grayscale("99ccff")#<br><br>
 
 Grayscale("001100")<br>
 #Grayscale("001100")#<br><br>
 
 Grayscale("001100","YES")<br>
 #Grayscale("001100","YES")#<br><br>
 
 Grayscale("##c8782d")<br>
 #Grayscale("##c8782d")#<br><br>
 
 Grayscale("c8782d",1)<br>
 #Grayscale("c8782d",1)#<br><br>
 
 Grayscale("c8782d",false)<br>
 #Grayscale("c8782d",false)#<br><br>
 </cfoutput>

args:
 - name: hex_color
   desc: 6 character hex color code you want converted to grayscale.
   req: true
 - name: web_safe
   desc: Boolean.  Indicates whether to return the closest web-safe grayscale value.  Default is No.
   req: false


javaDoc: |
 /**
  * Converts an HTML (hex) color code to gray.  An optional second argument allows for conversion to a web-safe color in the same step.
  * 
  * @param hex_color      6 character hex color code you want converted to grayscale. 
  * @param web_safe      Boolean.  Indicates whether to return the closest web-safe grayscale value.  Default is No. 
  * @return Returns a string. 
  * @author Sierra Bufe (sierra@brighterfusion.com) 
  * @version 1.0, November 22, 2001 
  */

code: |
 function Grayscale(hex_color) {
   // strip out any leading pound signs
   var clean_hex = replace(hex_color,'##','','ALL');
   // parse out rgb values, convert them to decimal, and make into a list
   var rgb = InputBaseN(Left(clean_hex,2),16) & "," & InputBaseN(Mid(clean_hex,3,2),16) & "," & InputBaseN(Right(clean_hex,2),16);
   // find average value from the list
   var gray = ArrayAvg(ListToArray(rgb));
   // check to see if a web_safe result is preferred
   if ((ArrayLen(Arguments) GT 1) AND Arguments[2])
     gray = Round(gray / 51) * 51;
 
   // convert gray to hexadecimal and pad with a zero if necessary
   gray = FormatBaseN(gray,16);
   if (len(gray) is 1) gray = "0" & gray;
     // return gray value as a new 6-digit hex color
     return gray & gray & gray;
 }

---

