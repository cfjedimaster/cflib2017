---
layout: udf
title:  URLCheckHash
date:   2002-01-07T12:59:07.000Z
library: SecurityLib
argString: ""
author: John Bartlett
authorEmail: jbartlett@strangejourney.com
version: 1
cfVersion: CF5
shortDescription: Used along with URLHash to verify the URL integrity.
tagBased: false
description: |
 After securing a URL by using the URLHash UDF, you can verify that the URL's integrity remains unchanged by verifying the security Hash vale with URLCheckHash.

returnValue: 

example: |
 Example code will always fail since it checks the CGI variable which will not be correct for this template.
 
 <cfif NOT URLCheckHash()>
   Here you would CFLOCATE, or throw some kind of error.
 </cfif>

args:


javaDoc: |
 /**
  * Used along with URLHash to verify the URL integrity.
  * 
  * @author John Bartlett (jbartlett@strangejourney.com) 
  * @version 1, January 7, 2002 
  */

code: |
 function URLCheckHash()
 {
   var tmp=CGI.Query_String;
   var listL=0;
   var loop=0;
   var URLVar="";
   var HashData="";
 
   if (IsDefined("URL.Hash"))
   {
     if (URL.Hash NEQ "")
     {
       listL=ListLen(tmp,"&");
       URLVar=ListGetAt(tmp,ListL,"&");
       if (Left(UCase(URLVar),5) EQ "HASH=")
       {
         tmp=ListDeleteAt(tmp,ListL,"&");
       }
       HashData=cgi.Server_Name & cgi.Remote_Addr & cgi.Script_Name & tmp;
       if (URL.Hash EQ Hash(HashData)) return 1;
       else return 0;
     } else return 0;
   } else return 0;
 }

---

