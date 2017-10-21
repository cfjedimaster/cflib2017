---
layout: udf
title:  WordInstance
date:   2004-09-20T12:22:22.000Z
library: StrLib
argString: "word, string"
author: Joshua Miller
authorEmail: joshuamil@gmail.com
version: 2
cfVersion: CF5
shortDescription: Returns the number of occurances of a word in a string.
description: |
 Returns the number of occurances of a word in a string.

returnValue: Returns the number of times the word appears.

example: |
 <CFSET STR = "The is the way the world ends, not with a bag but with a whimper. The whimper to end all of the other wimpers.">
 <CFOUTPUT>#WordInstance("the",str)#</CFOUTPUT>

args:
 - name: word
   desc: The word to count.
   req: true
 - name: string
   desc: The string to check.
   req: true


javaDoc: |
 /**
  * Returns the number of occurances of a word in a string.
  * Minor edit by Raymond Camden
  * 
  * @param word      The word to count. (Required)
  * @param string      The string to check. (Required)
  * @return Returns the number of times the word appears. 
  * @author Joshua Miller (josh@joshuasmiller.com) 
  * @version 2, September 20, 2004 
  */

code: |
 function WordInstance(word,string){
     var i=0;
     var start=1;
     var j = 1;
     var tmp = "";
     
     string = " " & string & " ";
     for(j=1;j lte Len(string);j=j+1){
         tmp=REFindNoCase("[^a-zA-Z]+#word#[^a-zA-Z]+",string,start);
         if(tmp gt 0){
             i=i+1;
             start=tmp+Len(word);
         }else{
             start=start+1;
         }
     }
     return i;
 }

---

