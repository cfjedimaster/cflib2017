---
layout: udf
title:  CapFirst
date:   2016-04-25T22:40:49.000Z
library: StrLib
argString: "string"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 3
cfVersion: CF10
shortDescription: Capitalizes the first letter in each word.
tagBased: true
description: |
 Returns the string with the first character of each word capitalized.

returnValue: Returns a string.

example: |
 <CFSET str="the dog jumped over the fox.">
 <CFOUTPUT>
 Given str=#str#<BR>
 The CapFirst version is #CapFirst(str)#
 </CFOUTPUT>

args:
 - name: string
   desc: String to be modified.
   req: true


javaDoc: |
 <!---
  Capitalizes the first letter in each word.
  Made udf use strlen, rkc 3/12/02
  v2 by Sean Corfield.
  v3 by Chris Jordan
  
  @param string      String to be modified. (Required)
  @return Returns a string. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 3, March 9, 2007 
 --->

code: |
 public string function capFirst(str){
     var local = {};
 
     local.newstr = '';
     local.word = '';
     local.separator = '';
     local.str = lcase(arguments.str);
 
     for(local.i = 1; local.i <= listlen(local.str,' '); local.i++){
         local.word = listgetat(local.str,local.i,' ');
         if(refind("^mc+",local.word) || refind("^o'+",local.word)){
             local.newstr &= local.separator & ucase(left(local.word,1)) & mid(local.word,2,1) & ucase(mid(local.word,3,1));
             if(len(local.word) > 3){
                 local.newstr &= right(local.word,len(local.word)-3);
             }
         }
         else{
             //just a regular word...
             local.newstr &= local.separator & ucase(left(local.word,1));
             if(len(local.word) > 1){
                 local.newstr &= right(local.word,len(local.word)-1);
             }
         }
 
         local.separator = ' ';
     }
 
     return local.newstr;
 }

oldId: 9
---

