---
layout: udf
title:  CID
date:   2005-07-13T23:20:10.000Z
library: UtilityLib
argString: ""
author: John Bartlett
authorEmail: jbartlett@strangejourney.net
version: 1
cfVersion: CF6
shortDescription: Returns a globally unique Content ID value.
tagBased: false
description: |
 In order to send inline images with CFMX6.1u1 (or greater), you need to specify a Content ID for the attached image, which needs to be globally unique.

returnValue: Returns a string.

example: |
 <CFSET Img_mx_login=CID()>
 
 <cfmail to="someone@somewhere.com" from="someone@somewhere.com" subject="Mail Test">
 <cfmailpart type="text/html" charset="UTF-8">
 <html>
 <body>
 <table border="0" cellpadding="0" cellspacing="0" width="100%" height="100%">
   <tr>
     <td bgcolor="003350" align="center">
       <img src="cid:#Img_mx_login#"><br>
       <font face="Arial" size="6" color="white">
       <b>Rocks!</b>
       </font>
     </td>
   </tr>
 </table>
 </body>
 </html>
 </cfmailpart>
 <cfmailpart type="text/plain" charset="UTF-8">
 Your email client sucks.
 </cfmailpart>
 <cfmailparam file="#Request.RootDir#CFIDE/administrator/images/mx_login.gif"
 type="image/gif" contentid="#Img_mx_login#">
 </cfmail>

args:


javaDoc: |
 /**
  * Returns a globally unique Content ID value.
  * 
  * @return Returns a string. 
  * @author John Bartlett (jbartlett@strangejourney.net) 
  * @version 1, July 13, 2005 
  */

code: |
 function CID() {
   // Create a globally unique identifier
   return lCase(CreateUUID() & "@" & listFirst(cgi.server_name,"."));
 }

oldId: 1227
---

