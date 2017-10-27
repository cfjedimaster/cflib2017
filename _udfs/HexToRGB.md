---
layout: udf
title:  HexToRGB
date:   2001-11-06T13:26:17.000Z
library: UtilityLib
argString: "hexColor"
author: Eric Carlisle
authorEmail: ericc@nc.rr.com
version: 1
cfVersion: CF5
shortDescription: Convert a hexadecimal color into a RGB color value.
tagBased: false
description: |
 HexToRGB is the opposite of RGBtoHex.  HexToRGB converts a 6 character hexadecimal color value into an RGB list (rr,gg,bb).

returnValue: Returns a string.

example: |
 <CFSET Color="33ccff">
 <cfoutput>
 The RGB values for #Color# are: #HextoRGB(Color)#
 </cfoutput>

args:
 - name: hexColor
   desc: 6 character hexadecimal color value.
   req: true


javaDoc: |
 /**
  * Convert a hexadecimal color into a RGB color value.
  * 
  * @param hexColor      6 character hexadecimal color value. 
  * @return Returns a string. 
  * @author Eric Carlisle (ericc@nc.rr.com) 
  * @version 1.0, November 6, 2001 
  */

code: |
 function HexToRGB(hexColor){
   /* Strip out poundsigns. */
   Var tHexColor = replace(hexColor,'##','','ALL');
     
   /* Establish vairable for RGB color. */
   Var RGBlist='';
   Var RGPpart='';    
 
   /* Initialize i */
   Var i=0;
 
   /* Loop through each hex triplet */
   for (i=1; i lte 5; i=i+2){
     RGBpart = InputBaseN(mid(tHexColor,i,2),16);
     RGBlist = listAppend(RGBlist,RGBpart);
   }
   return RGBlist;
 }

oldId: 340
---

