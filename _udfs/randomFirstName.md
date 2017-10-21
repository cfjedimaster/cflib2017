---
layout: udf
title:  randomFirstName
date:   2010-06-22T14:02:56.000Z
library: UtilityLib
argString: ""
author: Matt Casey
authorEmail: matt@digitalhappy.com
version: 1
cfVersion: CF6
shortDescription: Returns a random first name.
description: |
 Returns a first name from an internal list of 100. Stupidly simple, but very handy for filling test datasets.  Names were taken from Facebooks top 100

returnValue: Returns a string.

example: |
 <cfoutput>#randomfirstName()#</cfoutput>

args:


javaDoc: |
 <!---
  Returns a random first name.
  
  @return Returns a string. 
  @author Matt Casey (matt@digitalhappy.com) 
  @version 1, June 22, 2010 
 --->

code: |
 <cffunction name="randomFirstName" output="false" access="public" returntype="any" hint="">
     <cfset var names = "Adam,Ahmed,Alex,Ali,Amanda,Amy,Andrea,Andrew,Andy,Angela,Anna,Anne,Anthony,Antonio,Ashley,Barbara,Ben,Bill,Bob,Brian,Carlos,Carol,Chris,Christian,Christine,Cindy,Claudia,Dan,Daniel,Dave,David,Debbie,Elizabeth,Eric,Gary,George,Heather,Jack,James,Jason,Jean,Jeff,Jennifer,Jessica,Jim,Joe,John,Jonathan,Jose,Juan,Julie,Karen,Kelly,Kevin,Kim,Laura,Linda,Lisa,Luis,Marco,Maria,Marie,Mark,Martin,Mary,Matt,Matthew,Melissa,Michael,Michelle,Mike,Mohamed,Monica,Nancy,Nick,Nicole,Patricia,Patrick,Paul,Peter,Rachel,Richard,Robert,Ryan,Sam,Sandra,Sara,Sarah,Scott,Sharon,Stephanie,Stephen,Steve,Steven,Susan,Thomas,Tim,Tom,Tony,William" />
     <cfreturn listGetAt(names, randRange(1,100)) />
 </cffunction>

---

