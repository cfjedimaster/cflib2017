---
layout: udf
title:  LatLonForCourseAndDistance
date:   2002-05-16T11:39:05.000Z
library: MathLib
argString: "lat1, lon1, tcl, d"
author: Tom Nunamaker
authorEmail: tom@toshop.com
version: 1
cfVersion: CF5
shortDescription: Calculates the latitude and longitude for a given latitude, longitude, true course and distance in nautical miles.
tagBased: false
description: |
 Calculates the latitude and longitude for a given latitude, longitude, true course and distance.  Calculates complete latitude and longitude for a given position, true course and distance in NAUTICAL MILES!

returnValue: Returns a string containing the latitude and longitude.

example: |
 <cfoutput>
 Example:<br>
 Suppose point 1 is LAX: (33deg 57min N, 118deg 24min W)<br>
 True course = 066 degrees<br>
 Distance = 100 Nautical Miles<br>
 
 Lat1 = 33.95  // calculated from: (33 + 57/60)<br>
 Lon1 = 118.4  // calculated from: (118 + 24/60)<br>
 <cfset pair = LatLonForCourseAndDistance(33.95,118.4,66,100)>
 #listfirst(pair)# = 34degrees 37min N<br>
 Lon = #listlast(pair)# = 116 degrees 33min W<br>
 </cfoutput>

args:
 - name: lat1
   desc: Latitude of the first point in degrees.
   req: true
 - name: lon1
   desc: Longitude of the first point in degrees.
   req: true
 - name: tcl
   desc: True course.
   req: true
 - name: d
   desc: Distance in nuatical miles from lat1/lon1.
   req: true


javaDoc: |
 /**
  * Calculates the latitude and longitude for a given latitude, longitude, true course and distance in nautical miles.
  * This function uses forumlae from Ed Williams Aviation Foundry website at http://williams.best.vwh.net/avform.htm.
  * 
  * @param lat1      Latitude of the first point in degrees. (Required)
  * @param lon1      Longitude of the first point in degrees. (Required)
  * @param tcl      True course. (Required)
  * @param d      Distance in nuatical miles from lat1/lon1. (Required)
  * @return Returns a string containing the latitude and longitude. 
  * @author Tom Nunamaker (tom@toshop.com) 
  * @version 1, May 16, 2002 
  */

code: |
 function LatLonForCourseAndDistance(lat1,lon1,tc,d) {
     var lat = 1;
     var lon = 1;
 
     tc = tc * pi() / 180;
     d = d * pi()/(180*60);
     lat1 = lat1 * pi()/180;
     lon1 = lon1 * pi()/180;  
     lat = asin(sin(lat1)*cos(d)+cos(lat1)*sin(d)*cos(tc));
   
     if (abs(lat) IS pi()/2) lon = lon1;
     else lon = properMod(lon1-asin(sin(tc)*sin(d)/cos(lat))+pi(),2*pi()) - pi() ;
 
     lat = lat * 180/pi();
     lon = lon * 180/pi();
     
     return lat & "," & lon;
 }

oldId: 505
---

