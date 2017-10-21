---
layout: udf
title:  naughtyFilter
date:   2004-08-17T11:26:08.000Z
library: StrLib
argString: "body[, replaceType][, repeatValue][, naughtyList][, replaceString]"
author: Chris Wigginton
authorEmail: c_wigginton@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Replaces dirty words with pattern.
description: |
 Replaces dirty words in text using naughtyList (Carlin's 7 dirty words as an example) with either middle characters only or full replacement of text.

returnValue: Returns a string.

example: |
 <cfset testTxt ="George Carlin's 7 Dirty words are shit piss fuck cunt cocksucker, mother fucker and tits">
 
 <cfoutput>#naughtyFilter(testTxt,"FL")#</cfoutput>

args:
 - name: body
   desc: String to check.
   req: true
 - name: replaceType
   desc: If ALL, all characters are replaced. If FL, only the middle characters are replaced. Defaults to ALL.
   req: false
 - name: repeatValue
   desc: String to use for replacement when replaceType is FL. Defaults to *
   req: false
 - name: naughtyList
   desc: Default list of curse words.
   req: false
 - name: replaceString
   desc: Used for replacements when replaceType is ALL.
   req: false


javaDoc: |
 <!---
  Replaces dirty words with pattern.
  
  @param body      String to check. (Required)
  @param replaceType      If ALL, all characters are replaced. If FL, only the middle characters are replaced. Defaults to ALL. (Optional)
  @param repeatValue      String to use for replacement when replaceType is FL. Defaults to * (Optional)
  @param naughtyList      Default list of curse words. (Optional)
  @param replaceString      Used for replacements when replaceType is ALL. (Optional)
  @return Returns a string. 
  @author Chris Wigginton (c_wigginton@yahoo.com) 
  @version 1, November 30, 2004 
 --->

code: |
 <cffunction name="naughtyFilter"  returntype="string" hint="Replaces unmentionables with gobbledegook">
     <cfargument name="body" type="string" required="yes" hint="Contains text to filter">
     <cfargument name="replaceType" default="all" hint="ALL - all characters, FL - only the middle bits are replaced">
     <cfargument name="repeatValue" default="*" hint="Character to repeat for replaced dirty characters">
     <cfargument name="naughtyList" default="mother fucker,cocksucker,shit,piss,fuck,cunt,tits" hint="George Carlin's original 7 dirty words, not in his original order, but the longest listed first">
     <cfargument name="replaceString" default="!@##$%^&*()!@##$%^&*()!@##$%^&*" hint="A replace string for ALL method, length must be at least as long as the longest dirty word">
     <cfset var naughtyWord = "">
     <cfset var replacement = "">
 
     <cfloop list="#Arguments.naughtyList#" index="naughtyWord" delimiters=",">
         <cfswitch expression="#UCase(Arguments.replaceType)#">
             <cfcase value="FL">
                 <cfif Len(naughtyWord) GTE 3>
                     <cfset replacement = Left(naughtyWord,1) & RepeatString(Arguments.repeatValue,Len(naughtyWord) - 2) & Right(naughtyWord,1)>
                 <cfelse>
                     <cfset replacement = RepeatString(Arguments.repeatValue,Len(naughtyWord))>
                 </cfif>    
             </cfcase>
             <cfdefaultcase>
                     <cfset replacement = Left(Arguments.replaceString,Len(naughtyWord))>
             </cfdefaultcase>
 
         </cfswitch>
         <cfset Arguments.body = REReplaceNoCase(Arguments.body,naughtyWord,replacement, "ALL")>
     </cfloop>
     <cfreturn Arguments.body>
 </cffunction>

---

