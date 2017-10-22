---
layout: udf
title:  EmailAntiSpam
date:   2002-05-02T10:57:49.000Z
library: StrLib
argString: "EmailAddress[, Mailto]"
author: Seth Duffey
authorEmail: sduffey@ci.davis.ca.us
version: 2
cfVersion: CF5
shortDescription: When given an email address this function will return the address in a format safe from email harvesters.
tagBased: false
description: |
 When given an email address this function will return the address in a format safe from email harvesters.

returnValue: Returns a string

example: |
 <CFOUTPUT>
 #EmailAntiSpam("sduffey@ci.davis.ca.us")#<BR>
 #EmailAntiSpam("sduffey@ci.davis.ca.us", "Yes")#<BR>
 </CFOUTPUT>

args:
 - name: EmailAddress
   desc: Email address you want to make safe.
   req: true
 - name: Mailto
   desc: Boolean (Yes/No). Indicates whether to return formatted email address as a mailto link.  Default is No.
   req: false


javaDoc: |
 /**
  * When given an email address this function will return the address in a format safe from email harvesters.
  * Minor edit by Rob Brooks-Bilson (rbils@amkor.com)
  * Update now converts all characters in the email address to unicode, not just the @ symbol. (by author)
  * 
  * @param EmailAddress      Email address you want to make safe. (Required)
  * @param Mailto      Boolean (Yes/No). Indicates whether to return formatted email address as a mailto link.  Default is No. (Optional)
  * @return Returns a string 
  * @author Seth Duffey (sduffey@ci.davis.ca.us) 
  * @version 2, May 2, 2002 
  */

code: |
 function EmailAntiSpam(EmailAddress) {
     var i = 1;
     var antiSpam = "";
     for (i=1; i LTE len(EmailAddress); i=i+1) {
         antiSpam = antiSpam & "&##" & asc(mid(EmailAddress,i,1)) & ";";
     }
     if ((ArrayLen(Arguments) eq 2) AND (Arguments[2] is "Yes")) return "<a href=" & "mailto:" & antiSpam & ">" & antiSpam & "</a>"; 
     else return antiSpam;
 }

---

