---
layout: udf
title:  parseCMSDatetime
date:   2006-01-26T13:08:44.000Z
library: DateLib
argString: "cmsDatetime"
author: Peter J. Farrell
authorEmail: pjf@maestropublishing.com
version: 1
cfVersion: CF5
shortDescription: Parses a CMS (SVN or CVS) datetime into a CF datetime object.
tagBased: false
description: |
 Takes a CVS $Date: $ keyword data or SVN $LastChangedDate: $ keyword data and returns a CF datetime object.

returnValue: Returns a date and time.

example: |
 <cfset variables.lastChangedDateString = "$LastChangedDate: 2005/10/26 14:02:01 -0500 (Wed, 26 Oct 2005) $" />
 
 <cfdump var="#parseCMSDatetime(variables.lastChangedDateString)#">

args:
 - name: cmsDatetime
   desc: Datetime value from SVN/CVS.
   req: true


javaDoc: |
 /**
  * Parses a CMS (SVN or CVS) datetime into a CF datetime object.
  * 
  * @param cmsDatetime      Datetime value from SVN/CVS. (Required)
  * @return Returns a date and time. 
  * @author Peter J. Farrell (pjf@maestropublishing.com) 
  * @version 1, January 26, 2006 
  */

code: |
 function parseCMSDatetime(cmsDatetime) {
     // Replace all /'s that CVS uses with -'s
     return LSParseDatetime(replace(listGetAt(arguments.cmsDatetime, 2, " "), "/", "-", "ALL") & " " & listGetAt(arguments.cmsDatetime, 3, " "));
 }

---

