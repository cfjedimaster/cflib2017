---
layout: udf
title:  structFindKeyWithValue
date:   2013-09-09T08:25:04.000Z
library: UtilityLib
argString: "struct, key, value[, scope]"
author: Adam Cameron
authorEmail: dac.cfml@gmail.com
version: 1
cfVersion: CF9
shortDescription: Combines structFindKey() and structFindValue()
tagBased: false
description: |
 Often I need to find keys with specific values from with a given structure, so this combines both structFindKey() and structFindValue()

returnValue: Returns an array as per structFindValue()

example: |
 numbers = {
     one        = "tahi",
     two        = [
         {rua="two"},
         {rua="deux"}
     ],
     three    = [
         {toru="three"},
         {toru="trois"},
         {toru="drei"}
     ],
     wha = "four",
     duplicates = [
         {rua="two"},
         {toru="trois"}
     ]
 };
 
 result = structFindKeyWithValue(
     numbers,
     "rua",
     "two",
     "ALL"
 );

args:
 - name: struct
   desc: Struct to check
   req: true
 - name: key
   desc: Key to find
   req: true
 - name: value
   desc: Value to find for key
   req: true
 - name: scope
   desc: Whether to find ONE (default) or ALL matches
   req: false


javaDoc: |
 /**
  * Combines structFindKey() and structFindValue()
  * v1.0 by Adam Cameron
  * v1.01 by Adam Cameron (fixing logic error in scope-handling)
  * 
  * @param struct      Struct to check (Required)
  * @param key      Key to find (Required)
  * @param value      Value to find for key (Required)
  * @param scope      Whether to find ONE (default) or ALL matches (Optional)
  * @return Returns an array as per structFindValue() 
  * @author Adam Cameron (dac.cfml@gmail.com) 
  * @version 1.01, September 9, 2013 
  */

code: |
 public array function structFindKeyWithValue(required struct struct, required string key, required string value, string scope="ONE"){
     if (!isValid("regex", arguments.scope, "(?i)one|all")){
         throw(type="InvalidArgumentException", message="Search scope #arguments.scope# must be ""one"" or ""all"".");
     }
     var keyResult = structFindKey(struct, key, "all");
     var valueResult = [];
     for (var i=1; i <= arrayLen(keyResult); i++){
         if (keyResult[i].value == value){
             arrayAppend(valueResult, keyResult[i]);
             if (scope == "one"){
                 break;
             }
         }
     }
     return valueResult;
 }

---

