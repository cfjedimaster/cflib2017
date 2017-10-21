---
layout: udf
title:  imageScale
date:   2006-10-13T20:43:29.000Z
library: UtilityLib
argString: "selector, oldHeight, oldWidth, newParameter"
author: Greg Nettles
authorEmail: gregnettles@hotmail.com
version: 1
cfVersion: CF5
shortDescription: Returns width or height of a scaled image.
description: |
 Returns a width or height of an image when scaled down to a specified height or width while maintaining the original aspect ratio.

returnValue: Returns a number.

example: |
 <cfset oldWidth = 660>
 <cfset oldHeight = 495>
 <!--- scale by height --->
 <cfset newHeight = 90>
 <cfoutput>
 Scale by Height<br>
 <cfset newWidth = imageScale('h',oldHeight,oldWidth,newHeight)>
 Old Dimensions: #oldWidth# x #oldHeight#<br>
 New Dimensions: <strong>#newWidth#</strong> x #newHeight#<br><br>
 </cfoutput>
 
 <!--- scale by width --->
 <cfset newWidth = 120>
 <cfoutput>
 Scale by Width<br>
 <cfset newHeight = imageScale('w',oldHeight,oldWidth,newWidth)>
 Old Dimensions: #oldWidth# x #oldHeight#<br>
 New Dimensions: #newWidth# x <strong>#newHeight#</strong><br>
 </cfoutput>

args:
 - name: selector
   desc: Dimension to scale. Either h (for height) or w (for width).
   req: true
 - name: oldHeight
   desc: Old height.
   req: true
 - name: oldWidth
   desc: Old width.
   req: true
 - name: newParameter
   desc: New size.
   req: true


javaDoc: |
 /**
  * Returns width or height of a scaled image.
  * 
  * @param selector      Dimension to scale. Either h (for height) or w (for width). (Required)
  * @param oldHeight      Old height. (Required)
  * @param oldWidth      Old width. (Required)
  * @param newParameter      New size. (Required)
  * @return Returns a number. 
  * @author Greg Nettles (gregnettles@hotmail.com) 
  * @version 1, October 18, 2006 
  */

code: |
 function imageScale(selector,oldHeight,oldWidth,newParameter) {
         var ratioA = oldHeight/oldWidth;
         var ratioB = oldWidth/oldHeight;
         if (selector is 'h') {
             return round(newParameter * (1/ratioA));
         } else if (selector is 'w') {
             return round(newParameter * (1/ratioB));
         }
     }

---

