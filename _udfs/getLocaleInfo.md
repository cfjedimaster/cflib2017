---
layout: udf
title:  getLocaleInfo
date:   2008-06-13T14:48:21.000Z
library: UtilityLib
argString: ""
author: Reinhard Jung
authorEmail: reinhard.jung@gmail.com
version: 1
cfVersion: CF6
shortDescription: A better version of getLocale.
tagBased: true
description: |
 This is a better version of getLocale. It allows you to get the full, long, and short version of the current locale.

returnValue: Returns a struct.

example: |
 <cfdump var="#getLocaleInfo()#">

args:


javaDoc: |
 <!---
  A better version of getLocale.
  
  @return Returns a struct. 
  @author Reinhard Jung (reinhard.jung@gmail.com) 
  @version 1, June 13, 2008 
 --->

code: |
 <cffunction name="getLocaleInfo" description="gets the Locale" output="false">
     <cfset var myLocale = structNew() />
     <cfset var currentLocale    = CreateObject("java", "java.util.Locale").getDefault() />
     <cfset myLocale.short.country        = currentLocale.getCountry() />
     <cfset myLocale.short.language    = currentLocale.getLanguage() />
     <cfset myLocale.short                        = myLocale.short.language &'_' &myLocale.short.country />
     <cfset myLocale.long                        = getLocale() />
     <cfset myLocale.full                        = getLocaleDisplayName() />
 
     <cfreturn myLocale />
 </cffunction>

oldId: 1874
---

