---
layout: udf
title:  yearAsString
date:   2006-03-17T12:57:28.000Z
library: DateLib
argString: "yearnum"
author: Christopher Jewell
authorEmail: cdjewell@gmail.com
version: 2
cfVersion: CF5
shortDescription: Returns a string representation of the numeric year passed into it.
tagBased: false
description: |
 An updated version of Larry Juncker's version with the following enhancements/fixes:
 
 1. Won't puke on 1990, 2000, etc.
 2. Writes out 2011 as &quot;Two Thousand and Eleven&quot; instead of &quot;Two Thousand and Ten One&quot;.
 3. Corrects the misspelling of &quot;Forty&quot;.
 
 Only good for the year 1000 and later.

returnValue: Returns a string.

example: |
 2000 = #YearAsString(2000)#

args:
 - name: yearnum
   desc: Numeric year.
   req: true


javaDoc: |
 /**
  * Returns a string representation of the numeric year passed into it.
  * version 1 by Larry Juncker (ljuncker@aljcompserv.com)
  * 
  * @param yearnum      Numeric year. (Required)
  * @return Returns a string. 
  * @author Christopher Jewell (cdjewell@gmail.com) 
  * @version 2, March 17, 2006 
  */

code: |
 function yearAsString(yearnum) {
     var numTenList="Ten,Twenty,Thirty,Forty,Fifty,Sixty,Seventy,Eighty,Ninety";
     var numList="One,Two,Three,Four,Five,Six,Seven,Eight,Nine,Ten,Eleven,Twelve,Thirteen,Fourteen,Fifteen,Sixteen,Seventeen,Eighteen,Nineteen";
     var y1 = mid(yearnum,1,1);
     var y2 = mid(yearnum,2,1);
     var y3 = mid(yearnum,3,1);
     var y4 = mid(yearnum,4,1);
     var YY = mid(yearnum,3,2);
     var y2Str = "";
     var y3Str = "";
     var y4Str = "";
     var yearStr = "";
 
     if(y2 GT 0) y2Str = listGetAt(numList,y2) & " Hundred";
     
     //Special case for XX11 through XX19
     if(YY gt 10 and YY lt 20) {
         y3Str = listGetAt(numList,YY);
     } else {
         if(y3 GT 0) y3Str = listGetAt(numTenList,y3);
         if(y4 GT 0) y4Str = listGetAt(numList,y4);
     }
 
     if(len(y3Str) or len(y4Str)) {
         yearStr = listGetAt(numList,y1) & " Thousand "   & y2Str & " " &  " and " & y3Str & " " & y4Str;
     } else {
         yearStr = listGetAt(numList,y1) & " Thousand "   & y2Str;
     }
     return trim(yearStr);
 }

oldId: 1419
---

