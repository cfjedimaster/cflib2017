---
layout: udf
title:  LSShortDateFormat
date:   2002-06-28T13:37:45.000Z
library: DateLib
argString: "date"
author: Matthew Walker
authorEmail: matthew@cabbagetree.co.nz
version: 1
cfVersion: CF5
shortDescription: Return a date in a locale-specific short form.
description: |
 This function returns a date in a short form (such as mm/dd/yyyy or dd.mm.yyyy) based on your locale setting. Please note that CFMX now supports a mask of &quot;short&quot; that should be used instead of this UDF.

returnValue: Returns a string.

example: |
 <cfoutput>
     Locale: #GetLocale()#<br>
     LSDateFormat(): #LSDateFormat(Now())#<br>
     LSShortDateFormat(): #LSShortDateFormat(Now())#
 </cfoutput>

args:
 - name: date
   desc: The date to modify.
   req: true


javaDoc: |
 /**
  * Return a date in a locale-specific short form.
  * 
  * @param date      The date to modify. (Required)
  * @return Returns a string. 
  * @author Matthew Walker (matthew@cabbagetree.co.nz) 
  * @version 1, June 28, 2002 
  */

code: |
 function LSShortDateFormat(date) {
     return LSDateFormat(date, ShortDateMask());
 }

---

