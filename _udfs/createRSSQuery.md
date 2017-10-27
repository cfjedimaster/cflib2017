---
layout: udf
title:  createRSSQuery
date:   2005-08-25T11:49:46.000Z
library: StrLib
argString: "url"
author: Joe Nicora
authorEmail: joe@seemecreate.com
version: 1
cfVersion: CF6
shortDescription: Converts an RSS 0.9+ feed into a structure.
tagBased: true
description: |
 Converts an RSS 0.9+ feed into a structure. The structure contains meta information about the feed and a query of feed items.

returnValue: Returns a structure.

example: |
 <cfset myRSS = createRSSQuery("http://www.nicora.net/rss/blog/","feed") />
 
 <cfdump var="#myRSS#">

args:
 - name: url
   desc: URL to retrive.
   req: true


javaDoc: |
 <!---
  Converts an RSS 0.9+ feed into a structure.
  
  @param url      URL to retrive. (Required)
  @return Returns a structure. 
  @author Joe Nicora (joe@seemecreate.com) 
  @version 1, August 25, 2005 
 --->

code: |
 <cffunction name="createRSSQuery">
     /**
      * Converts an RSS 0.9+ feed into a query.
      * 
      * @param url              RSS feed url, must be valid RSS. (Required)
      * @param feedName          Name to give the feed's information returned as a structure. (Required)
      * @return                 Returns a query. 
      * @author                 Joe Nicora (joe@seemecreate.com) 
      * @version 1,             May 16, 2005 
      */
     <cfargument name="url" required="Yes" />
     
     <cfset var xmlText = "">
     <cfset var start = "">
     <cfset var end = "">
     <cfset var lenth = "">
     <cfset var xmlDoc = "">
     <cfset var myXMLDoc = "">
     <cfset var feedLen = "">
     <cfset var columnList = "title,description,link,pubDate">
     <cfset var result = structNew()>
     <cfset var row = "">
     <cfset var col = "">
         
     <cfhttp url="#url#" method="GET" resolveurl="false" /> 
     
     <cfscript>
         XMLText = cfhttp.fileContent;
         if (find("<?",XMLText)) {
             start = find("<?",XMLText);
             end = find("?>",XMLText);
             length = end - start;
             XMLText = right(XMLText,len(XMLText)-length);
         }
         XMLDoc = "<root>" & XMLText & "</root>";
         myXMLDoc = XMLParse(XMLDoc,false);
         feedLen = arrayLen(myXMLDoc.root.rss.channel.item);
         
         result.title = myXMLDoc.root.rss.channel.title.XMLText;
         result.description = myXMLDoc.root.rss.channel.description.XMLText;
         result.link = myXMLDoc.root.rss.channel.link.XMLText;
         
         result.feedQuery = queryNew(columnList);
         
         queryAddRow(result.feedQuery,feedLen);
         
         for (row=1; row LTE feedLen; row=row+1) {
             for (col=1; col LTE listLen(columnList); col=col+1) {
                 if (NOT col IS 4) 
                     querySetCell(result.feedQuery,listGetAt(columnList,col), myXMLDoc.root.rss.channel.item[row][listGetAt(columnList,col)].XMLText,row);
                 else
                     querySetCell(result.feedQuery,listGetAt(columnList,col),parseDateTime(myXMLDoc.root.rss.channel.item[row][listGetAt(columnList,col)].XMLText),row);
             }    
         }
         return result;
     </cfscript>
 </cffunction>

oldId: 1292
---

