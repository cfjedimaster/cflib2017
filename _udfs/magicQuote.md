---
layout: udf
title:  magicQuote
date:   2006-05-01T12:10:25.000Z
library: StrLib
argString: "txt"
author: Keith Gaughan
authorEmail: kmgaughan@eircom.net
version: 1
cfVersion: CF5
shortDescription: Cleanly converts typewriter quotes to typographer's quotes.
description: |
 Accepts a single string and converts any straight typewriter quotes into their corresponding curly typographer's quotes to give a better visual appearence. Note, however, that this code assumes that the text passed in is plain text and not HTML.

returnValue: Returns a string.

example: |
 <cfoutput>#MagicQuote("""It's working?""")#</cfoutput>

args:
 - name: txt
   desc: Text to format.
   req: true


javaDoc: |
 /**
  * Cleanly converts typewriter quotes to typographer's quotes.
  * 
  * @param txt      Text to format. (Required)
  * @return Returns a string. 
  * @author Keith Gaughan (kmgaughan@eircom.net) 
  * @version 1, May 1, 2006 
  */

code: |
 function magicQuote(txt) {
     // Left quotes
     txt = REReplace(txt, "(^|[ " & Chr(9) & Chr(10) & Chr(13) & "'])""", "\1&##8220;", "ALL");
     txt = REReplace(txt, "(^|[ " & Chr(9) & Chr(10) & Chr(13) & "]|&##8220;)'",  "\1&##8216;", "ALL");
 
     // Right quotes
     txt = Replace(txt, """",        "&##8221;",  "ALL");
     txt = Replace(txt, "'&##8220;", "'&##8221;", "ALL");
     txt = Replace(txt, "'",         "&##8217;",  "ALL");
 
     return txt;
 }

---

