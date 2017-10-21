---
layout: udf
title:  LatLonDist
date:   2002-05-14T17:00:19.000Z
library: MathLib
argString: "lat1, lon1, lat2, lon2, units"
author: Tom Nunamaker
authorEmail: tom@toshop.com
version: 1
cfVersion: CF5
shortDescription: Calculates the distance between two latitudes and longitudes.
description: |
 Calculates the distance between two latitudes and longitudes.  Results can be in radians, kilometers, statute miles or nautical miles.  Handles the special cases of starting at either pole and checks for valid values.

returnValue: Returns a number or an error string.

example: |
 <cfoutput>
 Example:<br>
 Suppose point 1 is LAX: (33deg 57min N, 118deg 24min W)<br>
 Suppose point 2 is JFK: (40deg 38min N,  73deg 47min W)
 <p>
 
 <cfscript>
   Lat1 = 33.95;
   Lon1 = 118.4;
   Lat2 = 40.63333;
   Lon2 = 73.7833;
 </cfscript>
 
 Lat1 = #lat1#<br>
 Lon1 = #lon1#<br>
 Lat2 = #lat2#<br>
 Lon2 = #lon2#<br>
 
 Distance = #LatLonDist(lat1,lon1,lat2,lon2,'nm')# nautical miles<br>
 Distance = #LatLonDist(lat1,lon1,lat2,lon2,'sm')# statute miles<br>
 Distance = #LatLonDist(lat1,lon1,lat2,lon2,'km')# kilometers<br>
 Distance = #LatLonDist(lat1,lon1,lat2,lon2,'radians')# radians<br>
 </cfoutput>

args:
 - name: lat1
   desc: Latitude of the first point in degrees.
   req: true
 - name: lon1
   desc: Longitude of the first point in degrees.
   req: true
 - name: lat2
   desc: Latitude of the second point in degrees.
   req: true
 - name: lon2
   desc: Longitude of the second point in degrees.
   req: true
 - name: units
   desc: Unit to return distance in. Options are&#58; km (kilometers), sm (statute miles), nm (nautical miles), or radians. 
   req: true


javaDoc: |
 /**
  * Calculates the distance between two latitudes and longitudes.
  * This funciton uses forumlae from Ed Williams Aviation Foundry website at http://williams.best.vwh.net/avform.htm.
  * 
  * @param lat1      Latitude of the first point in degrees. (Required)
  * @param lon1      Longitude of the first point in degrees. (Required)
  * @param lat2      Latitude of the second point in degrees. (Required)
  * @param lon2      Longitude of the second point in degrees. (Required)
  * @param units      Unit to return distance in. Options are: km (kilometers), sm (statute miles), nm (nautical miles), or radians.  (Required)
  * @return Returns a number or an error string. 
  * @author Tom Nunamaker (tom@toshop.com) 
  * @version 1, May 14, 2002 
  */

code: |
 function LatLonDist(lat1,lon1,lat2,lon2,units)
 {
   // Check to make sure latitutdes and longitudes are valid
   if(lat1 GT 90 OR lat1 LT -90 OR
      lon1 GT 180 OR lon1 LT -180 OR
      lat2 GT 90 OR lat2 LT -90 OR
      lon2 GT 280 OR lon2 LT -280) {
     Return ("Incorrect parameters");
   }
 
   lat1 = lat1 * pi()/180;
   lon1 = lon1 * pi()/180;
   lat2 = lat2 * pi()/180;
   lon2 = lon2 * pi()/180;
   UnitConverter = 1.150779448;  //standard is statute miles
   if(units eq 'nm') {
     UnitConverter = 1.0;
   }
   
   if(units eq 'km') {
     UnitConverter = 1.852;
   }
   
   distance = 2*asin(sqr((sin((lat1-lat2)/2))^2 + cos(lat1)*cos(lat2)*(sin((lon1-lon2)/2))^2));  //radians
   
   if(units neq 'radians'){
     distance = UnitConverter * 60 * distance * 180/pi();
   }
   
   Return (distance) ;
 }

---

