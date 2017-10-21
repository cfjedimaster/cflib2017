---
layout: udf
title:  getBankHolidays
date:   2011-03-13T19:43:38.000Z
library: CFMLLib
argString: "[iYear]"
author: Sigi Heckl
authorEmail: siegfried.heckl@siemens.com
version: 0
cfVersion: CF5
shortDescription: Returns a struct with the bank holidays of Germany
description: |
 Returns a struct with the bank holidays of Germany. I am sure you can adapt this to your local given holidays. The essential part of the function is the easter formula.

returnValue: Returns a struct

example: |
 <cfdump var="#getBankHolidays()#">

args:
 - name: iYear
   desc: Defaults to current year
   req: false


javaDoc: |
 <!---
  Returns a struct with the bank holidays of Germany
  
  @param iYear      Defaults to current year (Optional)
  @return Returns a struct 
  @author Sigi Heckl (siegfried.heckl@siemens.com) 
  @version 0, March 13, 2011 
 --->

code: |
 <cffunction name="getBankHolidays" access="public" output="false" returntype="struct" hint="general bank holidays for DE">
   <cfargument name="iYear" type="numeric" default="#datepart('yyyy',now())#" hint="year for calculation" />
 
     //definition of constant holidays
     <cfset var strResult = {newyear     = createDate(arguments.iYear,1,1),
                             dayOfWork   = createDate(arguments.iYear,5,1),
                             christmas1  = createDate(arguments.iYear,12,25),
                             christmas2  = createDate(arguments.iYear,12,26),
                             nationalDay = createDate(arguments.iYear,10,3)
                            } />
     <cfset var local     = {} />
 
     //easter formula to get variable holidays
     <cfset local.k  = round(arguments.iYear / 100) />
     <cfset local.m  = 15 + round((3*local.k +3)/4) - round((8*local.k+13)/25) />
     <cfset local.s  = 2 - round((3*local.k+3)/4) />
     <cfset local.a  = arguments.iYear mod 19 />
     <cfset local.d  = (19*local.a+local.m) mod 30 />
     <cfset local.r  = round((local.d + round(local.a/11))/29) />
     <cfset local.og = 21 + local.d - local.r />
     <cfset local.sz = 7 - (arguments.iYear + round(arguments.iYear/4) + local.s) mod 7 />
     <cfset local.oe = 7 - (local.og-local.sz) mod 7 />
     <cfset local.os = local.og + local.oe />
     <cfset local.om = 3 />
     <cfif local.os GT 31>
       <cfset local.os = local.os - 31 />
       <cfset local.om = 4 />
     </cfif>
 
     <cfset local.easterSunday    = createDate(arguments.iYear, local.om, local.os) />
     <cfset strResult.osterMonday = dateAdd('d',1,local.easterSunday) />
     <cfset strResult.goodFriday  = dateAdd('d',-2,local.easterSunday) />
     <cfset strResult.whitsun     = dateAdd('d',50,local.easterSunday) />
     <cfset strResult.ascension   = dateAdd('d',39,local.easterSunday) />
 
     <CFRETURN strResult />
 </cffunction>

---

