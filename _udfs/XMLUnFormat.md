---
layout: udf
title:  XMLUnFormat
date:   2002-11-15T18:20:56.000Z
library: StrLib
argString: "string"
author: Kreig Zimmerman
authorEmail: kkz@foureyes.com
version: 1
cfVersion: CF5
shortDescription: UN-escapes the five forbidden characters in XML data.
tagBased: false
description: |
 This is a simple UDF which does the exact opposite of CFMX's XmlFormat() function.  Specifically, it replaces the following five characters in XML-escaped data with their normal equivalents:
 &gt; with &gt;
 &lt; with &lt;
 ' with '
 &quot; with &quot;
 &amp; with &amp;

returnValue: Returns a string.

example: |
 <cfscript>
 XmlSafe="&quot;That&apos;s a very safe string &amp; &lt;TAG&gt; you&apos;re it!!!&quot;";
 XmlUnsafe=XmlUnformat(XmlSafe);
 WriteOutput(htmlCodeFormat(XmlUnsafe));
 </cfscript>

args:
 - name: string
   desc: String to format.
   req: true


javaDoc: |
 /**
  * UN-escapes the five forbidden characters in XML data.
  * 
  * @param string      String to format. (Required)
  * @return Returns a string. 
  * @author Kreig Zimmerman (kkz@foureyes.com) 
  * @version 1, November 15, 2002 
  */

code: |
 function XMLUnFormat(string) {
     var resultString=string;
     resultString=ReplaceNoCase(resultString,"&apos;","'","ALL");
     resultString=ReplaceNoCase(resultString,"&quot;","""","ALL");
     resultString=ReplaceNoCase(resultString,"&lt;","<","ALL");
     resultString=ReplaceNoCase(resultString,"&gt;",">","ALL");
     resultString=ReplaceNoCase(resultString,"&amp;","&","ALL");
     return resultString;
 }

---

