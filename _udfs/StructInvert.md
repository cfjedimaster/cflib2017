---
layout: udf
title:  StructInvert
date:   2001-11-13T13:57:19.000Z
library: DataManipulationLib
argString: "st"
author: Craig Fisher
authorEmail: craig@altainteractive.com
version: 1
cfVersion: CF5
shortDescription: Takes a struct of simple values and returns the structure with the values and keys inverted.
tagBased: false
description: |
 Takes a struct of simple values and returns the  structure with the values and keys inverted.  The Values of the structure passed in will be the keys of the reutrned structure.  The Values of the Keys of the returned structure will be the corresponding keys of the passed in structure.

returnValue: Returns a structure.

example: |
 <cfscript>
     stOne=StructNew();
     stOne.firstvalue="cheese";
     stOne.secondvalue="soup";
     stOne.thirdvalue="donuts";
     stOneInverted=StructInvert(stOne);
 </cfscript>
 stOne:
 <cfdump var="#stOne#">
 stOneInverted:
 <cfdump var="#stOneInverted#">

args:
 - name: st
   desc: Structure of simple name/value pairs you want inverted.
   req: true


javaDoc: |
 /**
  * Takes a struct of simple values and returns the structure with the values and keys inverted.
  * 
  * @param st      Structure of simple name/value pairs you want inverted. 
  * @return Returns a structure. 
  * @author Craig Fisher (craig@altainteractive.com) 
  * @version 1, November 13, 2001 
  */

code: |
 function StructInvert(st) {
         var stn=StructNew();
         var lKeys="";
         var nkey="";
         var i=1;
         var eflg=0;
         if (NOT IsStruct(st)) {
             eflg=1;
         }
         else {
             lKeys=StructKeyList(st);
             for (i=1; i LTE ListLen(lKeys); i=i+1) {
                 nKey=listgetat(lkeys, i);
                 if (IsSimpleValue(st[nKey]))
                     stn[st[nKey]]=nKey;
                 else {
                     eflg=1;
                     break;
                 }
             }
         }
         if (eflg is 1) {
             writeoutput("Error in <Code>InvertStruct()</code>! Correct usage: InvertStruct(<I>Structure</I>) -- Returns a structure with the values and keys of <I>Structure</I> inverted when <i>Structure</i> is a structure of simple values.");
             return 0;
         }
         else {
             return stn;
         }
     }

---

