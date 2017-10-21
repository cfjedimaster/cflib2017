---
layout: udf
title:  ReMatchNoCase
date:   2009-05-09T23:15:20.000Z
library: StrLib
argString: "RegEx, txt"
author: John Bartlett
authorEmail: jbartlett@strangejourney.net
version: 0
cfVersion: CF6
shortDescription: Provides the CF8 ReMatchNoCase functionality in MX6/MX7
description: |
 Provides the ReMatchNoCase function for MX6 and MX7.  Not for use on MX8 (built in function).

returnValue: Returns an array

example: |
 ReMatchNoCase("(ABC|DEF|GHI|JKL)","AbCdEfGhIjKl")

args:
 - name: RegEx
   desc: Regular expression for which to search
   req: true
 - name: txt
   desc: search string
   req: true


javaDoc: |
 /**
  * Provides the CF8 ReMatchNoCase functionality in MX6/MX7
  * 
  * @param RegEx      Regular expression for which to search (Required)
  * @param txt      search string (Required)
  * @return Returns an array 
  * @author John Bartlett (jbartlett@strangejourney.net) 
  * @version 0, May 9, 2009 
  */

code: |
 function ReMatchNoCase(RegEx,Txt)
 {
     var MatchList=ArrayNew(1);
     var tmp="";
     var Done=0;
     var StartPos=1;
     Arguments.Txt=Arguments.Txt & " ";
 
     while (NOT Done) {
         tmp=ReFindNoCase(Arguments.RegEx,Arguments.Txt,StartPos,"true");
         if (tmp.Pos[1] EQ "0") {
             Done=1;
         } else {
             MatchList[ArrayLen(MatchList) + 1]=Mid(Arguments.Txt,tmp.Pos[1],tmp.Len[1]);
             StartPos=tmp.Pos[1] + Tmp.Len[1];
         }
     }
     return MatchList;
 }

---

