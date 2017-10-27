---
layout: udf
title:  URLDecrypt
date:   2002-10-08T12:15:23.000Z
library: SecurityLib
argString: "nKey[, QueryString]"
author: Timothy Heald
authorEmail: theald@schoollink.net
version: 3
cfVersion: CF5
shortDescription: Add security by encrypting and decrypting URL variables. See URLEncrypt.
tagBased: false
description: |
 This is actually two functions.  The first urlEncrypt(&quot;name=value&amp;name=value&amp;name=value&quot;,key) you use when you would have a link or an action that you would be setting url variables in.  The second urlDecrypt(key) you use on whatever page you are calling, or using as the form action page.

returnValue: Writes to the URL scope.

example: |
 Create an encrypted query string. Normally this
 would not be hard coded.
 
 <CFSET Name = "Ray">
 <CFSET Age = 28>
 <CFSET Key = "MySecretBlah348123190">
 <CFSET QS = "name=#Name#&age=#Age#">
 <CFSET QS = URLEncrypt(QS,key)>
 <CFOUTPUT>
 QueryString is #QS#<P>
 </CFOUTPUT>
 <CFSET URLDecrypt(Key,QS)>
 Dump of URL scope:
 <CFDUMP VAR="#URL#">

args:
 - name: nKey
   desc: The encryption key to use.
   req: true
 - name: QueryString
   desc: Defaults to CGI.Query_String
   req: false


javaDoc: |
 /**
  * Add security by encrypting and decrypting URL variables. See URLEncrypt.
  * Mod by David Heard - added decode
  * 
  * @param nKey      The encryption key to use. (Required)
  * @param QueryString      Defaults to CGI.Query_String (Optional)
  * @return Writes to the URL scope. 
  * @author Timothy Heald (theald@schoollink.net) 
  * @version 3, October 9, 2002 
  */

code: |
 function urlDecrypt(key){
     var queryString = cgi.path_info;
     var scope = "url";
     var stuff = "";
     var oldcheck = "";
     var newcheck = "";
     var i = 0;
     var thisPair = "";
     var thisName = "";
     var thisValue = "";
 
     // see if a scope is provided if it is set it otherwise set it to url
     if(arrayLen(arguments) gt 1){
         scope = arguments[2];
     }
 
     if ((right(queryString,3) neq "htm") or (findNoCase("&",queryString) neq 0) or (findNoCase("=",queryString) neq 0)){
         stuff = '<FONT color="red">not encrypted, or corrupted url</FONT>';
     } else {
     
         // remove /index.htm
         querystring = replace(queryString, right(queryString,10),'');
         
         // remove the leading slash
         querystring = replace(queryString, left(queryString,1),'');
         
         // grab the old checksum
            if (len(querystring) GT 2) {
                oldcheck = right(querystring, 2);
                querystring = rereplace(querystring, "(.*)..", "\1");
            } 
            
            // check the checksum
            newcheck = left(hash(querystring & key),2);
            if (newcheck NEQ oldcheck) {
                return querystring;
            }
            
            //decrypt the passed value
         queryString = cfusion_decrypt(queryString, key);
         
             // set the variables
             for(i = 0; i lt listLen(queryString, '&'); i = i + 1){
                 
                 // Break up the list into seprate name=value pairs
                 thisPair = listGetAt(queryString, i + 1, '&');
                 
                 // Get the name
                 thisName = listGetAt(thisPair, 1, '=');
                 
                 // Get the value
                 thisValue = listGetAt(thisPair, 2, '=');
                 
                 // Set the name with the scope
                 thisName = scope & '.' & thisName;
                 
                 // Set the variable
                 setVariable(thisName, thisValue);
             }
         
     }
     
     return stuff;
 }

oldId: 212
---

