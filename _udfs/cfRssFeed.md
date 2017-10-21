---
layout: udf
title:  cfRssFeed
date:   2008-11-20T16:37:12.000Z
library: StrLib
argString: "feedURL[, amount]"
author: Jose Diaz-Salcedo
authorEmail: bleachedbug@gmail.com
version: 2
cfVersion: CF6
shortDescription: Display rss feed.
description: |
 This UDF display's a rss feed to a web browser, in a readable format.

returnValue: Returns a query.

example: |
 <cfinclude template="rssfeedUdf.cfm">
 
 <cfset rssFeed = cfRssFeed("http://news.bbc.co.uk/rss/newsonline_uk_edition/front_page/rss.xml")>
 
 <font face="arial" size="2">
 <ul>
 <cfoutput query="rssFeed">
   <li><b><a href="#link#">#title#</a></b> - #description#</li><br>
 </cfoutput>
 </ul>
 </font>

args:
 - name: feedURL
   desc: RSS URL.
   req: true
 - name: amount
   desc: Restricts the amount of items returned. Defaults to number of items in the feed.
   req: false


javaDoc: |
 <!---
  Display rss feed.
  Changes by Raymond Camden and Steven (v2 support amount)
  
  @param feedURL      RSS URL. (Required)
  @param amount      Restricts the amount of items returned. Defaults to number of items in the feed. (Optional)
  @return Returns a query. 
  @author Jose Diaz-Salcedo (bleachedbug@gmail.com) 
  @version 2, November 20, 2008 
 --->

code: |
 <cffunction name="cfRssFeed" access="public" returntype="query" output=false>
     <cfargument name="feedUrl" type="string" required="true"/>
     <cfset var news_file = arguments.feedurl>
     <cfset var rss = "">
     <cfset var items = "">
     <cfset var rssItems = "">
     <cfset var i = "">
     <cfset var row = "">
     <cfset var title = "">
     <cfset var link = "">
     
     <cfhttp url="#news_file#" method="get" />
     
     <cfset rss = xmlParse(cfhttp.filecontent)>
 
     <cfset items = xmlSearch(rss, "/rss/channel/item")>
     <cfset rssItems = queryNew("title,description,link")>
 
     <cfloop from="1" to="#ArrayLen(items)#" index="i">
         <cfset row = queryAddRow(rssItems)>
         <cfset title = xmlSearch(rss, "/rss/channel/item[#i#]/title")>
 
         <cfif arrayLen(title)>
             <cfset title = title[1].xmlText>
         <cfelse>
             <cfset title="">
         </cfif>
 
         <cfset description = XMLSearch(items[i], "/rss/channel/item[#i#]/description")>
 
         <cfif ArrayLen(description)>
             <cfset description = description[1].xmlText>
         <cfelse>
             <cfset description="">
         </cfif>
 
         <cfset link = xmlSearch(items[i], "/rss/channel/item[#i#]/link")>
 
         <cfif arrayLen(link)>
             <cfset link = link[1].xmlText>
         <cfelse>
             <cfset link="">
         </cfif>
 
         <cfset querySetCell(rssItems, "title", title, row)>
         <cfset querySetCell(rssItems, "description", description, row)>
         <cfset querySetCell(rssItems, "link", link, row)>
 
     </cfloop>
 
     <cfreturn rssItems />
 
 </cffunction>

---

