---
layout: udf
title:  varNameToText
date:   2009-01-07T00:16:38.000Z
library: StrLib
argString: "str"
author: Tony Felice
authorEmail: sites@breckcomm.com
version: 2
cfVersion: CF5
shortDescription: Converts a camel-case or underscored var name to plain text.
tagBased: true
description: |
 Converts a camel-case or underscored var name to plain text.

returnValue: Returns a string.

example: |
 <cfoutput>#varNameToText("thisIsTheVarName")#</cfoutput>

args:
 - name: str
   desc: String to parse.
   req: true


javaDoc: |
 <!---
  Converts a camel-case or underscored var name to plain text.
  v2 mods by RCamden
  
  @param str      String to parse. (Required)
  @return Returns a string. 
  @author Tony Felice (sites@breckcomm.com) 
  @version 2, January 6, 2009 
 --->

code: |
 function varNameToText(str) {
     var words = "";
     var i = "";
     var output="";
 
     str = reReplace(str,"([.^[:upper:]])", " \1","all");
     str = reReplace(str,"([.^_])", " ","all");
     words = ListToArray(str, " ");    
     for(i=1; i LTE (ArrayLen(Words)); i=i+1){
         words[i] = ucase(mid(words[i],1, 1)) & mid(words[i],2, len(words[i])-1);
     }
     output = arrayToList(words, " ");        
     return output;
 }

---

