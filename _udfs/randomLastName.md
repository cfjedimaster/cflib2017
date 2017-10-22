---
layout: udf
title:  randomLastName
date:   2010-06-18T21:23:39.000Z
library: UtilityLib
argString: ""
author: Matt Casey
authorEmail: matt@digitalhappy.com
version: 1
cfVersion: CF6
shortDescription: Returns a random last name.
tagBased: true
description: |
 Returns a random last name from an internal list. Stupidly simple but handly non the less. List was taken from England/Wales top 100 at http://www.taliesin-arlein.net

returnValue: Returns a string.

example: |
 <cfoutput>#randomLastName()#</cfoutput>

args:


javaDoc: |
 <!---
  Returns a random last name.
  
  @return Returns a string. 
  @author Matt Casey (matt@digitalhappy.com) 
  @version 1, June 18, 2010 
 --->

code: |
 <cffunction name="randomLastName" output="false" access="public" returntype="any" hint="">
     <cfset names = "Adams,Ahmed,Ali,Allen,Anderson,Bailey,Baker,Barker,Barnes,Begum,Bell,Bennett,Brown,Butler,Campbell,Carter,Chapman,Clark,Clarke,Collins,Cook,Cooper,Cox,Davies,Davis,Dixon,Edwards,Ellis,Evans,Fisher,Foster,Gray,Green,Griffiths,Hall,Harris,Harrison,Harvey,Hill,Holmes,Hughes,Hunt,Hussain,Jackson,James,Jenkins,Johnson,Jones,Kelly,Khan,King,Knight,Lee,Lewis,Lloyd,Marshall,Martin,Mason,Matthews,Miller,Mills,Mitchell,Moore,Morgan,Morris,Murphy,Owen,Palmer,Parker,Patel,Phillips,Powell,Price,Richards,Richardson,Roberts,Robinson,Rogers,Russell,Scott,Shaw,Simpson,Singh,Smith,Stevens,Taylor,Thomas,Thompson,Turner,Walker,Ward,Watson,Webb,White,Wilkinson,Williams,Wilson,Wood,Wright,Young" />    
     <cfreturn listGetAt(names, randRange(1,100)) />
 </cffunction>

---

