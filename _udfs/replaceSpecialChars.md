---
layout: udf
title:  replaceSpecialChars
date:   2012-01-04T22:14:59.000Z
library: StrLib
argString: "textString[, replaceTheseChars][, replaceWithChar]"
author: David Long
authorEmail: dlong@cagedata.com
version: 1
cfVersion: CF6
shortDescription: Replaces all special characters in a string of text.
description: |
 Replaces all special characters in a string of code along with spaces.  Code can easily be chaged to exclude spaces.

returnValue: Returns a string.

example: |
 <cfset myString = "!Hello_World! This is my ^string^">
 <cfset myNewString = replaceSpecialChars(myString)>
 <cfoutput>
     "#myString#" now becomes "#myNewString#"
 </cfoutput>

args:
 - name: textString
   desc: String to have special characters replaced
   req: true
 - name: replaceTheseChars
   desc: Characters to be replaced
   req: false
 - name: replaceWithChar
   desc: Character to replace special characters with. Defaults to chr(0).
   req: false


javaDoc: |
 <!---
  Replaces all special characters in a string of text.
  
  @param textString      String to have special characters replaced (Required)
  @param replaceTheseChars      Characters to be replaced (Optional)
  @param replaceWithChar      Character to replace special characters with. Defaults to chr(0). (Optional)
  @return Returns a string. 
  @author David Long (dlong@cagedata.com) 
  @version 1, January 4, 2012 
 --->

code: |
 <cffunction name="replaceSpecialChars" access="public" output="false" returntype="String">
     <cfargument name="textString" type="String" hint="String to have special characters replaced">
     <!--- If you would not like to remove spaces take the number 32 out of the list.--->
     <cfargument name="replaceTheseChars" type="String" default="32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,58,59,60,61,62,63,64,91,92,93,94,95,96,123,124,126" required="false" hint="Characters to be replaced">
     <cfargument name="replaceWithChar" type="String" default="#chr(0)#" required="no" hint="Character to replace special characters with.">
     <cfscript>
         var returnString = ARGUMENTS.textString;
         var i = 1;
         
         for(i=1; i <= listLen(ARGUMENTS.replaceTheseChars,','); i++){
             returnString = replace(returnString,chr(listGetAt(ARGUMENTS.replaceTheseChars,i)),ARGUMENTS.replaceWithChar,'all');
         }
     </cfscript>
     
     <cfreturn returnString />
 </cffunction>

---

