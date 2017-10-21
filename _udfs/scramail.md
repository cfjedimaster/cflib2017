---
layout: udf
title:  scramail
date:   2013-08-06T13:07:23.000Z
library: StrLib
argString: "str"
author: Deva Nando
authorEmail: d.nando@gmail.com
version: 1
cfVersion: CF5
shortDescription: Scramail takes a string as an argument and changes the characters in the email to their ascii equivelents to hide the email address from spam bots.
description: |
 Scramail takes a string as an argument, finds any emails within the string, changes the characters in the email to their ascii equivelents, and then returns the transformed string. The purpose is to hide any email addresses in a block of text from spam bots. Scramail is a synthesis of Raymond Camden's getEmails and Seth Duffey's EmailAntiSpam UDFs.

returnValue: Returns a string.

example: |
 <cfset strText = "Hi there, you can email me at myemail@somedomain.com">
 <cfset strText =  scramail(strText)>
 <cfoutput>#strText#</cfoutput>

args:
 - name: str
   desc: String to parse.
   req: true


javaDoc: |
 /**
  * Scramail takes a string as an argument and changes the characters in the email to their ascii equivelents to hide the email address from spam bots.
  * v1.0 by Deva Nando
  * v1.1 by Steve Sobol (fixed bug when processing multiple email addresses)
  * 
  * @param str      String to parse. (Required)
  * @return Returns a string. 
  * @author Deva Nando (d.nando@gmail.com) 
  * @version 1.1, August 6, 2013 
  */

code: |
 function scramailNew(str) {
     var emailregex = "(['_a-z0-9-]+(\.['_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*\.(([a-z]{2,3})|(aero|coop|info|museum|name)))";
     var i = 1;
     var email = "";
     var ascMail = "";
     var marker = 1;
     var matches = "";
 
     matches = reFindNoCase(emailregex, str, marker, true);
     while (matches.len[1] gt 0) {
         email = mid(str, matches.pos[1], matches.len[1]);
         for (i=1; i LTE len(email); i=i+1) {
             ascMail = ascMail & "&##" & asc(mid(email,i,1)) & ";";
         }
         str = replace(str,email,ascmail,"all");
         marker = matches.pos[1] + matches.len[1];
         matches = reFindNoCase(emailregex, str, marker, true);
         ascmail = "";
     }
     return str;
 }

---

