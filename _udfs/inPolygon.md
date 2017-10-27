---
layout: udf
title:  inPolygon
date:   2010-10-22T14:20:33.000Z
library: MathLib
argString: "[polygonXCoordinates][, polygonYCoordinates][, pointX][, pointY]"
author: John Allen
authorEmail: jallen@figleaf.com
version: 1
cfVersion: CF6
shortDescription: I check if a point is inside of a polygon.
tagBased: true
description: |
 I check if the passed in pointX and pointY are inside of a the passed in polygon coordinates.

returnValue: Returns a boolean.

example: |
 <!--- make a default polygon to check --->
 <cfset polygon.lat = "30.464963912963867,29.508148193359375,29.409507751464844,29.626457214355469,30.387109756469727,30.566728591918945,30.464963912963867" />
 <cfset polygon.lng = "-93.00372314453125,-92.795021057128906,-91.590370178222656,-91.192977905273438,-90.977210998535156,-91.946044921875,-93.00372314453125" />
 
 <!--- this will hold an array of struct of x,y's: the points to check --->
 <cfset pointsToCheck = arrayNew(1)>
 <cfset arrayAppend(pointsToCheck, {x = 29.899167, y = -92.068333}) />
 <cfset arrayAppend(pointsToCheck, {x = 29.706304, y = -91.459392}) />
 <cfset arrayAppend(pointsToCheck, {x = 30.460833, y = -92.530556}) />
 <cfset arrayAppend(pointsToCheck, {x = 36.460833, y = -81.530556}) />
 
 <cfoutput>
 <cfloop array="#pointsToCheck#" index="x">
     #inPolygon(polygon.lat, polygon.lng, x.x, x.y)#<br />
 </cfloop>
 </cfoutput>

args:
 - name: polygonXCoordinates
   desc: I am a list of X coordinates that make the polygon. I default to an empty string.
   req: false
 - name: polygonYCoordinates
   desc: I am a list of Y coordinates that make the polygon. I default to an empty string.
   req: false
 - name: pointX
   desc: I am the x coordinate of the point to check. I default to an empty string.
   req: false
 - name: pointY
   desc: I am the y coordinate of the point to check.  I default to an empty string.
   req: false


javaDoc: |
 <!---
  I check if a point is inside of a polygon.
  
  @param polygonXCoordinates      I am a list of X coordinates that make the polygon. I default to an empty string. (Optional)
  @param polygonYCoordinates      I am a list of Y coordinates that make the polygon. I default to an empty string. (Optional)
  @param pointX      I am the x coordinate of the point to check. I default to an empty string. (Optional)
  @param pointY      I am the y coordinate of the point to check.  I default to an empty string. (Optional)
  @return Returns a boolean. 
  @author John Allen (jallen@figleaf.com) 
  @version 1, October 22, 2010 
 --->

code: |
 <cffunction name="inPolygon" output="false" returntype="boolean" access="public" 
     displayname="In Polygon" hint="I check if a point is inside of a polygon."
     description="I check if the passed in pointX and pointY are inside of a the passed in polygon coordinates.">
     
     <cfargument name="polygonXCoordinates" type="any" default=""
         hint="I am a list of X coordinates that make the polygon. I default to an empty string." />
     <cfargument name="polygonYCoordinates" type="any" default=""
         hint="I am alist of Y coordinates that make the polygon. I default to an empty string." />
     <cfargument name="pointX" type="any" default=""
         hint="I am the x coordinate of the point to check. I default to an empty string." />
     <cfargument name="pointY" type="any" default=""
         hint="I am the y coordinate of the point to check.  I default to an empty string." />
     
     <cfset var polygon = createObject("java", "java.awt.Polygon").init() />
     <cfset var x = 0 />
     
     <cfif listLen(arguments.polygonXCoordinates) neq listLen(arguments.polygonYCoordinates)>
         <cfthrow message="The lenght of the x and y coordinates lists, used to build the Polygon, are not the same length." />
     </cfif>
     
     <!--- create the polygon object --->
     <cfloop from="1" to="#listLen(arguments.polygonXCoordinates)#" index="x">
         <cfset polygon.addPoint(
                         javaCast('int', listGetAt(arguments.polygonXCoordinates, x)), 
                         javaCast('int', listGetAt(arguments.polygonYCoordinates, x))) />
     </cfloop>
     
     <!--- check if the supplied x/y point is in the polygon --->
     <cfreturn polygon.contains(
                         javaCast('int', arguments.pointX), 
                         javaCast('int', arguments.pointY)) />
 </cffunction>

oldId: 2086
---

