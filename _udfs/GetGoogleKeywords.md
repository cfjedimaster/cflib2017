---
layout: udf
title:  GetGoogleKeywords
date:   2002-06-28T13:05:36.000Z
library: StrLib
argString: "referer"
author: Matthew Fusfield
authorEmail: matt@fus.net
version: 1
cfVersion: CF5
shortDescription: Pass it a http_referer value and this fuction will parse out the keywords used to find it if referred from Google.
tagBased: false
description: |
 This function will accept a http_referer and check to see if referer is from google.com. If so, it will return the keywords used for the search. If not, this function will return an empty string.

returnValue: Returns a string.

example: |
 <cfset ref1 = "http://www.google.com/search?hl=en&q=chinesezodiac&btnG=Google+Search">
 <cfset ref2 = "http://www.google.com/search?hl=en&q=coldfusion+open+source">
 <cfoutput>
 Keywords from #ref1# = #GetGoogleKeywords(ref1)#<br>
 Keywords from #ref2# = #GetGoogleKeywords(ref2)#<br>
 </cfoutput>

args:
 - name: referer
   desc: The referer string to check.
   req: true


javaDoc: |
 /**
  * Pass it a http_referer value and this fuction will parse out the keywords used to find it if referred from Google.
  * 
  * @param referer      The referer string to check. (Required)
  * @return Returns a string. 
  * @author Matthew Fusfield (matt@fus.net) 
  * @version 1, June 28, 2002 
  */

code: |
 function getGoogleKeywords(referer) {
     
     var Keywords='';
     var StartPos=0;
     var EndString='';
     
     if (referer contains 'google.com') {
         StartPos=ReFindNoCase('q=.',referer);
     
         if (StartPos GT 0) {
             EndString=mid(referer,StartPos+2,Len(referer));
             Keywords=ReReplaceNoCase(EndString,'&.*','','ALL');
             Keywords=URLDecode(Keywords);
             }
         
         return Keywords;
     }
     else {
         return '';
     }
     
     
     
 }

---

