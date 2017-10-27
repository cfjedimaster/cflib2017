---
layout: udf
title:  generatePassword
date:   2010-02-09T05:30:13.000Z
library: SecurityLib
argString: "[numberOfCharacters][, characterFilter]"
author: Tony Blackmon
authorEmail: fluid@sc.rr.com
version: 2
cfVersion: CF5
shortDescription: Generates a password the length you specify.
tagBased: false
description: |
 Generates a decent password that can contain uppercase, lowercase, numeric, and punctuation characters.

returnValue: Returns a string.

example: |
 <cfset newPassword = generatePassword(8)>
 <cfoutput>
    #newPassword#
 </cfoutput>

args:
 - name: numberOfCharacters
   desc: Lengh for the generated password. Defaults to 8.
   req: false
 - name: characterFilter
   desc: Characters filtered from result. Defaults to O,o,0,i,l,1,I,5,S
   req: false


javaDoc: |
 /**
  * Generates a password the length you specify.
  * v2 by James Moberg.
  * 
  * @param numberOfCharacters      Lengh for the generated password. Defaults to 8. (Optional)
  * @param characterFilter      Characters filtered from result. Defaults to O,o,0,i,l,1,I,5,S (Optional)
  * @return Returns a string. 
  * @author Tony Blackmon (fluid@sc.rr.com) 
  * @version 2, February 8, 2010 
  */

code: |
 function generatePassword() {
 var placeCharacter = "";
 var currentPlace=0;
 var group=0;
 var subGroup=0;
 var numberofCharacters = 8;
 var characterFilter = 'O,o,0,i,l,1,I,5,S';
 var characterReplace = repeatString(",", listlen(characterFilter)-1);
 if(arrayLen(arguments) gte 1) numberofCharacters = val(arguments[1]);
 if(arrayLen(arguments) gte 2) {
 characterFilter = listsort(rereplace(arguments[2], "([[:alnum:]])", "\1,", "all"),"textnocase");
 characterReplace = repeatString(",", listlen(characterFilter)-1);
 }
 while (len(placeCharacter) LT numberofCharacters) {
 group = randRange(1,4, 'SHA1PRNG');
 switch(group) {
 case "1":
 subGroup = rand();
     switch(subGroup) {
 case "0":
 placeCharacter = placeCharacter & chr(randRange(33,46, 'SHA1PRNG'));
 break;
 case "1":
 placeCharacter = placeCharacter & chr(randRange(58,64, 'SHA1PRNG'));
 break;
 }
 case "2":
 placeCharacter = placeCharacter & chr(randRange(97,122, 'SHA1PRNG'));
 break;
 case "3":
 placeCharacter = placeCharacter & chr(randRange(65,90, 'SHA1PRNG'));
 break;
 case "4":
 placeCharacter = placeCharacter & chr(randRange(48,57, 'SHA1PRNG'));
 break;
 }
 if (listLen(characterFilter)) {
 placeCharacter = replacelist(placeCharacter, characterFilter, characterReplace);
 }
 }
 return placeCharacter;
 }

oldId: 258
---

