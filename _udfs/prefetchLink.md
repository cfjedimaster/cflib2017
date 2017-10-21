---
layout: udf
title:  prefetchLink
date:   2005-08-22T12:27:08.000Z
library: UtilityLib
argString: "link[, title]"
author: Wayne Graham
authorEmail: wsgrah@wm.edu
version: 1
cfVersion: CF5
shortDescription: Creates the prefetch directive for Mozilla/Firefox browsers.
description: |
 Creates the prefetch directive for Mozilla/Firefox to load pages into the browser cache while the browser is idle.

returnValue: Returns a string.

example: |
 <cfset link = "http://www.cflib.org" />
 <cfset title = "CFLib.org" />
 
 <cfoutput>
     #prefetchLink(link, title)# <a href="#link#" title="#title#">#title#</a>
 </cfoutput>

args:
 - name: link
   desc: Link for prefetching.
   req: true
 - name: title
   desc: Title for prefetched resource.
   req: false


javaDoc: |
 /**
  * Creates the prefetch directive for Mozilla/Firefox browsers.
  * For more information on link prefetching see http://www.mozilla.org/projects/netlib/Link_Prefetching_FAQ.html#What_are_the_prefetching_hints
  * 
  * @param link      Link for prefetching. (Required)
  * @param title      Title for prefetched resource. (Optional)
  * @return Returns a string. 
  * @author Wayne Graham (wsgrah@wm.edu) 
  * @version 1, August 22, 2005 
  */

code: |
 function prefetchLink(link){
     if(arrayLen(arguments) gte 2) return '<link rel="prefetch" href="#arguments.link#" title="#arguments[2]#" />';
      return '<link rel="prefetch" href="#arguments.link#">';
 }

---

