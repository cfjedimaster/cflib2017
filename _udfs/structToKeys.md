---
layout: udf
title:  structToKeys
date:   2012-09-20T17:34:12.000Z
library: UtilityLib
argString: "struct[, parent]"
author: Adam Cameron
authorEmail: adamcameroncoldfusion@gmail.com
version: 1
cfVersion: CF9
shortDescription: Extracts the keys from a struct
description: |
 Traverses as struct and returns an array of all its keys with their full dotted path

returnValue: Returns an array of keys with their fully-qualified dotted paths

example: |
 // data to test with
 st = {
     top1 = "top1 value",
     top2 = {
         middle = {
             bottom1 = [1,2,3],
             bottom2 = {},
             bottom3 = "bottom3 value"
         }
     },
     top3 = "top3 value"
 };
 
 writeDump(var=st, label="source struct");
 
 // get the keys
 keys = structToKeys(st, "st");
 
 arraySort(keys, "textnoCase");    // sort 'em to make 'em look nice
 writeDump(var=keys, label="extracted keys");

args:
 - name: struct
   desc: A structure to extract the keys from
   req: true
 - name: parent
   desc: A prefix to apply to each key
   req: false


javaDoc: |
 /**
  * Extracts the keys from a struct
  * v1.0 by Adam Cameron (thanks to Simon Baynes for code review)
  * 
  * @param struct      A structure to extract the keys from (Required)
  * @param parent      A prefix to apply to each key (Optional)
  * @return Returns an array of keys with their fully-qualified dotted paths 
  * @author Adam Cameron (adamcameroncoldfusion@gmail.com) 
  * @version 1.0, September 20, 2012 
  */

code: |
 array function structToKeys(required struct struct, string parent=""){
     var result = [];
     for (var key in struct){
         var thisPath = listAppend(parent, key, ".");
         arrayAppend(result, thisPath);
         if (isStruct(struct[key])){
             result.addAll(structToKeys(struct[key], thisPath));
         }
     }
     return result;
 }

---

