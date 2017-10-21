---
layout: udf
title:  IsIncluded
date:   2002-02-25T00:30:46.000Z
library: UtilityLib
argString: ""
author: Scott Wintheiser
authorEmail: scott@lightburndesigns.com
version: 1
cfVersion: CF5
shortDescription: Checks to see if calling template is base template.
description: |
 Checks to see if calling template is base template.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 Is this code in an included template? #IsIncluded()#<br>
 </cfoutput>

args:


javaDoc: |
 /**
  * Checks to see if calling template is base template.
  * 
  * @return Returns a boolean. 
  * @author Scott Wintheiser (scott@lightburndesigns.com) 
  * @version 1, February 24, 2002 
  */

code: |
 function isIncluded(){
     IF (getCurrentTemplatePath() NEQ getBaseTemplatePath()) return true;
     else return false;
 }

---

