---
layout: udf
title:  HexToHSL
date:   2001-11-06T13:14:58.000Z
library: UtilityLib
argString: "RGBTriplet"
author: Matthew Walker
authorEmail: matthew@electricsheep.co.nz
version: 1
cfVersion: CF5
shortDescription: Convert a hex RGB triplet to HSL (hue, saturation, luminance).
description: |
 Convert a hex RGB triplet to HSL (hue, saturation, luminance).  HSL is another way of representing the color palette. It can be useful if you want to dynamically modify colors. For example if I have a graph with a series of bars, I can progressively change the shade of each bar by increasing L. I then need to convert the HSL value back to hex RGB.

returnValue: Returns a comma delimited list of values.

example: |
 <cfoutput>
     ##ff9900 (Hex RGB) = #HexToHSL("ff9900")# (HSL)
 </cfoutput>

args:
 - name: RGBTriplet
   desc: Hex RGB triplet to convert to HSL triplet.
   req: true


javaDoc: |
 /**
  * Convert a hex RGB triplet to HSL (hue, saturation, luminance).
  * 
  * @param RGBTriplet      Hex RGB triplet to convert to HSL triplet. 
  * @return Returns a comma delimited list of values. 
  * @author Matthew Walker (matthew@electricsheep.co.nz) 
  * @version 1, November 6, 2001 
  */

code: |
 function HexToHSL(RGBTriplet) {
     // ref Foley and van Dam, Fundamentals of Interactive Computer Graphics
     
     var R = 0;
     var G = 0;
     var B = 0;
     var H = 0;
     var S = 0;
     var L = 0;
     var TidiedTriplet = Replace(RGBTriplet, "##", "", "ALL");
     var MinColor = 0;
     var MaxColor = 0;
     
     if ( ListLen(RGBTriplet) GT 1 ) {
         R = ListFirst(RGBTriplet);
         G = ListGetAt(RGBTriplet, 2);
         B = ListLast(RGBTriplet);
     }
     else {
         R = InputBaseN(Mid(TidiedTriplet, 1,2), 16) / 255;
         G = InputBaseN(Mid(TidiedTriplet, 3,2), 16) / 255;
         B = InputBaseN(Mid(TidiedTriplet, 5,2), 16) / 255;
     }    
         
     MinColor = Min(R, Min(G, B));
     MaxColor = Max(R, Max(G, B));
     L = (MaxColor + MinColor)/2;
 
     if ( MaxColor NEQ MinColor ) { // not grey
         if ( L LT 0.5 )
             S=(MaxColor-MinColor)/(MaxColor+MinColor);
         else
             S=(MaxColor-MinColor)/(2-MaxColor-MinColor);
         if ( R EQ MaxColor )
             H = (G-B)/(MaxColor-MinColor);
         if ( G EQ MaxColor )
             H = 2 + (B-R)/(MaxColor-MinColor);
         if ( B EQ MaxColor )
             H = 4 + (R-G)/(MaxColor-MinColor);
         H = H / 6;    
     }
     
     return "#H#,#S#,#L#";
 }

---

