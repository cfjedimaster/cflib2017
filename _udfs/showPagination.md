---
layout: udf
title:  showPagination
date:   2009-04-08T03:39:21.000Z
library: StrLib
argString: "uri, uriPageVar, totalPages, currentPage, activeClass, separator, balanceEllipsisAt, showFirstLast[, showPrevNext]"
author: Tony Felice
authorEmail: sites@breckcomm.com
version: 0
cfVersion: CF5
shortDescription: Creates easy pagination output ie&#58; &lt; 1|2|3|4|5 ... |101|102|103|104|105 &gt;
description: |
 Creates easy pagination output ie: &lt; 1|2|3|4|5 ... |101|102|103|104|105 &gt;
 
 Slightly klunky, but gets the job done.

returnValue: Returns a string.

example: |
 <cfoutput>showPagination("http://www.google.com/search","q",20,3,"active","|",5,1,1) produces:<br /> #showPagination("http://www.google.com/search","q",105,3,"active","|",5,1,1)#</cfoutput>

args:
 - name: uri
   desc: Target URI.
   req: true
 - name: uriPageVar
   desc: queryString var that indicates page.
   req: true
 - name: totalPages
   desc: Total number of pages available.
   req: true
 - name: currentPage
   desc: Current page.
   req: true
 - name: activeClass
   desc: The CSS class used for the current page.
   req: true
 - name: separator
   desc: String used between page navigation items.
   req: true
 - name: balanceEllipsisAt
   desc: Numeric location of the ellipsis when nav is truncated
   req: true
 - name: showFirstLast
   desc: Boolean value that determines whether to show or hide the first page/last page links.
   req: true
 - name: showPrevNext
   desc: Boolean value to determines whether to show/hide the prev/next links.
   req: false


javaDoc: |
 /**
  * Creates easy pagination output ie: &lt; 1|2|3|4|5 ... |101|102|103|104|105 &gt;
  * 
  * @param uri      Target URI. (Required)
  * @param uriPageVar      queryString var that indicates page. (Required)
  * @param totalPages      Total number of pages available. (Required)
  * @param currentPage      Current page. (Required)
  * @param activeClass      The CSS class used for the current page. (Required)
  * @param separator      String used between page navigation items. (Required)
  * @param balanceEllipsisAt      Numeric location of the ellipsis when nav is truncated (Required)
  * @param showFirstLast      Boolean value that determines whether to show or hide the first page/last page links. (Required)
  * @param showPrevNext      Boolean value to determines whether to show/hide the prev/next links. (Optional)
  * @return Returns a string. 
  * @author Tony Felice (sites@breckcomm.com) 
  * @version 0, April 7, 2009 
  */

code: |
 function showPagination(uri,uriPageVar,totalPages,currentPage,activeClass,separator,balanceEllipsisAt,showFirstLast,showPrevNext){
         var output = "";
         var beginAt = 1;
         var resumeAt = 0;
         var moveFirst ="&laquo;";
         var moveLast ="&raquo;";
         var moveNext ="&gt;";
         var movePrev ="&lt;";
         var i = "";
         
         var args = ArrayLen(arguments); 
         if(balanceEllipsisAt lt totalPages/2){
             beginAt = (currentPage - balanceEllipsisAt) + 2;
             if(beginAt lt 1) beginAt = 1;
             resumeAt = totalPages - balanceEllipsisAt;
         }
         
         if(showFirstLast eq 1 and currentPage gt balanceEllipsisAt-1){
             output = output & "<a href=""" & uri & "?" & uriPageVar & "=1"""">" & moveFirst & "</a> ";
         }
         if(showPrevNext eq 1 and currentPage neq 1){
             output = output & "<a href=""" & uri & "?" & uriPageVar & "=" & currentPage-1 & """>" & movePrev & "</a> ";
         }
         for(i = 1;i lte totalPages;i=i+1){                
             if((i gte beginAt AND i lte (balanceEllipsisAt+beginAt-1)) OR (i gt resumeAt)){        
                 if(i gt beginAt OR beginAt gte totalPages-(balanceEllipsisAt-1)){
                     output = output & separator;
                 }
                 output = output & "<a href=""" & uri & "?" & uriPageVar & "=" & i & """";
                 if(i eq currentPage){
                     output = output & "class=""" & activeClass & """";
                 }
                 output = output & ">" & i & "</a>";
             }else if(i eq resumeAt){
                 output = output & " ... ";
             }            
         }
         if(showPrevNext eq 1 and currentPage neq totalPages){
             output = output & " <a href=""" & uri & "?" & uriPageVar & "=" & currentPage+1 & """>" & moveNext & "</a> ";
         }
         if(showFirstLast eq 1 and currentPage neq totalPages){
             output = output & " <a href=""" & uri & "?" & uriPageVar & "=" & totalPages & """>" & moveLast & "</a> ";
         }
         return output;
     }

---

