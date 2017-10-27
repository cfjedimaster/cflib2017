---
layout: udf
title:  MakePassword
date:   2001-12-18T19:20:02.000Z
library: SecurityLib
argString: ""
author: Alan McCollough
authorEmail: amccollough@anmc.org
version: 1
cfVersion: CF5
shortDescription: Generates an 8-character random password free of annoying similar-looking characters such as 1 or l.
tagBased: false
description: |
 Generates a random 8-character password 
 that is free of annoying easily confused characters such as 1 or l, O or 0.  This is done by taking a UUID, combining parts of it into two-byte chunks, and treating the two-byte chunk as a hexadecimal number. This number is then converted into base-10 and converted into a chr().
 
 This is done until 8 such chars are generated. The result is compared to see if any unwanted similar chars exist, and if so, the sequence is re-ran.
 
 This is done by taking a UUID, combining parts of it into two-byte chunks, and treating the two-byte chunk as a hexadecimal number. This number is then
 converted into base-10 and converted into a chr().
 
 This is done until 8 such chars are generated. The result is compared to see if any
 unwanted similar chars exist, and if so, the sequence is re-ran.

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 Here is a random password: #MakePassword()#
 </CFOUTPUT>

args:


javaDoc: |
 /**
  * Generates an 8-character random password free of annoying similar-looking characters such as 1 or l.
  * 
  * @return Returns a string. 
  * @author Alan McCollough (amccollough@anmc.org) 
  * @version 1, December 18, 2001 
  */

code: |
 function MakePassword()
 {      
   var valid_password = 0;
   var loopindex = 0;
   var this_char = "";
   var seed = "";
   var new_password = "";
   var new_password_seed = "";
   while (valid_password eq 0){
     new_password = "";
     new_password_seed = CreateUUID();
     for(loopindex=20; loopindex LT 35; loopindex = loopindex + 2){
       this_char = inputbasen(mid(new_password_seed, loopindex,2),16);
       seed = int(inputbasen(mid(new_password_seed,loopindex/2-9,1),16) mod 3)+1;
       switch(seed){
         case "1": {
           new_password = new_password & chr(int((this_char mod 9) + 48));
           break;
         }
     case "2": {
           new_password = new_password & chr(int((this_char mod 26) + 65));
           break;
         }
         case "3": {
           new_password = new_password & chr(int((this_char mod 26) + 97));
           break;
         }
       } //end switch
     }
     valid_password = iif(refind("(O|o|0|i|l|1|I|5|S)",new_password) gt 0,0,1);    
   }
   return new_password;
 }

oldId: 437
---

