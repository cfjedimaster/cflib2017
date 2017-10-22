---
layout: udf
title:  heatColor
date:   2011-08-05T12:13:20.000Z
library: UtilityLib
argString: "num[, minVal][, maxVal][, colorStyle][, lightness][, reverseOrder]"
author: James Moberg
authorEmail: james@ssmedia.com
version: 1
cfVersion: CF5
shortDescription: Assign a &quot;heat&quot; color based on value's position within the range.
tagBased: false
description: |
 Allows you to assign colors.  The value is compared to a range of passed in values and the element is assigned a &quot;heat&quot; color based on its derived value's position within the range.  (Useful in non-javascript environments or calculating charting colors.)
 
 Based on HeatColor jQuery plugin
 http://www.jnathanson.com/blog/client/jquery/heatcolor/

returnValue: Returns a string.

example: |
 <cfoutput>
 <cfloop from="1" to="80" index="this">
 <cfset c = heatColor(this,0,80,"roygbiv",0.75,1)>
 <div style="background-color:#c#">#c#</div>
 </cfloop>
 </cfoutput>

args:
 - name: num
   desc: Value to check.
   req: true
 - name: minVal
   desc: Minimum value. Defaults to 1.
   req: false
 - name: maxVal
   desc: Maximum value. Defaults to 100.
   req: false
 - name: colorStyle
   desc: Either roygiv or greentored. Defaults to greentored.
   req: false
 - name: lightness
   desc: Lightness of color. 0 is darkest, 0.9 is lightest. Defaults to 0.
   req: false
 - name: reverseOrder
   desc: Colors will go highest to lowest unless this argument is true. Defaults to false.
   req: false


javaDoc: |
 /**
  * Assign a &quot;heat&quot; color based on value's position within the range.
  * 
  * @param num      Value to check. (Required)
  * @param minVal      Minimum value. Defaults to 1. (Optional)
  * @param maxVal      Maximum value. Defaults to 100. (Optional)
  * @param colorStyle      Either roygiv or greentored. Defaults to greentored. (Optional)
  * @param lightness      Lightness of color. 0 is darkest, 0.9 is lightest. Defaults to 0. (Optional)
  * @param reverseOrder      Colors will go highest to lowest unless this argument is true. Defaults to false. (Optional)
  * @return Returns a string. 
  * @author James Moberg (james@ssmedia.com) 
  * @version 1, August 5, 2011 
  */

code: |
 function heatColor(num) {
     var minval = 1;
     var maxval = 100;
     var colorStyle = 'greentored'; //roygbiv OR greentored
     var lightness = 0;  //sets lightness of color - 0 is darkest, 0.9 is lightest
     var reverseOrder = 0; // By default the values will be colored highest to lowest; set this to true to color lowest to highest 
     var position = 0;
     var x = 0;
     var R = "";
     var G = "";
     var B = "";
     var shft = 0;
     if(ArrayLen(arguments) GTE 2 AND isnumeric(arguments[2])) {
         minval = val(arguments[2]);
     }
     if(ArrayLen(arguments) GTE 3 AND val(arguments[3])) {
         maxval = val(arguments[3]);
     }
     if(ArrayLen(arguments) GTE 4 AND arguments[4] IS 'roygbiv') {
         colorStyle = arguments[4];
     }
     if(ArrayLen(arguments) GTE 5 AND val(arguments[5]) GTE 0 AND val(arguments[5]) LTE 0.9) {
         lightness = val(arguments[5]);
     }
     if(ArrayLen(arguments) GTE 6 AND val(arguments[6])) {
         reverseOrder = YesNoFormat(1);
     }
     if (reverseOrder){
         x = minval;
         minval = maxval;
         maxval = x;
     }
     position = (num - minval) / (maxval - minval);
     shft = position + 0.2 + 5.5*(1-position);
     if (colorStyle IS 'roygbiv'){
         shft = 0.5*position + 1.7*(1-position);
     }
     x = shft + position * (2*Pi());    
     if (colorStyle NEQ 'roygbiv'){    
         x = x * -1;
     }
     R = INT((cos(x) + 1) * 128);
     R = Ucase(FormatBaseN(INT(R + lightness * (256 - R)),16));
     if (Len(R) IS 1){ R = "0" & R;}
     
     G = INT((cos(x+Pi()/2) + 1) * 128);
     G = Ucase(FormatBaseN(INT(G + lightness * (256 - G)),16));
     if (Len(G) IS 1){ G = "0" & G;}
     
     B = INT((cos(x+Pi()) + 1) * 128);
     B = Ucase(FormatBaseN(INT(B + lightness * (256 - B)),16));
     if (Len(B) IS 1){ B = "0" & B;}
     
     return '##' & R & G & B;
 }

---

