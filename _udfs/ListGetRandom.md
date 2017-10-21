---
layout: udf
title:  ListGetRandom
date:   2004-03-12T17:42:28.000Z
library: StrLib
argString: "List[, Delimiter]"
author: Brad Breaux
authorEmail: bbreaux@blipz.com
version: 2
cfVersion: CF5
shortDescription: Returns a random selection from a comma delimited list.
description: |
 Can be used to return a random string or numeric value from a list. Just pass the list and an optional delimiter and it will return the random element.

returnValue: Returns a random element from the list.

example: |
 <CFSET numlist="1,2,3,4,5,6,7,8,9,0">
 <CFSET stringlist="abc,def,ghi,jkl,mnop,qrs,tuv,wxy,z">
 <CFOUTPUT>
  Random number:#ListGetRandom(numlist)#<BR>
  Random String:#ListGetRandom(stringlist)#<BR>
  <I>Because we cache UDF templates at cflib.org, the results shown here will not be random.</I>
 </cfoutput>

args:
 - name: List
   desc: The list to grab a random element from.
   req: true
 - name: Delimiter
   desc: The list delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Returns a random selection from a comma delimited list.
  * Modified by Raymond Camden
  * 
  * @param List      The list to grab a random element from. (Required)
  * @param Delimiter      The list delimiter. Defaults to a comma. (Optional)
  * @return Returns a random element from the list. 
  * @author Brad Breaux (bbreaux@blipz.com) 
  * @version 2, March 12, 2004 
  */

code: |
 function ListGetRandom(instring) {
     var delim = ",";
     var rnum = 0;
     var r = '';
      if(ArrayLen(Arguments) GTE 2) delim = Arguments[2];
        if(listlen(instring) gt 0) {
         rnum = randrange(1,listlen(instring,delim));
             r = listgetat(instring,rnum,delim);
     }
     return r;
  }

---

