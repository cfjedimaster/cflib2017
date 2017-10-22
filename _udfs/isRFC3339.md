---
layout: udf
title:  isRFC3339
date:   2010-02-09T05:00:20.000Z
library: DateLib
argString: "input"
author: Ben Garrett
authorEmail: bengarrett@civbox.org
version: 1
cfVersion: CF6
shortDescription: Compares a date/time string and validates it against the RFC 3339 - Date and Time on the Internet&#58; Timestamps protocol.
tagBased: false
description: |
 Compares a date/time string and validates it against the RFC 3339 - Date and Time on the Internet: Timestamps protocol. Its use is a requirement for all date/time values contained within Atom 1 feeds which is supported by CF8's CFFEED tag.

returnValue: Returns a boolean.

example: |
 #IsRFC3339('1999-01-31T00:01:43.05-23:00')#

args:
 - name: input
   desc: String to check.
   req: true


javaDoc: |
 /**
  * Compares a date/time string and validates it against the RFC 3339 - Date and Time on the Internet: Timestamps protocol.
  * 
  * @param input      String to check. (Required)
  * @return Returns a boolean. 
  * @author Ben Garrett (bengarrett@civbox.org) 
  * @version 1, February 8, 2010 
  */

code: |
 function isRFC3339(input) {
     return YesNoFormat(REFindNoCase('^(19|20)\d\d-(0[1-9]|1[0-2])-([0-2]\d|3[0-1])T([0-1]\d|2[0-4]):([0-5]\d):([0-5]\d)(.\d\d)?(Z|[\+|-]([0-1]\d|2[0-4]):([0-5]\d))$',input));
 }

---

