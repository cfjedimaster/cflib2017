---
layout: udf
title:  structValueList
date:   2006-11-07T00:43:38.000Z
library: DataManipulationLib
argString: "struct[, delimiter]"
author: Kit Brandner
authorEmail: kit.brandner@serebra.com
version: 1
cfVersion: CF5
shortDescription: Converts a structure into a key/value pair list.
tagBased: false
description: |
 Converts a structure into a key/value pair list. Ignores complex values (nested structures, arrays, etc.).

returnValue: Returns a string.

example: |
 <cfoutput>#structValueList(CGI)#</cfoutput>

args:
 - name: struct
   desc: Structure to list.
   req: true
 - name: delimiter
   desc: Delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Converts a structure into a key/value pair list.
  * 
  * @param struct      Structure to list. (Required)
  * @param delimiter      Delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Kit Brandner (kit.brandner@serebra.com) 
  * @version 1, November 6, 2006 
  */

code: |
 function structValueList(struct) {
     var delimiter = ",";
     var element = 0;
     var kvName = "";
     var kvValue = "";
     var returnList = "";
         
     if(arrayLen(arguments) gt 1) delimiter = arguments[2];
         
     if (isStruct(struct)) {
         for (; element lt listLen(structKeyList(struct, delimiter)) ; element=element+1) {
             kvName = listGetAt(structKeyList(struct, delimiter), element+1, delimiter);
             kvValue = "";
             if(isSimpleValue(struct[kvName])) kvValue = struct[kvName];
             returnList = listAppend(returnList, kvName & iif(len(trim(kvValue)) gt 0, de("=" & kvValue), de("")));
         }
     }
     
     return returnList;
 }

---

