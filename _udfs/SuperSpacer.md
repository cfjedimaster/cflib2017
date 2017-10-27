---
layout: udf
title:  SuperSpacer
date:   2005-09-30T17:27:16.000Z
library: UtilityLib
argString: "[height][, width][, border][, srcURL][, alt]"
author: Dave Forrest
authorEmail: dmf67@yahoo.com
version: 1
cfVersion: CF5
shortDescription: A UDF that will add a spacer gif image in a varity of formats to assist in page layout.
tagBased: false
description: |
 This small function is used as a shortcut for adding transparent gif spacer images.

returnValue: Returns a string.

example: |
 <cfoutput>
 #ss()# -- single spacer 1 x 1
 #ss(4,4)# -- Spacer 4 x4
 #ss(6,6,1)# -- Spacer 6 x 6 with 1px border
 </cfoutput>

args:
 - name: height
   desc: Height of spacer image. Defaults to 1.
   req: false
 - name: width
   desc: Width of spacer image. Defaults to 1.
   req: false
 - name: border
   desc: Border of spacer image. Defaults to 1.
   req: false
 - name: srcURL
   desc: Source of image. Defaults to s.gif.
   req: false
 - name: alt
   desc: Alt tag value. Defaults to an empty string.
   req: false


javaDoc: |
 /**
  * A UDF that will add a spacer gif image in a varity of formats to assist in page layout.
  * 
  * @param height      Height of spacer image. Defaults to 1. (Optional)
  * @param width      Width of spacer image. Defaults to 1. (Optional)
  * @param border      Border of spacer image. Defaults to 1. (Optional)
  * @param srcURL      Source of image. Defaults to s.gif. (Optional)
  * @param alt      Alt tag value. Defaults to an empty string. (Optional)
  * @return Returns a string. 
  * @author Dave Forrest (dmf67@yahoo.com) 
  * @version 1, September 30, 2005 
  */

code: |
 function ss() {    
     var height    = 1;
     var width    = 1;
     var border    = 0;
     var srcURL    = "s.gif";
     var alt        = "";
     var outString = "";
     if(arrayLen(arguments) gte 1) height = arguments[1];
     if(arrayLen(arguments) gte 2) width  = arguments[2];
     if(arrayLen(arguments) gte 3) border = arguments[3];
     if(arrayLen(arguments) gte 4) srcURL = arguments[4];
     if(arrayLen(arguments) gte 5) alt    = arguments[5];
     outString = "<img src=""#srcURL#"" height=""#height#"" width=""#width#"" alt=""#alt#"" border=""#border#"">";
     return outString;
 }

oldId: 1311
---

