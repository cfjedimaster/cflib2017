---
layout: udf
title:  setFileDate
date:   2011-06-14T22:54:22.000Z
library: FileSysLib
argString: "filename[, newDate]"
author: James Moberg
authorEmail: james@ssmedia.com
version: 1
cfVersion: CF9
shortDescription: Updates the dateLastModified file attribute.
description: |
 Updates the dateLastModified file attribute.

returnValue: Returns a boolean.

example: |
 <cfscript>
 setFileDate("c:\image.jpg", "1/1/2005 13:00:00");
 </cfscript>

args:
 - name: filename
   desc: Absolute filename.
   req: true
 - name: newDate
   desc: Date/Time to assign. Defaults to current time.
   req: false


javaDoc: |
 /**
  * Updates the dateLastModified file attribute.
  * 
  * @param filename      Absolute filename. (Required)
  * @param newDate      Date/Time to assign. Defaults to current time. (Optional)
  * @return Returns a boolean. 
  * @author James Moberg (james@ssmedia.com) 
  * @version 1, June 14, 2011 
  */

code: |
 function setFileDate(filename){
     var newDate = Now();
     if (ArrayLen(Arguments) GTE 2) { newDate = arguments[2]; }
     if (not isdate(newDate)) { return false; }
     else if (newDate LT '1/1/1970') { return false; }
     if (not fileExists(filename)) { return false; }
     newDate = DateDiff("s", DateConvert("utc2Local", "January 1 1970 00:00"), newDate) * 1000;
     return CreateObject("java","java.io.File").init(JavaCast("string",filename)).setLastModified(newDate);
 }

---

