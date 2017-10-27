---
layout: udf
title:  RandomColor
date:   2003-05-13T15:50:59.000Z
library: UtilityLib
argString: ""
author: Nathan Strutz
authorEmail: nathans@dnsfirm.com
version: 2
cfVersion: CF5
shortDescription: Returns a completely random color. Beautiful, isn't it?
tagBased: false
description: |
 Simply place RandomColor() anywhere you want a truly random HTML color. Fun for the whole family!

returnValue: Returns a string.

example: |
 <cfoutput>
 <table border=1 cellspacing=0>
   <tr>
 <cfloop from=1 to=10 index="z">
     <td bgcolor="#RandomColor()#">&nbsp;</td>
 </cfloop>
   </tr>
   <tr>
 <cfloop from=1 to=10 index="z">
     <td bgcolor="#RandomColor()#">&nbsp;</td>
 </cfloop>
   </tr>
 </table>
 </cfoutput>

args:


javaDoc: |
 /**
  * Returns a completely random color. Beautiful, isn't it?
  * Version 2 by Raymond Camden
  * 
  * @return Returns a string. 
  * @author Nathan Strutz (nathans@dnsfirm.com) 
  * @version 2, May 13, 2003 
  */

code: |
 function randomColor() {
     var redColor = formatBaseN(randRange(0,255),16);
     var greenColor = formatBaseN(randRange(0,255),16);
     var blueColor = formatBaseN(randRange(0,255),16);
     
     if(len(redColor) is 1) redColor = "0" & redColor;
     if(len(greenColor) is 1) greenColor = "0" & greenColor;
     if(len(blueColor) is 1) blueColor = "0" & blueColor;
 
     return "##" & redColor & greenColor & blueColor;
 }

oldId: 881
---

