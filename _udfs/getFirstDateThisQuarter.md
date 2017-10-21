---
layout: udf
title:  getFirstDateThisQuarter
date:   2005-08-11T16:08:38.000Z
library: DateLib
argString: ""
author: Scott Glassbrook
authorEmail: cflib@vox.phydiux.com
version: 1
cfVersion: CF5
shortDescription: Returns a date object with the first date of the current quarter.
description: |
 This function returns a datetime string of the first date of the current quarter, using the Now() function.

returnValue: Returns a date.

example: |
 <cfoutput>#getFirstDateThisQuarter()#</cfoutput>

args:


javaDoc: |
 /**
  * Returns a date object with the first date of the current quarter.
  * 
  * @return Returns a date. 
  * @author Scott Glassbrook (cflib@vox.phydiux.com) 
  * @version 1, August 11, 2005 
  */

code: |
 function getFirstDateThisQuarter() {
     if(now() gte createDateTime(DatePart("yyyy", now()), 01, 01, 00, 00, 00) and now() lte createDateTime(DatePart("yyyy", now()), 03, 31, 23, 59, 59)) return createDate(datePart("yyyy", now()), 01, 01);
     else if (now() gte createDateTime(DatePart("yyyy", now()), 04, 01, 00, 00, 00) and now() lte createDateTime(DatePart("yyyy", now()), 06, 30, 23, 59, 59)) return createDate(datePart("yyyy", now()), 04, 01);
     else if (now() gte createDateTime(DatePart("yyyy", now()), 07, 01, 00, 00, 00) and now() lte createDateTime(DatePart("yyyy", now()), 09, 30, 23, 59, 59)) return createDate(datePart("yyyy", now()), 07, 01);
     else return createDate(datePart("yyyy", now()), 10, 01);
 }

---

