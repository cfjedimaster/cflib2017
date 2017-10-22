---
layout: udf
title:  cacheCallback
date:   2009-06-11T22:44:37.000Z
library: UtilityLib
argString: "cacheKey, duration, callback[, forceRefresh]"
author: Adam Tuttle
authorEmail: j.adam.tuttle@gmail.com
version: 0
cfVersion: CF5
shortDescription: An easy way to cache the result of any UDF.
tagBased: false
description: |
 Pass a unique cache key (string), duration (using createTimeSpan()), and the function whose return value you want to cache. A fourth optional boolean argument will allow you to force cache update. Returns the value of the function passed in, or the cached return value.

returnValue: Returns a string.

example: |
 <cfscript>
 function currentTime(){
     return "The current time is #timeformat(now())#";
 }
 </cfscript>
 
 <cfoutput>#cacheCallback("my.cache.key", CreateTimeSpan(0,0,20,0), currentTime)#</cfoutput>

args:
 - name: cacheKey
   desc: Unique key used for to store the cache.
   req: true
 - name: duration
   desc: A timespan that determines the length of the cache.
   req: true
 - name: callback
   desc: The UDF to run. 
   req: true
 - name: forceRefresh
   desc: If true, forces a refresh. Defaults to false.
   req: false


javaDoc: |
 /**
  * An easy way to cache the result of any UDF.
  * 
  * @param cacheKey      Unique key used for to store the cache. (Required)
  * @param duration      A timespan that determines the length of the cache. (Required)
  * @param callback      The UDF to run.  (Required)
  * @param forceRefresh      If true, forces a refresh. Defaults to false. (Optional)
  * @return Returns a string. 
  * @author Adam Tuttle (j.adam.tuttle@gmail.com) 
  * @version 0, June 11, 2009 
  */

code: |
 function cacheCallback(cacheKey, duration, callback) {
     var data = "";
     //optional argument: forceRefresh
     if (arrayLen(arguments) eq 4){arguments.forceRefresh=arguments[4];}else{arguments.forceRefresh=false;}
     //clean cachekey of periods that will cause errors
     arguments.cacheKey = replace(arguments.cacheKey, ".", "_", "ALL");
     //ensure cache structure is setup
     if (not structKeyExists(application, "CCBCache")){application.CCBCache = StructNew();}
     if (not structKeyExists(application.CCBCache, arguments.cacheKey)){application.CCBCache[arguments.cacheKey] = StructNew();}
     if (not structKeyExists(application.CCBCache[arguments.cacheKey], "timeout")){application.CCBCache[arguments.cacheKey].timeout = dateAdd('yyyy',-10,now());}
     if (not structKeyExists(application.CCBCache[arguments.cacheKey], "data")){application.CCBCache[arguments.cacheKey].data = '';}
     //update cache if expired
     if (arguments.forceRefresh or dateCompare(now(), application.CCBCache[arguments.cacheKey].timeout) eq 1){
         data = arguments.callback();
         application.CCBCache[arguments.cacheKey].data = data;
         application.CCBCache[arguments.cacheKey].timeout = arguments.duration;
     }
     return application.CCBCache[arguments.cacheKey].data;
 }

---

