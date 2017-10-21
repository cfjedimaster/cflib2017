---
layout: udf
title:  cleanPhone
date:   2011-06-24T14:41:54.000Z
library: StrLib
argString: "phoneNum"
author: Jeff Horne
authorEmail: jeff.horne@trizetto.com
version: 0
cfVersion: CF5
shortDescription: Strips unnecessary characters from phone numbers and returns a consistent looking phone number and extension, if necessary.
description: |
 Cleans up phone numbers that include leading 1s, text before and extension number or other characters.  Returns in (###) ###-#### x### format.  Uses PhoneFormat originally submitted by Derrick Rapley.

returnValue: Returns a string.

example: |
 <cfoutput>
     #cleanPhone("1 312-555-1212 ext 1234")#
 </cfoutput>

args:
 - name: phoneNum
   desc: Phone number string to "clean."
   req: true


javaDoc: |
 /**
  * Strips unnecessary characters from phone numbers and returns a consistent looking phone number and extension, if necessary.
  * 
  * @param phoneNum      Phone number string to "clean." (Required)
  * @return Returns a string. 
  * @author Jeff Horne (jeff.horne@trizetto.com) 
  * @version 0, June 24, 2011 
  */

code: |
 function cleanPhone(PhoneNum) {
     var thisCleanPhone ="";
 
     PhoneNum = ReReplace(trim(PhoneNum), "[^[:digit:]]", "", "all");
     
     // Trim away leading 1 in phone numbers.  No area codes start with 1 
     
     if (Left(Trim(PhoneNum),1) eq 1) {
       PhoneNum = Replace(PhoneNum,'1','');
     }
 
     thisCleanPhone = PhoneFormat(Left(PhoneNum,10));
     
     // if phone number is greater that 10 digits, use remaining digits as an extension
     
     if (len(trim(PhoneNum)) gt 10) {
         thisCleanPhone = thisCleanPhone &" x"& Right(PhoneNum,(len(trim(PhoneNum))-10));    
     }
     
     return trim(thisCleanPhone);
 
 }

---

