---
layout: udf
title:  RGBtoHex
date:   2001-11-27T12:56:30.000Z
library: UtilityLib
argString: "r, g, b"
author: Eric Carlisle
authorEmail: ericc@nc.rr.com
version: 1
cfVersion: CF5
shortDescription: Converts an RGB color value into a hexadecimal color value.
tagBased: false
description: |
 Converts an RGB color value into a hexadecimal color value.

returnValue: Returns a string.

example: |
 <cfoutput>
 00,151,102: #RGBtoHex(00,51,102)#<BR>
 255,255,255: #RGBtoHex(255,255,255)#<BR>
 0,0,0: #RGBtoHex(0,0,0)#<BR>
 </cfoutput>

args:
 - name: r
   desc: Red value triplet (0-255)
   req: true
 - name: g
   desc: Green value triplet (0-255)
   req: true
 - name: b
   desc: Blue value triplet (0-255)
   req: true


javaDoc: |
 /**
  * Converts an RGB color value into a hexadecimal color value.
  * 
  * @param r      Red value triplet (0-255) 
  * @param g      Green value triplet (0-255) 
  * @param b      Blue value triplet (0-255) 
  * @return Returns a string. 
  * @author Eric Carlisle (ericc@nc.rr.com) 
  * @version 1, November 27, 2001 
  */

code: |
 function RGBtoHex(r,g,b){
   Var hexColor="";
   Var hexPart = '';
   Var i=0;
     
   /* Loop through the Arguments array, containing the RGB triplets */
   for (i=1; i lte 3; i=i+1){
     /* Derive hex color part */
     hexPart = formatBaseN(Arguments[i],16);
         
     /* Pad with "0" if needed */
     if (len(hexPart) eq 1){
       hexPart = '0' & hexPart;    
     } 
         
     /* Add hex color part to hexadecimal color string */
     hexColor = hexColor & hexPart;
   }
   return hexColor;
 }

oldId: 339
---

