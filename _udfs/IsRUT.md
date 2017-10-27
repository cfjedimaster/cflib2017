---
layout: udf
title:  IsRUT
date:   2002-01-09T14:28:10.000Z
library: StrLib
argString: "rut"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Returns True if the specified value and verifying digit constitute a valid RUT (government company number used in Chile).
tagBased: false
description: |
 Returns True if the specified value and verifying digit constitute a valid RUT (government company number used by Chile).  RUT numbers appear in the form xx.xxx.xxx-y or x.xxx.xxx-y where x represents digits 0-9 and y represents the verifying digit in the form 0-9|K.

returnValue: Returns a Boolean.

example: |
 <CFSET RUT="13.623.479-K">
 <CFSET NUT="12.345.678-0">
 <CFOUTPUT>
 Is #RUT# a valid RUT? #YesNoFormat(IsRut(RUT))#<BR>
 Is #NUT# a valid RUT? #YesNoFormat(IsRut(NUT))#<BR>
 </CFOUTPUT>

args:
 - name: rut
   desc: RUT you want to verify.
   req: true


javaDoc: |
 /**
  * Returns True if the specified value and verifying digit constitute a valid RUT (government company number used in Chile).
  * 
  * @param rut      RUT you want to verify. 
  * @return Returns a Boolean. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, January 9, 2002 
  */

code: |
 function isrut(rut) {
   var dig=right(rut,1);
   var largo=0;
   var suma=0;
   var factor=2;
   var digito=0;
   var i=0;
   var valor="";
   rut=ReplaceList(rut, ".,-", "");
   rut=Left(Rut, Len(Rut)-1);
   if (isNumeric(rut)){
     largo=len(rut);
     for (i=largo;  i gte 1; i=i-1){
       if (factor gt 7) {
         factor=2;
       }
       suma = suma + factor * int(mid(rut,i,1));
       factor = factor + 1;
     }
 
     digito = 11 - (suma mod 11);
     switch(digito) {
       case 10: {
         valor = "K";
         break;
       }
       case 11: {
         valor = "0";
         break;
       }    
       default: {
         valor = digito;
         break;
       }
     }
 
     if (Ucase(valor) eq Ucase(dig)){
       return true;
     }
     else {
       return false;
     }
   }
   else {
     return false;
   }
 }

oldId: 461
---

