---
layout: udf
title:  IsCustomTag
date:   2002-01-29T22:19:43.000Z
library: UtilityLib
argString: ""
author: Jordan Clark
authorEmail: JordanClark@Telus.net
version: 1
cfVersion: CF5
shortDescription: Returns true/false if the current template is being called as a custom tag.
description: |
 Simply returns a boolean value if the tag calling this function was itself called as a custom tag or not. Very important for creating dual-pupose templates which can be cfinclude'd or cfmodule'd.

returnValue: Returns a Boolean value.

example: |
 <cfoutput>
 Is this template being called as a custom tag: #IsCustomTag()#
 </cfoutput>

args:


javaDoc: |
 /**
  * Returns true/false if the current template is being called as a custom tag.
  * 
  * @return Returns a Boolean value. 
  * @author Jordan Clark (JordanClark@Telus.net) 
  * @version 1, January 29, 2002 
  */

code: |
 function IsCustomTag() {
   return yesNoFormat( listFindNoCase( getBaseTagList(), "CF_" & listFirst( listLast( getCurrentTemplatePath(), "/\" ), "." ) ) );
 }

---

