---
layout: udf
title:  GetBaseCustomTagList
date:   2003-02-20T13:24:55.000Z
library: UtilityLib
argString: ""
author: Jordan Clark
authorEmail: JordanClark@Telus.net
version: 1
cfVersion: CF5
shortDescription: Returns a list of ancestor custom tags.
description: |
 The custom list returned is based on the ancestor tag list provided by the getBaseTagList() function. This is useful to check in one custom tag if it is a decendant of another.

returnValue: Returns a list.

example: |
 <cfif listFindNoCase( getBaseCustomTagList(), "CF_MY_PARENT" )>
    I have a parent!
 <cfelse>
    I'm an orphan, wha!
 </cfif>

args:


javaDoc: |
 /**
  * Returns a list of ancestor custom tags.
  * 
  * @return Returns a list. 
  * @author Jordan Clark (JordanClark@Telus.net) 
  * @version 1, February 20, 2003 
  */

code: |
 function getBaseCustomTagList() {
    var x = 1;
    var customTags = "";
    var baseTags = listToArray( getBaseTagList() );
    
    for( x = 1; x LTE arrayLen( baseTags ); x = x + 1 )
    {
       if( left( baseTags[ x ], 3 ) IS "CF_" )
       {
          customTags = listAppend( customTags, baseTags[ x ] );
       }
    }
    
    return customTags;
 }

---

