---
layout: udf
title:  IsWebSafeColor
date:   2001-11-06T14:47:31.000Z
library: UtilityLib
argString: "hexColor"
author: Eric Carlisle
authorEmail: ericc@nc.rr.com
version: 1
cfVersion: CF5
shortDescription: Returns true if the given color is a web safe hexadecimal color.
tagBased: false
description: |
 Returns true if the given color is a web safe hexadecimal color.  IsWebSafeColor accepts a 6 digit hexadecimal color as an agument.  It returns true if the color is in the 216 color web safe pallette.  If not, it returns false.

returnValue: Returns a Boolean value.

example: |
 <CFSET Color1="3366cc">
 <CFSET Color2="c0c0c0">
 <cfoutput>
 Is #Color1# a web safe color? #YesNoFormat(IsWebSafeColor(Color1))#<BR>
 Is #Color2# a web safe color? #YesNoFormat(IsWebSafeColor(Color2))#<BR>
 </cfoutput>

args:
 - name: hexColor
   desc: Hex color representation to validate.
   req: true


javaDoc: |
 /**
  * Returns true if the given color is a web safe hexadecimal color.
  * 
  * @param hexColor      Hex color representation to validate. 
  * @return Returns a Boolean value. 
  * @author Eric Carlisle (ericc@nc.rr.com) 
  * @version 1, November 6, 2001 
  */

code: |
 function IsWebSafeColor(hexColor){
   /* Establish list of web safe colors */
   Var safeList = "00,33,66,99,cc,ff";
     
   /* Strip out poundsigns from argument. */
   Var tHexColor = replace(hexColor,'##','','ALL');
 
   /* Initialize i */
   Var i=0;
   
   /* Loop over r,g,b hex values */
   for (i=1; i lte 5; i=i+2){
         
     /* Set result to FALSE if a color isn't web safe. */    
     if (listFindNoCase(safeList,mid(tHexColor,i,2)) eq 0){
       return False;
     }
   }
   return True;
 }

oldId: 341
---

