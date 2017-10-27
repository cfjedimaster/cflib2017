---
layout: udf
title:  Byline
date:   2002-10-10T12:14:28.000Z
library: StrLib
argString: "names[, editors][, extrasMode]"
author: Gyrus
authorEmail: gyrus@norlonto.net
version: 1
cfVersion: CF5
shortDescription: Generates a byline from a list of names.
tagBased: false
description: |
 Generate a byline from a comma-delimited list of one or more names, in the format 'by X[, Y &amp; Z]'. Also extensible to perform extra functions: currently included is the ability to generate links to iMDB for each name.

returnValue: Returns a string.

example: |
 <cfoutput>
 Naked Lunch, #Byline("William S. Burroughs")#<br />
 Boring Book, #Byline("F.P. Morden,B.J. Smith,A.B.Q. Forsythe", TRUE)#<br />
 Santa Sangre, directed #Byline("Alejandro Jodorowsky", FALSE, "imdb")#<br />
 </cfoutput>

args:
 - name: names
   desc: List of Names.
   req: true
 - name: editors
   desc: Boolean signifying that the list is a list of editors. Defaults to false.
   req: false
 - name: extrasMode
   desc: String signifying extrasMode to use. Currently "IMDB" is support. Defaults to "none".
   req: false


javaDoc: |
 /**
  * Generates a byline from a list of names.
  * 
  * @param names      List of Names. (Required)
  * @param editors      Boolean signifying that the list is a list of editors. Defaults to false. (Optional)
  * @param extrasMode      String signifying extrasMode to use. Currently "IMDB" is support. Defaults to "none". (Optional)
  * @return Returns a string. 
  * @author Gyrus (gyrus@norlonto.net) 
  * @version 1, October 10, 2002 
  */

code: |
 function Byline(names) {
     // Initialise
     var i = 0;
     var name = "";
     var bylineString = "";
     var edited = FALSE;
     var extrasMode = "none";
     if (ArrayLen(Arguments) GT 1) {
         edited = Arguments[2];
     }
     if (ArrayLen(Arguments) GT 2) {
         extrasMode = Arguments[3];
     }
     // Loop through names
     if (ListLen(names)) {
         for (i=1; i LTE ListLen(names); i=i+1) {
             name = ListGetAt(names, i);
             // Edited?
             if (edited) {
                 name = "#name# (ed.)";
             }
             // Perform extras
             switch (extrasMode) {
                 case "imdb": {
                     name = "<a href=""http://uk.imdb.com/Name?#Replace(name,' ','+','ALL')#"" title=""check for information on this person on the Internet Movie Database"">#name#</a>";
                     break;
                 }
             }
             if (i EQ 1) {
                 bylineString = "by #name#";
             } else if (i EQ ListLen(names)) {
                 bylineString = "#bylineString# &amp; #name#";
             } else {
                 bylineString = "#bylineString#, #name#";
             }
         }
     }
     return bylineString;
 }

oldId: 780
---

