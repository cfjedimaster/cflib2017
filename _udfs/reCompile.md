---
layout: udf
title:  reCompile
date:   2011-05-30T15:17:10.000Z
library: StrLib
argString: "[flags]"
author: Henry Ho
authorEmail: henryho167@gmail.com
version: 1
cfVersion: CF9
shortDescription: Create a java.util.regex.Pattern in a CF-friendly way.
description: |
 Create a java.util.regex.Pattern in a CF-friendly way. Returns an instance of java.util.regex.Pattern.
 
 flags - List or Array of: 'CANON_EQ', 'CASE_INSENSITIVE', 'COMMENTS', 'DOTALL', 'LITERAL', 'MULTILINE', 'UNICODE_CASE', 'UNIX_LINES'

returnValue: Returns a Java object.

example: |
 <cfscript>
 pattern = reCompile("a*b");
 
 m = pattern.matcher("aaaaab");
 
 writeDump(m.matches());
 
 </cfscript>

args:
 - name: flags
   desc: List or an array of valid Java Regex pattern flags&#58; 'CANON_EQ', 'CASE_INSENSITIVE', 'COMMENTS', 'DOTALL', 'LITERAL', 'MULTILINE', 'UNICODE_CASE', 'UNIX_LINES'
   req: false


javaDoc: |
 /**
  * Create a java.util.regex.Pattern in a CF-friendly way.
  * 
  * @param flags      List or an array of valid Java Regex pattern flags: 'CANON_EQ', 'CASE_INSENSITIVE', 'COMMENTS', 'DOTALL', 'LITERAL', 'MULTILINE', 'UNICODE_CASE', 'UNIX_LINES' (Optional)
  * @return Returns a Java object. 
  * @author Henry Ho (henryho167@gmail.com) 
  * @version 1, May 30, 2011 
  */

code: |
 function reCompile(required String regex, flags) {
     var pattern = createObject("java","java.util.regex.Pattern");
         
     if (isNull(flags))
         local.compiled = pattern.compile(regex);
     else {
         if (isSimpleValue(flags))
             flags = listToArray(flags);
     
         var flagInt = 0;
             
         for (local.flagName in flags)
             flagInt += pattern[flagName];
             
         local.compiled = pattern.compile(regex, javacast("int", flagInt));
     }
         
     return local.compiled;
 }

---

