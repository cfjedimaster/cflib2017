---
layout: udf
title:  xmlFormat2
date:   2004-01-12T15:50:27.000Z
library: StrLib
argString: "inString"
author: Samuel Neff
authorEmail: sam@serndesign.com
version: 1
cfVersion: CF5
shortDescription: Similar to xmlFormat() but replaces all characters not on the &quot;good&quot; list as opposed to characters specifically on the &quot;bad&quot; list.
tagBased: false
description: |
 xmlFormat2() can be used in place of xmlFormat() and will provide for a safer replacement including characters not caught by xmlFormat.

returnValue: Returns a string.

example: |
 <cfset s = "text with high-ascii (#chr(982)#) char.">
 <cfoutput>
 <pre>
 #xmlFormat(s)#
 #xmlFormat2(s)#
 </pre>
 </cfoutput>
 
 (view generated source)

args:
 - name: inString
   desc: String to format.
   req: true


javaDoc: |
 /**
  * Similar to xmlFormat() but replaces all characters not on the &quot;good&quot; list as opposed to characters specifically on the &quot;bad&quot; list.
  * 
  * @param inString      String to format. (Required)
  * @return Returns a string. 
  * @author Samuel Neff (sam@serndesign.com) 
  * @version 1, January 12, 2004 
  */

code: |
 function xmlFormat2(inString) {
    
    var goodChars = "!@##$%^*()0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`~[]{};:,./?\| -_=+#chr(13)##chr(10)##chr(9)#";
    var i = 1;
    var c = "";     
    var s = "";
    
    for (i=1; i LTE len(inString); i=i+1) {
       
       c = mid(inString, i, 1);
       
       if (find(c, goodChars)) {
          s = s & c;
       } else {
          s = s & "&##" & asc(c) & ";";
       }
    }
    
    return s;
 }

oldId: 999
---

