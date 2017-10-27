---
layout: udf
title:  getHaversineDistance
date:   2013-01-08T08:40:22.000Z
library: MathLib
argString: "lat1, lon1, lat2, lon2[, units]"
author: Henry Ho
authorEmail: henryho167@gmail.com
version: 0
cfVersion: CF9
shortDescription: Calculates distance between Latitude/Longitude points using haversine formula.
tagBased: false
description: |
 Calculates distance between Latitude/Longitude points using haversine formula : http://www.movable-type.co.uk/scripts/latlong.html

returnValue: Returns numeric distance between the two points. Units varies, default is miles.

example: |
 #getDistance(1, 1, 2, 2)#

args:
 - name: lat1
   desc: latitude of first point
   req: true
 - name: lon1
   desc: longitude of first point
   req: true
 - name: lat2
   desc: latitude of second point
   req: true
 - name: lon2
   desc: longitude of second point
   req: true
 - name: units
   desc: Units for return value. Default is miles.
   req: false


javaDoc: |
 /**
  * Calculates distance between Latitude/Longitude points using haversine formula.
  * 
  * @param lat1      latitude of first point (Required)
  * @param lon1      longitude of first point (Required)
  * @param lat2      latitude of second point (Required)
  * @param lon2      longitude of second point (Required)
  * @param units      Units for return value. Default is miles. (Optional)
  * @return Returns numeric distance between the two points. Units varies, default is miles. 
  * @author Henry Ho (henryho167@gmail.com) 
  * @version 0, January 8, 2013 
  */

code: |
 function getDistance(lat1, lon1, lat2, lon2, units = 'miles')
 {
     // earth's radius. Default is miles.
     var radius = 3959;
     if (arguments.units EQ 'kilometers' )
         radius = 6371;
     else if (arguments.units EQ 'feet')
         radius = 20903520;
     
     var toRad = pi() / 180;
     var dLat = (lat2-lat1) * toRad;
     var dLon = (lon2-lon1) * toRad; 
     var a = sin(dLat/2)^2 + cos(lat1 * toRad) * cos(lat2 * toRad) * sin(dLon/2)^2; 
     var c = 2 * createObject("java","java.lang.Math").atan2(sqr(a), sqr(1-a));
     
     return radius * c;
 }

oldId: 2115
---

