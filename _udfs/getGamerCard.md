---
layout: udf
title:  getGamerCard
date:   2007-01-18T15:30:11.000Z
library: UtilityLib
argString: "tag"
author: Raymond Camden
authorEmail: ray@camdenfamily.com
version: 1
cfVersion: CF7
shortDescription: This function will return information about a user's XBox Live status.
tagBased: true
description: |
 This function will return information about a user's XBox Live status. This includes their XBox Live level, gamer image, score, and past games.

returnValue: Returns a structure.

example: |
 <cfdump var="#getGamerCard('cfjedimaster')#">
 <cfdump var="#getGamerCard('boyzoid')#">

args:
 - name: tag
   desc: Username for the account.
   req: true


javaDoc: |
 <!---
  This function will return information about a user's XBox Live status.
  
  @param tag      Username for the account. (Required)
  @return Returns a structure. 
  @author Raymond Camden (ray@camdenfamily.com) 
  @version 1, January 18, 2007 
 --->

code: |
 <cffunction name="getGamerCard" output="false" returnType="struct">
     <cfargument name="tag" type="string" required="true">
     <cfset var result = structNew()>
     <cfset var theURL = "http://gamercard.xbox.com/#arguments.tag#.card">
     <cfset var httpResult = "">
     <cfset var gameblock = "">
     <cfset var foundImg = "">
     <cfset var img = "">
     <cfset var title = "">
     
     <cfset result.games = arrayNew(1)>
         
     <cfhttp url="#theURL#" result="httpResult">
     <cfset httpResult = httpResult.fileContent>
     
     <!--- first get the xboxlive level --->
     <cfset result.level = rereplace(httpResult, ".*XbcGamertag(.*?)"".*", "\1")>
     
     <!--- get gamertile --->
     <cfset result.gamertileimg = rereplace(httpResult, ".*(<img class=""XbcgcGamertile"" .*?>).*","\1")>
     <cfset result.gamertileimg = rereplace(result.gamertileimg, ".*src=""(.*?)"".*", "\1")>
 
     <!--- set url --->
     <cfset result.memberurl = "http://live.xbox.com/member/#arguments.tag#">
     
     <!--- gamer scope pattern:
     <img alt="Gamerscore" src="/xweb/lib/images/G_Icon_External.gif" /></span><span class="XbcFRAR">3095</span>
     --->
     <cfset result.gamerscore = rereplace(httpResult,".*<img alt=""Gamerscore"".*?<span class=""XbcFRAR"">([0-9]+).*","\1")>
 
     <!--- get ths block of links/images for recent games --->
     <cfset gameblock = rereplace(httpResult, ".*<div class=""XbcgcGames"">(.*?)</div>.*", "\1")>
     <cfset foundImg = reFind("<img", gameblock)>
     <!--- get all images in this block --->
     <cfloop condition="foundImg">
         <cfset img = reFindNoCase("(<img.*?>)",gameblock,1,1)>
         <cfif img.pos[1] gte 1>
             <cfset imgStr = mid(gameblock, img.pos[1], img.len[1])>
             <!--- now get the title --->
             <cfset title = rereplace(imgstr, ".*title=""(.*?)"".*", "\1")>
             <cfset arrayAppend(result.games, title)>
             <cfset gameblock = replace(gameblock, imgstr, "")>            
             <cfset foundImg = reFind("<img", gameblock)>
         </cfif>
     </cfloop>
     
     <cfreturn result>
     
 </cffunction>

oldId: 1625
---

