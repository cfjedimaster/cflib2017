---
layout: udf
title:  reverseColor
date:   2003-11-19T02:26:46.000Z
library: UtilityLib
argString: "startingColor"
author: Matt Liotta
authorEmail: mliotta@r337.com
version: 1
cfVersion: CF5
shortDescription: Returns the opposite of a color.
description: |
 Returns the opposite of a color.

returnValue: Returns a string.

example: |
 <cfoutput>#reverseColor("ffee22")#</cfoutput>

args:
 - name: startingColor
   desc: RGB value minus the #.
   req: true


javaDoc: |
 /**
  * Returns the opposite of a color.
  * 
  * @param startingColor      RGB value minus the #. (Required)
  * @return Returns a string. 
  * @author Matt Liotta (mliotta@r337.com) 
  * @version 1, November 18, 2003 
  */

code: |
 function reverseColor(startingColor) {
     var start = InputBaseN(startingColor, 16);
     var red = InputBaseN("FF", 16);
     var green = InputBaseN("FF00", 16);
     var blue = InputBaseN("FF0000", 16);
     var tmp = "";
 
     invertRed = BitAnd(BitXOR(start, red), red);
     invertGreen = BitAnd(BitXOR(start, green), green);
     invertBlue = BitAnd(BitXOR(start, blue), blue);
 
     tmp = invertRed + invertGreen + invertBlue;
     tmp = Ucase(FormatBaseN(tmp, 16));
     if(len(tmp) is 4) tmp = "00" & tmp;
 
     return tmp;
 }

---

