---
layout: udf
title:  formatTimespan
date:   2007-08-15T03:37:22.000Z
library: StrLib
argString: "value, mask"
author: Oblio Leitch
authorEmail: oleitch@locustcreek.com
version: 1
cfVersion: CF6
shortDescription: Returns a custom-formated timespan, similar to timeFormat().
tagBased: true
description: |
 This function takes a decimal number representing a timespan and formats it to fit a mask; similar to timeFormat().  Within the mask, it will replace the first formating char (y,m,w,d,h,n,s) with the number of those units.  That value is then removed from the total.  The addition of {s} can be used for conditionally adding the plural.

returnValue: Returns a string.

example: |
 <cfset duration=createTimeSpan(366,8,30,14) />
 duration: #duration# (366.354328704)<br />
 #formatTimeSpan(duration,"yyr{s}, mmo(s), wwk{s}, dday{s}, hhr{s}, nmin{s}, ssec{s}")# (1yr, 0mo(s), 0wks, 1day, 8hrs, 30mins, 14secs)<br />
 #formatTimeSpan(duration,"mmo{s}, hhr{s}, nmin{s}")# (12mos, 32hrs, 30mins)<br />
 #formatTimeSpan(duration,"nmin{s}")# (527550mins)<br />

args:
 - name: value
   desc: Timespan value.
   req: true
 - name: mask
   desc: Formatting string.
   req: true


javaDoc: |
 <!---
  Returns a custom-formated timespan, similar to timeFormat().
  
  @param value      Timespan value. (Required)
  @param mask      Formatting string. (Required)
  @return Returns a string. 
  @author Oblio Leitch (oleitch@locustcreek.com) 
  @version 1, August 14, 2007 
 --->

code: |
 <cffunction name="formatTimespan" access="public" returntype="string" output="no">
     <cfargument name="value" type="numeric" hint="timespan value" required="yes" />
     <cfargument name="mask" type="string" hint="formating string" required="yes" />
     <cfset var l=structNew() />
 
     <cfscript>
         l.dValue=arguments.value;
         l.result=arguments.mask;
 
         //year
         if(reFind("(?i)\by",l.result)){
             l.value=dateDiff("yyyy",0,l.dValue);
             l.dValue=l.dValue-dateAdd("yyyy",l.value,0);
             if(reFind("(?i)\by\w+\{s\}",l.result))l.result=reReplace(l.result,"\{s\}",iif(l.value eq 1,de(""),de("s")));
             l.result=reReplace(l.result,"(?i)\by",l.value);
         }
         //month
         if(reFind("(?i)\bm",l.result)){
             l.value=dateDiff("m",0,l.dValue);
             l.dValue=l.dValue-dateAdd("m",l.value,0);
             if(reFind("(?i)\bm\w+\{s\}",l.result))l.result=reReplace(l.result,"\{s\}",iif(l.value eq 1,de(""),de("s")));
             l.result=reReplace(l.result,"(?i)\bm",l.value);
         }
         //week
         if(reFind("(?i)\bw",l.result)){
             l.value=dateDiff("ww",0,l.dValue);
             l.dValue=l.dValue-dateAdd("ww",l.value,0);
             if(reFind("(?i)\bw\w+\{s\}",l.result))l.result=reReplace(l.result,"\{s\}",iif(l.value eq 1,de(""),de("s")));
             l.result=reReplace(l.result,"(?i)\bw",l.value);
         }
         //day
         if(reFind("(?i)\bd",l.result)){
             l.value=dateDiff("d",0,l.dValue);
             l.dValue=l.dValue-dateAdd("d",l.value,0);
             if(reFind("(?i)\bd\w+\{s\}",l.result))l.result=reReplace(l.result,"\{s\}",iif(l.value eq 1,de(""),de("s")));
             l.result=reReplace(l.result,"(?i)\bd",l.value);
         }
         //hour
         if(reFind("(?i)\bh",l.result)){
             l.value=dateDiff("h",0,l.dValue);
             l.dValue=l.dValue-dateAdd("h",l.value,0);
             if(reFind("(?i)\bh\w+\{s\}",l.result))l.result=reReplace(l.result,"\{s\}",iif(l.value eq 1,de(""),de("s")));
             l.result=reReplace(l.result,"(?i)\bh",l.value);
         }
         //minute
         if(reFind("(?i)\bn",l.result)){
             l.value=dateDiff("n",0,l.dValue);
             l.dValue=l.dValue-dateAdd("n",l.value,0);
             if(reFind("(?i)\bn\w+\{s\}",l.result))l.result=reReplace(l.result,"\{s\}",iif(l.value eq 1,de(""),de("s")));
             l.result=reReplace(l.result,"(?i)\bn",l.value);
         }
         //minute
         if(reFind("(?i)\bs",l.result)){
             l.value=dateDiff("s",0,l.dValue);
             l.dValue=l.dValue-dateAdd("s",l.value,0);
             if(reFind("(?i)\bs\w+\{s\}",l.result))l.result=reReplace(l.result,"\{s\}",iif(l.value eq 1,de(""),de("s")));
             l.result=reReplace(l.result,"(?i)\bs\B",l.value);
         }
     </cfscript>
     <cfreturn l.result />
 </cffunction>

---

