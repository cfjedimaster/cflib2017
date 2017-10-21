---
layout: udf
title:  parseCMSRevision
date:   2006-03-01T13:21:45.000Z
library: StrLib
argString: "cmsRevision"
author: Peter J. Farrell
authorEmail: pjf@maestropublishing.com
version: 1
cfVersion: CF5
shortDescription: Parses a CMS (SNV or CVS) revision string into a usable variable.
description: |
 Parses a CMS (SNV or CVS) revision string into a usable variable. Accepts CVS $Revsion: $ or SVN $LastChangedRevision: $.

returnValue: Returns a number.

example: |
 <cfoutput>
 CVS: #parseCMSRevision("$Revision: 1.3 $")#
 SVN: #parseCMSRevision("$LastChangedRevision: 13 $")#
 </cfoutput>

args:
 - name: cmsRevision
   desc: Version string.
   req: true


javaDoc: |
 /**
  * Parses a CMS (SNV or CVS) revision string into a usable variable.
  * 
  * @param cmsRevision      Version string. (Required)
  * @return Returns a number. 
  * @author Peter J. Farrell (pjf@maestropublishing.com) 
  * @version 1, March 1, 2006 
  */

code: |
 function parseCMSRevision(cmsRevision) {
     return listGetAt(arguments.cmsRevision, 2, " ");
 }

---

