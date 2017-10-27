---
layout: udf
title:  RandomColorClose
date:   2003-06-12T18:50:06.000Z
library: UtilityLib
argString: "color, closeness"
author: nathan
authorEmail: nathans@dnsfirm.com
version: 1
cfVersion: CF5
shortDescription: Returns a random color close to your given color.
tagBased: false
description: |
 Returns a random color close to your given color. You give it the starting color and the range of how close you want it, and it will return a variation on that color. I recommend a closeness of 10 to 50 to make it different enough, but not too much.

returnValue: Returns a RGB color in the form of a string.

example: |
 <table border=1 cellpadding=1 cellspacing=0>
   <tr>
 <cfoutput>
 <cfset CurrentColor = "ABE32B">
 <cfloop from="1" to="50" index="i">
 <cfset CurrentColor = RandomColorClose(CurrentColor,25)>
     <td bgcolor="#CurrentColor#">&nbsp;</td>
 </cfloop>
 </cfoutput>
   </tr>
 </table>

args:
 - name: color
   desc: RGB color, minus the #.
   req: true
 - name: closeness
   desc: How close the random color should be to the original.
   req: true


javaDoc: |
 /**
  * Returns a random color close to your given color.
  * 
  * @param color      RGB color, minus the #. (Required)
  * @param closeness      How close the random color should be to the original. (Required)
  * @return Returns a RGB color in the form of a string. 
  * @author nathan (nathans@dnsfirm.com) 
  * @version 1, June 12, 2003 
  */

code: |
 function randomColorClose(color,closeness) {
     var redColor = "";
     var greenColor = "";
     var blueColor = "";
 
     redColor = InputBaseN(Mid(color,1,2),16);
     greenColor = InputBaseN(Mid(color,3,2),16);
     blueColor = InputBaseN(Mid(color,5,2),16);
 
     // randomize and format back to base 16. min and max functions ensure characters don't leave base 16 size.
     redColor = FormatBaseN(Min(255,Max(0,RandRange(redColor-closeness,redColor+closeness))),16);
     greenColor = FormatBaseN(Min(255,Max(0,RandRange(greenColor-closeness,greenColor+closeness))),16);
     blueColor = FormatBaseN(Min(255,Max(0,RandRange(blueColor-closeness,blueColor+closeness))),16);
 
     // fix formatting
     if(len(redColor) is 1) redColor = "0" & redColor;
     if(len(greenColor) is 1) greenColor = "0" & greenColor;
     if(len(blueColor) is 1) blueColor = "0" & blueColor;
 
     return "##" & redColor & greenColor & blueColor;
 }

oldId: 931
---

