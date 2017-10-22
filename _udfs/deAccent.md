---
layout: udf
title:  deAccent
date:   2012-12-20T09:04:04.000Z
library: StrLib
argString: "str"
author: Rachel Lehman
authorEmail: raelehman@gmail.com
version: 1
cfVersion: CF6
shortDescription: Replaces accented characters with their non accented closest equivalents.
tagBased: false
description: |
 Replaces accented characters in a string with their closest non-accented equivalent, such as French, Spanish and German vowels. Useful when creating filenames, etc. from people's names.

returnValue: Returns a string.

example: |
 <cfoutput>#deAccent('Pérez')#</cfoutput>

args:
 - name: str
   desc: String within which to replace accented characters
   req: true


javaDoc: |
 /**
  * Replaces accented characters with their non accented closest equivalents.
  * version 1.0 by Rachel Lehman
  * version 1.1 by Pat Branley (improved portability, fixed bug with &quot;x&quot; remapping
  * version 1.2 by Nathan Dintenfass (used more thorough Java-based approach)
  * 
  * @param str      String within which to replace accented characters (Required)
  * @return Returns a string. 
  * @author Rachel Lehman (raelehman@gmail.com) 
  * @version 1.2, December 20, 2012 
  */

code: |
 function deAccent(str){
     //based on the approach found here: http://stackoverflow.com/a/1215117/894061
     var Normalizer = createObject("java","java.text.Normalizer");
     var NormalizerForm = createObject("java","java.text.Normalizer$Form");
     var normalizedString = Normalizer.normalize(str, createObject("java","java.text.Normalizer$Form").NFD);
     var pattern = createObject("java","java.util.regex.Pattern").compile("\p{InCombiningDiacriticalMarks}+");
     return pattern.matcher(normalizedString).replaceAll("");
 }

---

