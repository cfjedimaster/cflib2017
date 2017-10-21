---
layout: udf
title:  listFindMissing
date:   2005-07-21T02:55:32.000Z
library: StrLib
argString: "list[, delim]"
author: Giampaolo Bellavite
authorEmail: giampaolo@bellavite.com
version: 1
cfVersion: CF5
shortDescription: Find missing integers in a list of consequential numbers.
description: |
 Return a list with missing integers in a list of consequential numbers, starting from the minimum integer in the list and ending to the maximum one.

returnValue: Returns a string.

example: |
 <cfoutput>
 #listFindMissing('1,2,3,6,7,8,10')#
 </cfoutput>

args:
 - name: list
   desc: List to check.
   req: true
 - name: delim
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Find missing integers in a list of consequential numbers.
  * 
  * @param list      List to check. (Required)
  * @param delim      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Giampaolo Bellavite (giampaolo@bellavite.com) 
  * @version 1, July 20, 2005 
  */

code: |
 function listFindMissing(list) {
   var delim=","; // list delimiter
   var arrToSearch=""; 
   var i=0;
   var j=0;    
   var returnList="";
   if(arrayLen(arguments) GTE 2) delim = arguments[2];
   arrToSearch=listToArray(list,delim);
   for(i=ArrayMin(arrToSearch);i LTE arrayMax(arrToSearch);i=i+1)
     for(j=1;j LTE arrayLen(arrToSearch);j=j+1) 
       if(arrToSearch[j] EQ i)  break;
       else 
         if (j EQ arrayLen(arrToSearch))
           returnList = listAppend(returnList,i,delim);
   return returnList;
 }

---

