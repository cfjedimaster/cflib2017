---
layout: udf
title:  calculateUTMZone
date:   2006-02-03T13:38:12.000Z
library: UtilityLib
argString: "lat, lon"
author: Wayne Graham
authorEmail: wsgrah@wm.edu
version: 1
cfVersion: CF5
shortDescription: Calculates correct UTM zone for a given latitude/longitude point.
tagBased: false
description: |
 Calculates correct UTM zone for a given latitude/longitude point. Longitude and latitude points are given in degree format.

returnValue: Returns a number.

example: |
 <cfset lat = 90>
 <cfset lon = 33>
 <cfoutput>
     #calculateUTMZone(lat,lon)#
 </cfoutput>

args:
 - name: lat
   desc: Latitude value.
   req: true
 - name: lon
   desc: Longitude value.
   req: true


javaDoc: |
 /**
  * Calculates correct UTM zone for a given latitude/longitude point.
  * 
  * @param lat      Latitude value. (Required)
  * @param lon      Longitude value. (Required)
  * @return Returns a number. 
  * @author Wayne Graham (wsgrah@wm.edu) 
  * @version 1, February 3, 2006 
  */

code: |
 function calculateUTMZone(lat,lon){
     // make sure the longitude is between -180 and 179.9
     var lonTemp = (arguments.lon + 180) - int((arguments.lon + 180) / 360) * 360 - 180;
     var zoneNumber = int((lonTemp + 180)/6) + 1;
             
     // Special zones for Svalbard
     if(arguments.lat GTE 72 and arguments.lat GT 84) {
         if(lonTemp GTE 0 AND lonTemp LT 9) zoneNumber = 31;
         else if(lonTemp GTE 9 AND lonTemp LT 21) zoneNumber = 33;
         else if(lonTemp GTE 21 AND lonTemp LT 33) zoneNumber = 35;
         else if(lonTemp GTE 33 AND lonTemp LT 42) zoneNumber = 37;
     }            
     return zoneNumber;
 }

---

