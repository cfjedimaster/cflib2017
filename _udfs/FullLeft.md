---
layout: udf
title:  FullLeft
date:   2002-04-16T18:31:09.000Z
library: StrLib
argString: "str, count"
author: Marc Esher
authorEmail: jonnycattt@aol.com
version: 2
cfVersion: CF5
shortDescription: An enhanced version of left() that doesn't cut words off in the middle.
tagBased: false
description: |
 An enhanced version of left() that doesn't cut words off in the middle; instead, it searches backward until it finds a full word.

returnValue: Returns a string.

example: |
 <cfset text="You wouldn't see words chopped in half on the front page of the New York Times">
 
 <cfoutput>
 Full String: #text#<BR>
 FullLeft(text, 25): #fullLeft(text, 25)#<BR>
 FullLeft(text, 34): #fullLeft(text, 34)#<BR>
 </cfoutput>

args:
 - name: str
   desc: String to be checked.
   req: true
 - name: count
   desc: Number of characters from the left to return.
   req: true


javaDoc: |
 /**
  * An enhanced version of left() that doesn't cut words off in the middle.
  * Minor edits by Rob Brooks-Bilson (rbils@amkor.com) and Raymond Camden (ray@camdenfamily.com)
  * 
  * Updates for version 2 include fixes where count was very short, and when count+1 was a space. Done by RCamden.
  * 
  * @param str      String to be checked. 
  * @param count      Number of characters from the left to return. 
  * @return Returns a string. 
  * @author Marc Esher (jonnycattt@aol.com) 
  * @version 2, April 16, 2002 
  */

code: |
 function fullLeft(str, count) {
     if (not refind("[[:space:]]", str) or (count gte len(str)))
         return Left(str, count);
     else if(reFind("[[:space:]]",mid(str,count+1,1))) {
           return left(str,count);
     } else { 
         if(count-refind("[[:space:]]", reverse(mid(str,1,count)))) return Left(str, (count-refind("[[:space:]]", reverse(mid(str,1,count))))); 
         else return(left(str,1));
     }
 }

---

