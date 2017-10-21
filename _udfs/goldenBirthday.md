---
layout: udf
title:  goldenBirthday
date:   2009-05-01T03:37:35.000Z
library: DateLib
argString: "birthday"
author: Joshua Siok
authorEmail: jsiok@smp.org
version: 0
cfVersion: CF6
shortDescription: Returns a 'golden birthday', or the date when your birthday day of month equals your age.
description: |
 Returns a 'golden birthday', or the date when your birthday day of month equals your age.

returnValue: Returns a date.

example: |
 <cfoutput>#goldenBirthday(createDate(1973,4,8))#</cfoutput>

args:
 - name: birthday
   desc: The date of birth.
   req: true


javaDoc: |
 <!---
  Returns a 'golden birthday', or the date when your birthday day of month equals your age.
  
  @param birthday      The date of birth. (Required)
  @return Returns a date. 
  @author Joshua Siok (jsiok@smp.org) 
  @version 0, April 30, 2009 
 --->

code: |
 <cffunction name="goldenBirthday" access="public" returntype="date">
     <cfargument name="birthDate" type="date" required="yes">
     <cfreturn dateAdd("yyyy", day(birthDate),birthDate)>
 </cffunction>

---

