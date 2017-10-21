---
layout: udf
title:  generateRandomKey
date:   2009-05-10T02:05:23.000Z
library: SecurityLib
argString: "[case][, format][, length][, specialChars][, fixedPrefix][, fixedSuffix]"
author: Michael Sharman
authorEmail: michael@chapter31.com
version: 0
cfVersion: CF5
shortDescription: Generate a random key with options
description: |
 Generate a random key; the format of which can be based on a specific set of business rules such as numeric, string, alphanumeric and special characters.
 
 You can return lower, upper or mixed case + more options

returnValue: returns a string.

example: |
 myKey = generateRandomKey();
 myKey = generateRandomKey(case="mixed", format="alphanumeric", length="8");

args:
 - name: case
   desc: upper, lower, or mixed case - defaults upper
   req: false
 - name: format
   desc: numeric, string, alphanumeric or special
   req: false
 - name: length
   desc: length of key to generate
   req: false
 - name: specialChars
   desc: ist of special chars to help generate key from
   req: false
 - name: fixedPrefix
   desc: A prefix prepended to the generated key
   req: false
 - name: fixedSuffix
   desc: A suffix appended to the generated key
   req: false


javaDoc: |
 <!---
  Generate a random key with options
  
  @param case      upper, lower, or mixed case - defaults upper (Optional)
  @param format      numeric, string, alphanumeric or special (Optional)
  @param length      length of key to generate (Optional)
  @param specialChars      ist of special chars to help generate key from (Optional)
  @param fixedPrefix      A prefix prepended to the generated key (Optional)
  @param fixedSuffix      A suffix appended to the generated key (Optional)
  @return returns a string. 
  @author Michael Sharman (michael@chapter31.com) 
  @version 0, May 9, 2009 
 --->

code: |
 <cffunction name="generateRandomKey" access="public" output="false" returntype="string">
     <cfargument name="case" type="string" default="upper" hint="Whether upper, lower or mixed" />
     <cfargument name="format" type="string" default="alphanumeric" hint="Whether to generate numeric, string, alphanumeric or special (includes alphanumeric and special characters such as ! @ & etc)" />
     <cfargument name="invalidCharacters" type="string" default="" hint="List of invalid characters which will be excluded from the key. This overrides the default list" />
     <cfargument name="length" type="numeric" default="8" hint="The length of the key to generate" />
     <cfargument name="numericPrefix" type="numeric" default="0" hint="Number of random digits to start the key with (the rest of the key will be whatever the 'format' is)" />
     <cfargument name="numericSuffix" type="numeric" default="0" hint="Number of random digits to end the key with (the rest of the key will be whatever the 'format' is)" />
     <cfargument name="fixedPrefix" type="string" default="" hint="A prefix prepended to the generated key. The length of which is subtracted from the 'length' argument" />
     <cfargument name="fixedSuffix" type="string" default="" hint="A suffix appended to the generated key. The length of which is subtracted from the 'length' argument" />
     <cfargument name="specialChars" type="string" default="" hint="List of special chars to help generate key from. Overrides the default 'characterMap.special' list" />
     <cfargument name="debug" type="boolean" default="false" hint="Returns cfcatch information in the event of an error. Try turning on if function returns no value." />
 
     <cfscript>
                         
         var i = 0;
         var key = "";
         var keyCase = arguments.case;
         var keyLength = arguments.length;
         var uniqueChar = "";
         var invalidChars = "o,i,l,s,O,I,L,S";    //Possibly confusing characters we will remove
         var characterMap = structNew();
         var characterLib = "";
         var libLength = 0;
         
         try
         {
             
             characterMap.numeric = "0,1,2,3,4,5,6,7,8,9";
             characterMap.stringLower = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
             characterMap.stringUpper = UCase(characterMap.stringLower);
             characterMap.stringCombined = listAppend(characterMap.stringLower, characterMap.stringUpper);
                         
             if (len(trim(arguments.specialChars)))
                 characterMap.special = arguments.specialChars;
             else
                 characterMap.special = "!,@,##,$,%,^,&,*,(,),_,-,=,+,/,\,[,],{,},<,>,~";
 
             switch (arguments.format)
             {
                 case "numeric":
                     characterLib = characterMap.numeric;            
                     break;
                 case "string":
                     if (keyCase EQ "upper")
                     {
                         characterLib = characterMap.stringUpper;
                     }                
                     else if (keyCase EQ "lower")
                     {
                         characterLib = characterMap.stringLower;
                     }                
                     else if (keyCase EQ "mixed")
                     {
                         characterLib = characterMap.stringCombined;
                     }
                     break;
                 case "alphanumeric":
                     invalidChars = invalidChars.concat(",0,1,5");        //Possibly confusing chars removed
                     if (keyCase EQ "upper")
                     {
                         characterLib = listAppend(characterMap.numeric, characterMap.stringUpper);
                     }
                     else if (keyCase EQ "lower")
                     {
                         characterLib = listAppend(characterMap.numeric, characterMap.stringLower);
                     }                
                     else if (keyCase EQ "mixed")
                     {
                         characterLib = listAppend(characterMap.numeric, characterMap.stringCombined);
                     }
                     break;
                 case "special":
                     invalidChars = invalidChars.concat(",0,1,5");        //Possibly confusing chars removed
                     if (keyCase EQ "upper")
                     {
                         characterLib = listAppend(listAppend(characterMap.numeric, characterMap.stringUpper), characterMap.special);
                     }
                     else if (keyCase EQ "lower")
                     {
                         characterLib = listAppend(listAppend(characterMap.numeric, characterMap.stringLower), characterMap.special);
                     }                    
                     else if (keyCase EQ "mixed")
                     {
                         characterLib = listAppend(listAppend(characterMap.numeric, characterMap.stringCombined), characterMap.special);
                     }
                     break;
             }
     
             if (len(trim(arguments.invalidCharacters)))
                 invalidChars = arguments.invalidCharacters;
     
             if (len(trim(arguments.fixedPrefix)))
             {
                 key = arguments.fixedPrefix;
                 keyLength = keyLength - len(trim(arguments.fixedPrefix));
             }
             
             if (len(trim(arguments.fixedSuffix)))
             {
                 keyLength = keyLength - len(trim(arguments.fixedSuffix));
             }
         
             libLength = listLen(characterLib);
     
             for (i = 1;i LTE keyLength;i=i+1)
             {
                 do
                 {
                     if (arguments.numericPrefix GT 0 AND i LTE arguments.numericPrefix)
                     {
                         uniqueChar = listGetAt(characterMap.numeric, randRange(1, listLen(characterMap.numeric)));
                     }
                     else if (arguments.numericSuffix GT 0 AND keyLength-i LT arguments.numericSuffix)
                     {
                         uniqueChar = randRange(characterMap.numeric, randRange(1, listLen(characterMap.numeric)));
                     }
                     else
                     {
                         uniqueChar = listGetAt(characterLib, randRange(1, libLength));
                     }
                 }
                 while (listFind(invalidChars, uniqueChar));                
                 key = key.concat(uniqueChar);
             }
             
             if (len(trim(arguments.fixedSuffix)))
                 key = key.concat(trim(arguments.fixedSuffix));
 
         }
         catch (Any e)
         {
             if (arguments.debug)
                 key = e.message & " " & e.detail;
             else
                 key = "";
         }
 
         return key;
         
     </cfscript>
 
 </cffunction>

---

