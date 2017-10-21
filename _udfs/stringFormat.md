---
layout: udf
title:  stringFormat
date:   2007-08-10T12:45:09.000Z
library: StrLib
argString: "str, msk"
author: Joshua Miller
authorEmail: jmiller@garrisonenterprises.net
version: 1
cfVersion: CF5
shortDescription: Formats a string similarly to how NumberFormat formats a number.
description: |
 Formats an alpha-numeric string to match a given mask. Useful for displaying phone numbers, IP addresses, codes, etc.

returnValue: Returns a string.

example: |
 stringFormat("12ABC01","XX-XXX.XX")

args:
 - name: str
   desc: String to format.
   req: true
 - name: msk
   desc: Mask to use.
   req: true


javaDoc: |
 /**
  * Formats a string similarly to how NumberFormat formats a number.
  * 
  * @param str      String to format. (Required)
  * @param msk      Mask to use. (Required)
  * @return Returns a string. 
  * @author Joshua Miller (jmiller@garrisonenterprises.net) 
  * @version 1, August 10, 2007 
  */

code: |
 function stringFormat(str,msk){
     var i=0;
     var c=1;
     var r="";
     for(i=1;i LTE Len(msk);i=i+1){
         if(Find("X",mid(msk,i,1)) GT 0){
             if(c LTE Len(str)){
                 r = r & mid(str,c,1);
                 c = c + 1;
             }else{
                 r = r & " ";
             }
         }else{
             r = r & mid(msk,i,1);
         }
     }
     return r;
 }

---

