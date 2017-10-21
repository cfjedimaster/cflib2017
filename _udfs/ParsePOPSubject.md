---
layout: udf
title:  ParsePOPSubject
date:   2002-09-27T10:40:12.000Z
library: StrLib
argString: "subject"
author: Axel Glorieux
authorEmail: axel@misterbuzz.com
version: 1
cfVersion: CF5
shortDescription: Parses subjects returned by CFPOP.
description: |
 This function parses the encoded subject fields returned by CFPOP.
 It returns a structure with 2 variables:
 - encoding : Contains the encoding name (eg: &quot;iso-8859-1&quot;)
 - subject : Contains the decoded subject

returnValue: Returns a structure.

example: |
 <cfset subject = "=?iso-8859-1?Q?Sooo_clich=E9!?=">
 <cfset decoded = parsepopsubject(subject)>
 <cfoutput>
 encoding=#decoded.encoding#<br>
 subject=#decoded.subject#
 </cfoutput>

args:
 - name: subject
   desc: Subject string to parse.
   req: true


javaDoc: |
 /**
  * Parses subjects returned by CFPOP.
  * 
  * @param subject      Subject string to parse. (Required)
  * @return Returns a structure. 
  * @author Axel Glorieux (axel@misterbuzz.com) 
  * @version 1, September 27, 2002 
  */

code: |
 function parsepopsubject(subj){
     var re = "=\?([^?]+)\?([BbQq])\?([^?]+)\?=";
     var re2 ="=([[:xdigit:]]{2})";
     var tmp = refind(re,subj,1,true);
     var obj = structnew();
     var type = "";
     var start = 1;
     var eos = false;
     var tmp2 = "";
     var newch = "";
     if (arraylen(tmp.pos) NEQ 4){
         obj.subject = subj;
         obj.encoding = "";
         return obj;
     }
     obj.encoding = mid(subj,tmp.pos[2],tmp.len[2]);
     obj.subject = mid(subj,tmp.pos[4],tmp.len[4]);
     type = mid(subj,tmp.pos[3],tmp.len[3]);
     switch (type){
         case "b":{
             obj.subject = tostring(tobinary(obj.subject));
             break;
         }
         case "q":{
             while (NOT eos){
                 obj.subject = replace(obj.subject,"_"," ","ALL");
                 tmp2 = refind(re2,obj.subject,start,true);
                 if (tmp2.pos[1]){
                     newch = chr(inputbasen(mid(obj.subject,tmp2.pos[2],tmp2.len[2]),16));
                     obj.subject = removechars(obj.subject,tmp2.pos[1],tmp2.len[1]);
                     obj.subject = insert(newch,obj.subject,tmp2.pos[1]-1);
                     start = tmp2.pos[2];
                 }
                 else {
                     eos = true;
                 }
             }
             break;
         }
     }
     return obj;
 }

---

