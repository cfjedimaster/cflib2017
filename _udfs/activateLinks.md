---
layout: udf
title:  activateLinks
date:   2011-02-23T05:13:48.000Z
library: StrLib
argString: "string"
author: Robin Scherberich
authorEmail: scherberich.r@gmail.com
version: 1
cfVersion: CF6
shortDescription: Converts text links into HTML links within a string
description: |
 Converts text links into HTML links within a string.
  /!\ HTML links who already exists ARE'NT reconverted

returnValue: Returns a string.

example: |
 <cfoutput>
     <p>
         #activateLinks("my string with www.text-link.fr !")#
     </p>
 </cfoutput>

args:
 - name: string
   desc: Input string.
   req: true


javaDoc: |
 /**
  * Converts text links into HTML links within a string
  * 
  * @param string      Input string. (Required)
  * @return Returns a string. 
  * @author Robin Scherberich (scherberich.r@gmail.com) 
  * @version 1, February 22, 2011 
  */

code: |
 function activateLinks( string )
 {
     var stringLen = len( string );
     var currentPosition = 1;
     var urlArray = [];
 
     while( currentPosition < stringLen )
     {
         rezArray = REFindNoCase( "(?i)\b((?:https?://|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'"".,<>?«»‘’]))", arguments.string, currentPosition, true );
         
         if( rezArray.len[1] != 0 ){
             arrayAppend( urlArray, mid( string, rezArray.pos[1]-2, rezArray.len[1]+2 ) );
             currentPosition = rezArray.pos[1] + rezArray.len[1];
         } else {
             currentPosition = stringLen;
         }
     }
 
     for( i = 1; i <= arrayLen( urlArray ); i++ )
     {
         if( left( urlArray[i], 2 ) != '="' )
         {
             link = right( urlArray[i], len( urlArray[i] )-2 );
             string = replace( string, link, '<a href="'& link &'">'& link &'</a>', "all" );
         } else {
             i++;
         }
     }
 
     return string;
 }

---

