---
layout: udf
title:  HSLtoHex
date:   2001-11-06T13:14:34.000Z
library: UtilityLib
argString: "h, s, l"
author: Matthew Walker
authorEmail: matthew@electricsheep.co.nz
version: 1
cfVersion: CF5
shortDescription: Convert an HSL (hue, saturation, luminance) triplet to a hex RGB triplet.
description: |
 Convert an HSL (hue, saturation, luminance) triplet to a hex triplet.  This is the reverse of the HextoHSL function, taking an HSL triplet in the form of a list of three values between 0 and 1, and building a hex RGB triplet of the familiar form "xxxxxx".

returnValue: Returns a string.

example: |
 <cfoutput>
 Red (HSL: 0,1,0.5) is #HSLtoHex(0,1,0.5)# in hex RGB<br>
 Pink (HSL: 0,1,0.875) is #HSLtoHex(0,1,0.875)# in hex RGB<br>
 </cfoutput>

args:
 - name: h
   desc: Hue value between 0 and 1.  Decimals must have a leading zero.
   req: true
 - name: s
   desc: Saturation value between 0 and 1.  Decimals must have a leading zero.
   req: true
 - name: l
   desc: Luminosityvalue between 0 and 1.  Decimals must have a leading zero.
   req: true


javaDoc: |
 /**
  * Convert an HSL (hue, saturation, luminance) triplet to a hex RGB triplet.
  * 
  * @param h      Hue value between 0 and 1.  Decimals must have a leading zero. 
  * @param s      Saturation value between 0 and 1.  Decimals must have a leading zero. 
  * @param l      Luminosityvalue between 0 and 1.  Decimals must have a leading zero. 
  * @return Returns a string. 
  * @author Matthew Walker (matthew@electricsheep.co.nz) 
  * @version 1, November 6, 2001 
  */

code: |
 function HSLtoHex(H,S,L) {
     // ref Foley and van Dam, Fundamentals of Interactive Computer Graphics
     var R = L;
     var G = L;
     var B = L;
         Var temp1=0;
         Var temp2=0;
         Var Rtemp3=0;
         Var Gtemp3=0;
         Var Btemp3=0;
         Var Rhex=0;
         Var Ghex=0;
         Var Bhex=0;
     if ( S ) {
         if ( L LT 0.5 )
             temp2 = L * (1 + S);
         else
             temp2 = L + S - L * S;
         temp1 = 2 * L - temp2;
 
         Rtemp3 = H + 1/3;
         Gtemp3 = H;
         Btemp3 = H - 1/3;
         if ( Rtemp3 LT 0 )
             Rtemp3 = Rtemp3 + 1;
         if ( Gtemp3 LT 0 )
             Gtemp3 = Gtemp3 + 1;
         if ( Btemp3 LT 0 )
             Btemp3 = Btemp3 + 1;
         if ( Rtemp3 GT 1 )
             Rtemp3 = Rtemp3 - 1;    
         if ( Gtemp3 GT 1 )
             Gtemp3 = Gtemp3 - 1;    
         if ( Btemp3 GT 1 )
             Btemp3 = Btemp3 - 1;    
         
         if ( 6 * Rtemp3 LT 1 )
             R = temp1 + (temp2 - temp1) * 6 * Rtemp3;
         else
             if ( 2 * Rtemp3 LT 1 )
                 R = temp2;
             else
                 if ( 3 * Rtemp3 LT 2 )
                     R = temp1 + (temp2 - temp1) * ((2/3) - Rtemp3) * 6;
                 else
                     R = temp1;
         
         if ( 6 * Gtemp3 LT 1 )
             G = temp1 + (temp2 - temp1) * 6 * Gtemp3;
         else
             if ( 2 * Gtemp3 LT 1 )
                 G = temp2;
             else
                 if ( 3 * Gtemp3 LT 2 )
                     G = temp1 + (temp2 - temp1) * ((2/3) - Gtemp3) * 6;
                 else
                     G = temp1;
         
         if ( 6 * Btemp3 LT 1 )
             B = temp1 + (temp2 - temp1) * 6 * Btemp3;
         else
             if ( 2 * Btemp3 LT 1 )
                 B = temp2;
             else
                 if ( 3 * Btemp3 LT 2 )
                     B = temp1 + (temp2 - temp1) * ((2/3) - Btemp3) * 6;
                 else
                     B = temp1;
     }
     Rhex = FormatBaseN(R*255,16);
     if ( Len(Rhex) EQ 1 )
         Rhex = "0" & Rhex;
     Ghex = FormatBaseN(G*255,16);
     if ( Len(Ghex) EQ 1 )
         Ghex = "0" & Ghex;
     Bhex = FormatBaseN(B*255,16);
     if ( Len(Bhex) EQ 1 )
         Bhex = "0" & Bhex;
     
     return UCase(Rhex & Ghex & Bhex);
 }

---

