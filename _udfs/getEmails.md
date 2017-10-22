---
layout: udf
title:  getEmails
date:   2011-06-13T23:21:36.000Z
library: StrLib
argString: "str"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 3
cfVersion: CF5
shortDescription: Searches a string for email addresses.
tagBased: false
description: |
 This UDF will search a string for email addresses and return the matches as a list.

returnValue: Returns a list.

example: |
 <cfset emailList = "Gerardo Trevi?o Rojas gtrevino@metro.com.mx,Guillermo Dewey <gdewey@metro.com.mx>,Ma Luisa <luisa@metro.com.mx>;sales'<info@kompressorserver.com>'">
 <cfoutput>#getEmails(emailList)#</cfoutput>

args:
 - name: str
   desc: String to search.
   req: true


javaDoc: |
 /**
  * Searches a string for email addresses.
  * Based on the idea by Gerardo Rojas and the isEmail UDF by Jeff Guillaume.
  * New TLDs  
  * v3 fix by Jorge Asch
  * 
  * @param str      String to search. (Required)
  * @return Returns a list. 
  * @author Raymond Camden (ray@camdenfamily.com) 
  * @version 3, June 13, 2011 
  */

code: |
 function getEmails(str) {
     var email = "(['_a-z0-9-]+(\.['_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.((aero|coop|info|museum|name|jobs|travel)|([a-z]{2,3})))";
     var res = "";
     var marker = 1;
     var matches = "";
     
     matches = reFindNoCase(email,str,marker,marker);
 
     while(matches.len[1] gt 0) {
         res = listAppend(res,mid(str,matches.pos[1],matches.len[1]));
         marker = matches.pos[1] + matches.len[1];
         matches = reFindNoCase(email,str,marker,marker);        
     }
     return res;
 }

---

