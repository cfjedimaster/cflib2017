---
layout: udf
title:  Assert
date:   2004-09-23T14:56:26.000Z
library: DataManipulationLib
argString: "assertion"
author: Dean Chalk
authorEmail: dchalk99@hotmail.com
version: 2
cfVersion: CF5
shortDescription: Complex variable checking with a single function call.
description: |
 This function when passed an assertion rule string will validate assertions given, which enables the user to parse multiple variables against multiple rule sets.

returnValue: Returns a Boolean value.

example: |
 <cfset myage = 35>
 <cfset myname = "dean">
 <CFOUTPUT>
 Given Assertion="myage as a: isnumeric(|a|); |a| gt 0; |a| lt 100 ! myname as b: isdefined('|b|'); len(|b|) GT 3":<BR>
 <cfif assert("myage as a: isnumeric(|a|); |a| gt 0; |a| lt 100 ! myname as b: isdefined('|b|'); len(|b|) GT 3")>
 
 Assertion  is correct
 <cfelse>
 Assertion is incorrect
 </cfif>
 </CFOUTPUT>

args:
 - name: assertion
   desc: Assertion rule string you want to validate against.  Variable names should be delimited by the pipe (|).
   req: true


javaDoc: |
 /**
  * Complex variable checking with a single function call.
  * Version 2 by Michael Wolfe, mikey@mikeycentral.com. Returns false earlier.
  * 
  * @param assertion      Assertion rule string you want to validate against.  Variable names should be delimited by the pipe (|). (Required)
  * @return Returns a Boolean value. 
  * @author Dean Chalk (dchalk99@hotmail.com) 
  * @version 2, September 23, 2004 
  */

code: |
 function assert(assertion) {
     var result = 1;
     var loopvar1 = 0;
     var loopvar2 = 0;
     var variableassertion = "";
     var varsection = "";
     var varname = "";
     var varalias = "";
     var assertionsection = "";
     var anassertion = "";
     var assertnow = "";
     var doBreak = false;
     
     for(loopvar1 = 1; loopvar1 LTE listlen(assertion, "!"); loopvar1 = incrementvalue(loopvar1)) {
         variableassertion = listgetat(assertion, loopvar1, "!");
         varsection = trim(gettoken(variableassertion, 1, ":"));
         varname = trim(listfirst(varsection, " "));
         varalias = trim(listlast(varsection, " "));
         assertionsection = trim(gettoken(variableassertion, 2, ":"));
         
         for(loopvar2 = 1; loopvar2 LTE listlen(assertionsection, ";"); loopvar2 = incrementvalue(loopvar2)) {
             anassertion = listgetat(assertionsection, loopvar2, ";");
             
             if(not isdefined(varname)){
                 result = 0;
                 doBreak = true;
                 break;
             } else {
                 assertnow = replacenocase(anassertion, "|#varalias#|", varname, "ALL");
                 
                 if(not(evaluate(trim(assertnow)))){
                     result = 0;
                     doBreak = true;
                     break;
                 }
             }
         }
         
         if(doBreak){
             break;
         }
     }
     
     return result;
 }

---

