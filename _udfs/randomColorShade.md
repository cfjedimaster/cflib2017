---
layout: udf
title:  randomColorShade
date:   2003-10-20T11:49:57.000Z
library: UtilityLib
argString: "[contrast]"
author: Nathan Strutz
authorEmail: nathans@dnsfirm.com
version: 1
cfVersion: CF5
shortDescription: Returns a random color of a specified shade, light, dark, extra light, extra dark, or any.
description: |
 You pass it exlight, light, dark, exdark or any, it passes you back a random color, of a random hue, with your specified shade of lightness or darkness.

returnValue: Returns a string.

example: |
 <cfoutput>
 <table border=1 cellspacing=0>
   <tr>
 <cfloop from=1 to=25 index="z">
     <cfset CurrentColor = RandomColorShade("exlight")>
     <td style="background-color:#CurrentColor#">&nbsp;</td>
 </cfloop>
 <cfloop from=1 to=25 index="z">
     <cfset CurrentColor = RandomColorShade("dark")>
     <td style="background-color:#CurrentColor#">&nbsp;</td>
 </cfloop>
   </tr>
   <tr>
 <cfloop from=1 to=25 index="z">
     <cfset CurrentColor = RandomColorShade("exlight")>
     <td style="background-color:#CurrentColor#">&nbsp;</td>
 </cfloop>
 <cfloop from=1 to=25 index="z">
     <cfset CurrentColor = RandomColorShade("dark")>
     <td style="background-color:#CurrentColor#">&nbsp;</td>
 </cfloop>
   </tr>
 </table>
 </cfoutput>

args:
 - name: contrast
   desc: A contract. Possible values are any (default), dark, exdark, light, exlight.
   req: false


javaDoc: |
 /**
  * Returns a random color of a specified shade, light, dark, extra light, extra dark, or any.
  * 
  * @param contrast      A contract. Possible values are any (default), dark, exdark, light, exlight. (Optional)
  * @return Returns a string. 
  * @author Nathan Strutz (nathans@dnsfirm.com) 
  * @version 1, October 20, 2003 
  */

code: |
 function randomColorShade() {
     var contrast = "any";
     var ranges = structNew();
     var redColor = "";
     var greenColor = "";
     var blueColor = "";
     
     ranges.any = "0,255";
     ranges.dark= "0,119";
     ranges.exdark = "0,51";
     ranges.light = "136,255";
     ranges.exlight = "204,255";
     
     if(arrayLen(arguments) gte 1) contrast = arguments[1];    
     
     redColor = formatBaseN(randRange(listFirst(ranges[contrast]),listLast(ranges[contrast])),16);
     greenColor = formatBaseN(randRange(listFirst(ranges[contrast]),listLast(ranges[contrast])),16);
     blueColor = formatBaseN(randRange(listFirst(ranges[contrast]),listLast(ranges[contrast])),16);
     if(len(redColor) is 1) redColor = "0" & redColor;
     if(len(greenColor) is 1) greenColor = "0" & greenColor;
     if(len(blueColor) is 1) blueColor = "0" & blueColor;
     
     return "##" & redColor & greenColor & blueColor;
 }

---

