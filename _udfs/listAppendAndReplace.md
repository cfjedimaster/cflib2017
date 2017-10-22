---
layout: udf
title:  listAppendAndReplace
date:   2007-08-10T12:42:52.000Z
library: StrLib
argString: "list1, list2, length[, delimiters]"
author: Kit Brandner
authorEmail: kit.brandner@serebra.com
version: 1
cfVersion: CF5
shortDescription: Appends one list to another, with a maximum list length specified, and replaces any overlapping values.
tagBased: false
description: |
 Appends one list to another, with a maximum list length specified, and replaces any overlapping values.

returnValue: Returns a string.

example: |
 #ListAppendAndReplace("192.168.0", "15.20", 4, ".")# would return 192.168.15.20

args:
 - name: list1
   desc: The original list.
   req: true
 - name: list2
   desc: The list to append.
   req: true
 - name: length
   desc: The max list length allowed for the new list.
   req: true
 - name: delimiters
   desc: List delimiters. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Appends one list to another, with a maximum list length specified, and replaces any overlapping values.
  * 
  * @param list1      The original list. (Required)
  * @param list2      The list to append. (Required)
  * @param length      The max list length allowed for the new list. (Required)
  * @param delimiters      List delimiters. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Kit Brandner (kit.brandner@serebra.com) 
  * @version 1, August 10, 2007 
  */

code: |
 function listAppendAndReplace( list1, list2, length) {
     var delimiters = ",";
     var pos = length;
     var returnList = list1;
     if (arguments.length ge 4 and len(trim(arguments[4])) gt 0) delimiters = trim(arguments[4]);
     for ( ; pos ge (length - listLen(list2, delimiters)) ; pos = pos - 1) {
         if (listLen(list1, delimiters) gt pos)    returnList = listDeleteAt(returnList, pos + 1, delimiters);
     }
     if (left(list2, 1) eq delimiters) list2 = right(list2, len(list2) - 1);
     returnList = trim(returnList) & iif(right(returnList, 1) neq delimiters and (len(trim(list2)) gt 0 and len(trim(returnList)) gt 0), de(delimiters), de("")) & trim(list2);
     return returnList;
 }

---

