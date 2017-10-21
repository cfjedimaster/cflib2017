---
layout: udf
title:  passwordCheck
date:   2011-06-15T17:36:05.000Z
library: SecurityLib
argString: "password[, charOpts][, typeRequired][, length]"
author: Scott Stroz
authorEmail: scott@boyzoid.com
version: 1
cfVersion: CF6
shortDescription: Checks the compelxity of a password.
description: |
 This function will check the complexity of a password.  It will check for the existence of letters, numbers, and non-alphanumeric characters in a given password.  Optionally, it can for check for the number of times each of these occurs.  
 
 When specifying CharOpts, the following use the text potion of a CF egular Expression character class.
 For example if you wish to check for all letters, you would use 'alpha' in the CharOpts.
 If you wish to exclude character sets, add 'no_' to the beginning of the text label.
 For example if you wish check all characters but numbers you would use 'no_digit'.
 
 If you wish to specify how many of each character class are required, enter that number as follows:
 'alpha 2, digit 3'.
 
 When specifying the number of characters to include for a character class, you are specifying that the charcater class is REQUIRED for the password.

returnValue: Returns a boolean.

example: |
 <cfset password="abcd123">
 <cfif passwordCheck(password)>
 Good password.
 <cfelse>
 Bad password.
 </cfif>

args:
 - name: password
   desc: Password to check.
   req: true
 - name: charOpts
   desc: Character options. See description. Default is alpha,digit,punct.
   req: false
 - name: typeRequired
   desc: Number of charOpts that must be valid. Default is 2.
   req: false
 - name: length
   desc: Minimum length of password. Default is 8.
   req: false


javaDoc: |
 <!---
  Checks the compelxity of a password.
  
  @param password      Password to check. (Required)
  @param charOpts      Character options. See description. Default is alpha,digit,punct. (Optional)
  @param typeRequired      Number of charOpts that must be valid. Default is 2. (Optional)
  @param length      Minimum length of password. Default is 8. (Optional)
  @return Returns a boolean. 
  @author Scott Stroz (scott@boyzoid.com) 
  @version 1, June 15, 2011 
 --->

code: |
 <cffunction name="passwordCheck">
     <cfargument name="password" required="true" type="string">
     <cfargument name="CharOpts" required="false" type="string" default="alpha,digit,punct">
     <cfargument name="typesRequired" required="false" type="numeric" default="2">
     <cfargument name="length" required="false" type="numeric" default="8">
 
 
     <!--- Initialize variables --->
     <cfset var TypesCount = 0>
     <cfset var i = "">
     <cfset var charClass = "">
     <cfset var checks = structNew()>
     <cfset var numReq = "">
     <cfset var reqCompare = "">
     <cfset var j = "">
     
     <!--- Use regular expressions to check for the presence banned characters such as tab, space, backspace, etc  and password length--->
     <cfif ReFind("[[:cntrl:] ]",password) OR len(password) LT length>
         <cfreturn false>
     </cfif>
 
 
     <!--- Loop through the list 'mustHave' --->
     <cfloop list="#charOpts#" index="i">
         <cfset charClass = listGetat(i,1,' ')>
         <!--- Check to see if item in list should be included or excluded --->
         <cfif listgetat(i,1,"_") eq "no">
             <cfset regex = "[^[:#listgetat(charClass,2,'_')#:]]">
         <cfelse>
             <cfset regex = "[[:#charClass#:]]">
         </cfif>
         
         <!--- If regex found, set variable to position found --->
         <cfset checks["check#replace(charClass,' ','_','all')#"] = ReFind(regex,password)>
 
         <!--- If regex not found set valid to false --->
         <cfif checks["check#replace(charClass,' ','_','all')#"] GT 0>
             <cfset typesCount = typesCount + 1>
         </cfif>
 
         <cfif listLen(i, ' ') GT 1>
             <cfset numReq = listgetat(i,2,' ')>
             <cfset reqCompare = 0>
             <cfloop from="1" to="#len(password)#" index="j">
                 <cfif REFind(regex,mid(password,j,1))>
                     <cfset reqCompare = reqCompare + 1>
                 </cfif>
             </cfloop>
             <cfif reqCompare LT numReq>
                 <cfreturn false>
             </cfif>
         </cfif>
     </cfloop>
 
     <!--- Check that retrieved values match with the give criteria --->
     <cfif typesCount LT typesRequired>
         <cfreturn false>
     </cfif>
     
     <cfreturn true>
     
 </cffunction>

---

