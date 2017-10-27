---
layout: udf
title:  RowColor
date:   2011-12-21T23:27:24.000Z
library: UtilityLib
argString: "colorList, currentRow[, delimiter]"
author: Al Everett
authorEmail: everett.al@gmail.com
version: 1
cfVersion: CF5
shortDescription: Returns alternating color based on list of colors.
tagBased: false
description: |
 Returns color from list of colors based on row number sent. Useful for alternating row colors in a table, but is not limited to two colors. Also see EvenOddColor.

returnValue: Returns a string.

example: |
 <cfset colorList=("blue,##ff0000,white")>
 <cfoutput>
 <table>
 <cfloop from="1" to="10" index="i">
 <tr bgcolor="#RowColor(colorList,i,",")#">
 <td>Row Number: #i#</td>
 </tr>
 </cfloop>
 </table>
 </cfoutput>

args:
 - name: colorList
   desc: List of colors.
   req: true
 - name: currentRow
   desc: Current row number.
   req: true
 - name: delimiter
   desc: List delimiter for colorList. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Returns alternating color based on list of colors.
  * 
  * @param colorList      List of colors. (Required)
  * @param currentRow      Current row number. (Required)
  * @param delimiter      List delimiter for colorList. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Al Everett (everett.al@gmail.com) 
  * @version 1, December 21, 2011 
  */

code: |
 function rowColor(colorList,currentRow) {
     var delimiter=",";
     var rowColor="";
     var colorIndex=1;
 
     if (ArrayLen(arguments) GT 2) delimiter = arguments[3];
     
     colorIndex=currentRow MOD ListLen(colorList,delimiter) + 1;
     
     rowColor=ListGetAt(colorList,colorIndex,delimiter);
     
     return rowColor;
 }

oldId: 901
---

