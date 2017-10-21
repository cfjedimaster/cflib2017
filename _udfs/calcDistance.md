---
layout: udf
title:  calcDistance
date:   2011-07-29T02:45:12.000Z
library: MathLib
argString: "startNorth, startEast, endNorth, endEast[, returnAsMiles]"
author: Sigi Heckl
authorEmail: siegfried.heckl@siemens.com
version: 2
cfVersion: CF9
shortDescription: Calculate direct distance and angle between two decimal coordinates.
description: |
 Calculate distance, angle and reverse angle between two given points.
 The necessary coordinates you can get i.e. from google maps with right mouse click and &quot;what's here&quot;

returnValue: Returns a struct.

example: |
 <cfdump var="#calcDistance(48.77945118259754,11.43625259399414,49.631750626493364,11.039199829101562)#">

args:
 - name: startNorth
   desc: Start point Latitude
   req: true
 - name: startEast
   desc: Start point Longitude
   req: true
 - name: endNorth
   desc: End point Latitude
   req: true
 - name: endEast
   desc: End point Longitude
   req: true
 - name: returnAsMiles
   desc: Boolean value that forces the return to be miles.
   req: false


javaDoc: |
 <!---
  Calculate direct distance and angle between two decimal coordinates.
  v2 update by Mike G.
  
  @param startNorth      Start point Latitude (Required)
  @param startEast      Start point Longitude (Required)
  @param endNorth      End point Latitude (Required)
  @param endEast      End point Longitude (Required)
  @param returnAsMiles      Boolean value that forces the return to be miles. (Optional)
  @return Returns a struct. 
  @author Sigi Heckl (siegfried.heckl@siemens.com) 
  @version 2, July 28, 2011 
 --->

code: |
 <cffunction name="calcDistance" access="private" output="false"
 returntype="struct" hint="calculate distance between coordinates">
  <cfargument name="startLat" required="true" type="string"
 hint="Start point Latitude (Dezimalschreibweise!)" />
  <cfargument name="startLon"  required="true" type="string"
 hint="Start point Longitude (Dezimalschreibweise!)" />
  <cfargument name="endLat"   required="true" type="string" hint="End
 point Latitude (Dezimalschreibweise!)" />
  <cfargument name="endLon"    required="true" type="string" hint="End
 point Longitude (Dezimalschreibweise!)" />
  <cfargument name="returnAsMiles" required="no" type="boolean"
 hint="True returns as US Miles, otherwise return is in kilometers">
 
  <cfset var strResult = { distance='0', angle='0', revAngle='0' } />
  <cfset var RADIUS    = 6371 />
  <cfset var rs     = structNew() />
 
  <cfset rs.a     = (90-arguments.startLat) * Pi() / 180 />
  <cfset rs.b     = (90-arguments.endLat)   * Pi() / 180 />
  <cfset rs.gamma = abs(arguments.endLon-arguments.startLon) * Pi() / 180 />
  <cfset rs.c     = aCos(cos(rs.a) * cos(rs.b) + sin(rs.a) * sin(rs.b)
 * cos(rs.gamma)) />
  <cfset rs.s     = (rs.a + rs.b + rs.c) / 2 />
  <cfif arguments.startLon EQ arguments.endLon>
      <cfif arguments.startLat LT arguments.endLat>
          <cfset rs.alpha = Pi() />
          <cfset rs.beta  = 0 />
        <cfelse>
          <cfset rs.alpha = Pi() />
          <cfset rs.beta  = Pi() />
      </cfif>
    <cfelse>
      <cfset rs.alpha = aCos((cos(rs.a) - cos(rs.b)*cos(rs.c)) /
 (sin(rs.c)*sin(rs.b))) />
      <cfset rs.beta  = aCos((cos(rs.b) - cos(rs.c)*cos(rs.a)) /
 (sin(rs.c)*sin(rs.a))) />
  </cfif>
 
  <cfset rs.e  = rs.alpha + rs.beta + rs.gamma - Pi() />
  <cfset rs.A  = RADIUS * RADIUS * rs.e />
  <cfset rs.ss = (rs.alpha + rs.beta + rs.gamma) / 2 />
  <cfset rs.ka = rs.a * RADIUS />
  <cfset rs.kb = rs.b * RADIUS />
  <cfset rs.kc = rs.c * RADIUS />
  <cfif rs.beta NEQ 0>
      <cfset rs.bearing = 360 - (rs.beta * 180 / Pi()) />
    <cfelse>
      <cfset rs.bearing = 0 />
  </cfif>
  <cfset rs.revbearing = (rs.alpha * 180 / Pi()) />
 
  <cfif (arguments.endLon-arguments.startLon GT 0) OR
        ((arguments.endLon EQ arguments.startLon) AND
 (arguments.endLat LT arguments.startLat))>
    <cfset rs.bearing    = 360 - rs.bearing />
    <cfset rs.revbearing = 360 - rs.revbearing />
  </cfif>
 
  <cfset rs.kc         = round(1000* rs.kc)/1000 />
  <cfset rs.bearing    = round(100 * rs.bearing) / 100 />
  <cfset rs.revbearing = round(100 * rs.revbearing) / 100 />
 
  <cfset strResult.distance  = rs.kc / >
  <cfif structkeyexists(arguments,"returnAsMiles") and arguments.returnAsMiles>
        <cfset strResult.distance  = rs.kc*0.621371192 / >
  </cfif>
  <cfset strResult.angle     = rs.bearing / >
  <cfset strResult.revAngle  = rs.revbearing / >
 
  <cfreturn strResult>
 </cffunction>

---

