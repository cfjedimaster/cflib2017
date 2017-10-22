---
layout: udf
title:  HTMLSafe
date:   2006-08-30T15:05:56.000Z
library: StrLib
argString: "string"
author: Gyrus
authorEmail: gyrus@norlonto.net
version: 3
cfVersion: CF5
shortDescription: Coverts special characters to character entities, making a string safe for display in HTML.
tagBased: false
description: |
 This is a variation on Mike Gillespie's CovertEntity() function, to quickly parse a string for safe display in HTML. Includes decimal entity codes for non-standard characters, and dynamically adjusts to Unicode or non-Unicode matching, depending on CF version.

returnValue: Returns a string.

example: |
 <cfoutput>#HTMLSafe('Did you know that ""3>2 & 5<8?""')#</cfoutput>

args:
 - name: string
   desc: String to format.
   req: true


javaDoc: |
 /**
  * Coverts special characters to character entities, making a string safe for display in HTML.
  * Version 2 update by Eli Dickinson (eli.dickinson@gmail.com)
  * Fixes issue of lists not being equal and adding bull
  * v3, extra semicolons
  * 
  * @param string      String to format. (Required)
  * @return Returns a string. 
  * @author Gyrus (gyrus@norlonto.net) 
  * @version 3, August 30, 2006 
  */

code: |
 function HTMLSafe(string) {
     // Initialise
     var badChars = "&,"",#Chr(161)#,#Chr(162)#,#Chr(163)#,#Chr(164)#,#Chr(165)#,#Chr(166)#,#Chr(167)#,#Chr(168)#,#Chr(169)#,#Chr(170)#,#Chr(171)#,#Chr(172)#,#Chr(173)#,#Chr(174)#,#Chr(175)#,#Chr(176)#,#Chr(177)#,#Chr(178)#,#Chr(179)#,#Chr(180)#,#Chr(181)#,#Chr(182)#,#Chr(183)#,#Chr(184)#,#Chr(185)#,#Chr(186)#,#Chr(187)#,#Chr(188)#,#Chr(189)#,#Chr(190)#,#Chr(191)#,#Chr(215)#,#Chr(247)#,#Chr(192)#,#Chr(193)#,#Chr(194)#,#Chr(195)#,#Chr(196)#,#Chr(197)#,#Chr(198)#,#Chr(199)#,#Chr(200)#,#Chr(201)#,#Chr(202)#,#Chr(203)#,#Chr(204)#,#Chr(205)#,#Chr(206)#,#Chr(207)#,#Chr(208)#,#Chr(209)#,#Chr(210)#,#Chr(211)#,#Chr(212)#,#Chr(213)#,#Chr(214)#,#Chr(216)#,#Chr(217)#,#Chr(218)#,#Chr(219)#,#Chr(220)#,#Chr(221)#,#Chr(222)#,#Chr(223)#,#Chr(224)#,#Chr(225)#,#Chr(226)#,#Chr(227)#,#Chr(228)#,#Chr(229)#,#Chr(230)#,#Chr(231)#,#Chr(232)#,#Chr(233)#,#Chr(234)#,#Chr(235)#,#Chr(236)#,#Chr(237)#,#Chr(238)#,#Chr(239)#,#Chr(240)#,#Chr(241)#,#Chr(242)#,#Chr(243)#,#Chr(244)#,#Chr(245)#,#Chr(246)#,#Chr(248)#,#Chr(249)#,#Chr(250)#,#Chr(251)#,#Chr(252)#,#Chr(253)#,#Chr(254)#,#Chr(255)#";
     var goodChars = "&amp;,&quot;,&iexcl;,&cent;,&pound;,&curren;,&yen;,&brvbar;,&sect;,&uml;,&copy;,&ordf;,&laquo;,&not;,&shy;,&reg;,&macr;,&deg;,&plusmn;,&sup2;,&sup3;,&acute;,&micro;,&para;,&middot;,&cedil;,&sup1;,&ordm;,&raquo;,&frac14;,&frac12;,&frac34;,&iquest;,&times;,&divide;,&Agrave;,&Aacute;,&Acirc;,&Atilde;,&Auml;,&Aring;,&AElig;,&Ccedil;,&Egrave;,&Eacute;,&Ecirc;,&Euml;,&Igrave;,&Iacute;,&Icirc;,&Iuml;,&ETH;,&Ntilde;,&Ograve;,&Oacute;,&Ocirc;,&Otilde;,&Ouml;,&Oslash;,&Ugrave;,&Uacute;,&Ucirc;,&Uuml;,&Yacute;,&THORN;,&szlig;,&agrave;,&aacute;,&acirc;,&atilde;,&auml;,&aring;,&aelig;,&ccedil;,&egrave;,&eacute;,&ecirc;,&euml;,&igrave;,&iacute;,&icirc;,&iuml;,&eth;,&ntilde;,&ograve;,&oacute;,&ocirc;,&otilde;,&ouml;,&oslash;,&ugrave;,&uacute;,&ucirc;,&uuml;,&yacute;,&thorn;,&yuml;,&##338;,&##339;,&##352;,&##353;,&##376;,&##710;,&##8211;,&##8212;,&##8216;,&##8217;,&##8218;,&##8220;,&##8221;,&##8222;,&##8224;,&##8225;,&##8240;,&##8249;,&##8250;,&##8364;,<sup><small>TM</small></sup>,&bull;";
 
     if (Val(Left(Server.ColdFusion.ProductVersion, 1)) LT 6) {
         // Pre-MX/Unicode matches
         badChars = "#badChars#,#Chr(140)#,#Chr(156)#,#Chr(138)#,#Chr(154)#,#Chr(159)#,#Chr(136)#,#Chr(150)#,#Chr(151)#,#Chr(145)#,#Chr(146)#,#Chr(130)#,#Chr(147)#,#Chr(148)#,#Chr(132)#,#Chr(134)#,#Chr(135)#,#Chr(137)#,#Chr(139)#,#Chr(155)#,#Chr(128)#,#Chr(153)#,#Chr(149)#";
     } else {
         // MX/Unicode matches
         badChars = "#badChars#,#Chr(338)#,#Chr(339)#,#Chr(352)#,#Chr(353)#,#Chr(376)#,#Chr(710)#,#Chr(8211)#,#Chr(8212)#,#Chr(8216)#,#Chr(8217)#,#Chr(8218)#,#Chr(8220)#,#Chr(8221)#,#Chr(8222)#,#Chr(8224)#,#Chr(8225)#,#Chr(8240)#,#Chr(8249)#,#Chr(8250)#,#Chr(8364)#,#Chr(8482)#,#Chr(8226)#";
     }
 
     // Return immediately if blank string
     if (NOT Len(Trim(string))) return string;
     
     // Do replacing
     return ReplaceList(string, badChars, goodChars);
 
 }

---

