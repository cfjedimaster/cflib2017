---
layout: udf
title:  detectLanguage
date:   2007-05-29T12:46:11.000Z
library: StrLib
argString: "text"
author: Guido Bellomo
authorEmail: guidobellomo@gmail.com
version: 1
cfVersion: CF6
shortDescription: This function try to guess the language of a given text.
tagBased: false
description: |
 This function try to guess the language of a given text. Supports Italian,English,German.
 Accept a string as parameters and returns a two-letter code of the language (it,en,de).

returnValue: Returns a string.

example: |
 <cfsavecontent variable="test">
 This is a piece of text
 </cfsavecontent>
 <cfoutput>
 The following text is in: #detectLanguage(test)#
 </cfoutput>

args:
 - name: text
   desc: Text to check.
   req: true


javaDoc: |
 /**
  * This function try to guess the language of a given text.
  * 
  * @param text      Text to check. (Required)
  * @return Returns a string. 
  * @author Guido Bellomo (guidobellomo@gmail.com) 
  * @version 1, May 29, 2007 
  */

code: |
 function detectLanguage(text) {
     var strLanguage = StructNew();
     var strPoints = StructNew();    
     var keys = "";
     var languages = "";
     var i = 0;
     var result = "";
     var maxPoints = 0;
     var currentPoint = 0;
     
     // Init structure
     strLanguage["it"] = "il,lo,la,gli,le,delle,dalle,dallo,ciao,che,questo,quello,quella,del,dal,in";
     strLanguage["en"] = "the,where,to,one,that,those,in,out,is";
     strLanguage["de"] = "der,die,das,es,dass,diese,wir,ihr,sie,aus,ein,jenes,diese,dieses,jene,und,nein,ja,auch,nicht,wieso,warum,weshlab,wie,was,warum,wer,durch,um,wegen,mit,ohne";
     strPoints["it"] = 0;
     strPoints["en"] = 0;
     strPoints["de"] = 0;        
     keys = StructKeyList(strLanguage);
     languages = StructKeyList(strLanguage);
     // Clean HTML
     text = ReReplace(text,"<.*?>","","ALL");
     // Start race
     for (i = 1; i lte ListLen(languages); i = i + 1) {
         // Get test words
         lang = ListGetAt(languages,i);
         testWords = StructFind(strLanguage,lang);
         for (k = 1; k lte ListLen(testWords); k = k + 1) {
             if (ReFindNoCase("\b#ListGetAt(testWords,k)#\b",text)) {
                 strPoints[lang] = strPoints[lang]+1; 
             }                    
         }
     }        
     // Check the winning langage
     for (i = 1; i lte ListLen(languages); i = i + 1) {
         currentPoint = StructFind(strPoints,ListGetAt(languages,i));
         if (currentPoint gt maxPoints) {
             result = ListGetAt(languages,i);
             maxPoints = currentPoint;
         }
     }
     return result;
 }

---

