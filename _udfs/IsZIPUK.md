---
layout: udf
title:  IsZIPUK
date:   2008-10-30T17:17:19.000Z
library: StrLib
argString: "str"
author: Duncan
authorEmail: duncan@duncancumming.co.uk
version: 2
cfVersion: CF5
shortDescription: Tests passed value to see if it is a properly formatted U.K. postcode (zip code).
description: |
 Tests passed value to see if it is a properly formatted U.K. postcode (zip code).  Does not check actual validity/existence of zip code!

returnValue: Returns a Boolean.

example: |
 <cfoutput>
 OX4 1XP: #YesNoFormat(IsZipUK("OX4 1XP"))#<br>
 OX11 0AL: #YesNoFormat(IsZipUK("OX11 0AL"))#<br>
 O11 0AS: #YesNoFormat(IsZipUK("O11 0AS"))#<br>
 RG1 AP: #YesNoFormat(IsZipUK("RG1 AP"))#<br>
 </cfoutput>

args:
 - name: str
   desc: String to be checked.
   req: true


javaDoc: |
 /**
  * Tests passed value to see if it is a properly formatted U.K. postcode (zip code).
  * v1 by Robert West
  * 
  * @param str      String to be checked. (Required)
  * @return Returns a Boolean. 
  * @author Duncan (duncan@duncancumming.co.uk) 
  * @version 2, October 30, 2008 
  */

code: |
 function IsZipUK(str) {
 return REFind("(GIR 0AA)|((([ABCDEFGHIJKLMNOPRSTUWYZ][0-9][0-9]?)|(([ABCDEFGHIJKLMNOPRSTUWYZ][ABCDEFGHKLMNOPQRSTUVWXY][0-9][0-9]?)|(([ABCDEFGHIJKLMNOPRSTUWYZ][0-9][ABCDEFGHJKSTUW])|([ABCDEFGHIJKLMNOPRSTUWYZ][ABCDEFGHKLMNOPQRSTUVWXY][0-9][ABEHMNPRVWXY])))) [0-9][ABDEFGHJLNPQRSTUWXYZ]{2})", str);
 }

---

