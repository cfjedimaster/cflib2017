---
layout: udf
title:  BracketNumberFormat
date:   2002-08-26T11:45:36.000Z
library: StrLib
argString: "myNum"
author: Andrew Peterson
authorEmail: webmaster@mail.ioc.state.il.us
version: 1
cfVersion: CF5
shortDescription: Returns a negative number in brackets.
tagBased: false
description: |
 When using NumberFormat (under CF5) function, you have to supply place settings (a &quot;9&quot; or a &quot;_&quot;) if you want to use brackets to display a negative number instead of a &quot;-&quot; (minus) sign. BracketNumberFormat uses NumberFormat in conjunction with a bit more code to provide a negative number with brackets surrounding it.
 
 In CFMX, you can simply use a number format mask of &quot;()&quot; to get the same result.

returnValue: Returns a string.

example: |
 <cfoutput>
 #BracketNumberFormat(2109)#<br>
 #BracketNumberFormat(-2109)#<br>
 </cfoutput>

args:
 - name: myNum
   desc: Number to format.
   req: true


javaDoc: |
 /**
  * Returns a negative number in brackets.
  * 
  * @param myNum      Number to format. (Required)
  * @return Returns a string. 
  * @author Andrew Peterson (webmaster@mail.ioc.state.il.us) 
  * @version 1, August 26, 2002 
  */

code: |
 function BracketNumberFormat(myNum) {
    if(myNum eq "") {
     return 0;
     } else {
       if(myNum lt 0)
       {
          return '(' & numberformat(right(myNum, len(myNum)-1)) & ')';
       } else {
          return numberFormat(myNum);
       }
     }
   }

---

