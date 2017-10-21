---
layout: udf
title:  Rot13
date:   2001-08-23T13:07:08.000Z
library: SecurityLib
argString: "string"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Caesar-cypher encryption that replaces each English letter with the one 13 places forward or back along the alphabet.
description: |
 Stands for "rotate alphabet 13 places".  Caesar-cypher encryption that replaces each English letter with the one 13 places forward or back along the alphabet.  The same function is used to both encrypt and decrypt a string.

returnValue: Returns a string.

example: |
 <CFSET String="Welcome to the Common Function Library Project.">
 <CFSET Encrypted = Rot13(String)>
 <CFSET Decrypted = Rot13(Encrypted)>
 
 <CFOUTPUT>
 <B>Original:</B><BR>
 #String#
 <P>
 <B>Encrypted:</B><BR>
 #Encrypted#
 <P>
 <B>Dencrypted:</B><BR>
 #Decrypted#
 </CFOUTPUT>

args:
 - name: string
   desc: String you wish to rot13 encrypt.
   req: true


javaDoc: |
 /**
  * Caesar-cypher encryption that replaces each English letter with the one 13 places forward or back along the alphabet.
  * 
  * @param string      String you wish to rot13 encrypt. 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1.0, August 23, 2001 
  */

code: |
 function rot13(string)
 {
   var i=0;
   var j=0;
   var k=0;
   var out="";
   for (i=1; i LTE Len(String); i=i+1){
     j=Asc(Mid(string, i, 1));
     if(j GTE 65 AND j LTE 90){
       j=((J-52) MOD 26)+65;
     }
     else if(j GTE 97 AND j LTE 122){
       j=((j-84) MOD 26)+97;
     }
     out=out&Chr(j);
   }
   return out;
 }

---

