---
layout: udf
title:  dice
date:   2012-04-24T22:13:13.000Z
library: StrLib
argString: "str, size[, sep]"
author: Richard
authorEmail: acdhirr@trilobiet.nl
version: 1
cfVersion: CF5
shortDescription: Divide a string in parts of equal size with separators in between/
description: |
 Divide a string in parts of equal size separated by a character sequence of choice. 
 
 Default separator is the wbr tag. Handy if you need to put long words in a very small space, like an HTML table with many columns.

returnValue: Returns a string.

example: |
 <cfoutput>#dice("Supercalifragilisticexpialidocious",10)#</cfoutput>    
 
 <cfoutput>#dice("Supercalifragilisticexpialidocious",10,"-")#</cfoutput>

args:
 - name: str
   desc: String to dice
   req: true
 - name: size
   desc: Size of the resulting parts
   req: true
 - name: sep
   desc: Separator between resulting parts
   req: false


javaDoc: |
 /**
  * Divide a string in parts of equal size with separators in between/
  * 
  * @param str      String to dice (Required)
  * @param size      Size of the resulting parts (Required)
  * @param sep      Separator between resulting parts (Optional)
  * @return Returns a string. 
  * @author Richard (acdhirr@trilobiet.nl) 
  * @version 1, April 24, 2012 
  */

code: |
 function dice(str,size) {
 
     var r = "";
     var i = 0;
     var sep = "<wbr/>";    
 
     if (arrayLen(arguments) GT 2 ) sep = arguments[3];
     
     for ( i=0; i LT len(str); i=i+1 ) {
         if ( (i-size+1) mod size eq 1) r&=sep; 
         r &= str.charAt(i);
     }    
     
     return trim(r);
 }

---

