---
layout: udf
title:  InitialTrueCourse
date:   2002-05-14T17:05:09.000Z
library: MathLib
argString: "lat1, lon1, lat2, lon2"
author: Tom Nunamaker
authorEmail: tom@toshop.com
version: 1
cfVersion: CF5
shortDescription: Calculates the initial true course between two latitudes and longitudes.
description: |
 Calculates the initial true course between two latitudes and longitudes.

returnValue: Returns a number or an error string.

example: |
 <cfoutput>
 Example:<br>
 Suppose point 1 is LAX: (33deg 57min N, 118deg 24min W)<br>
 Suppose point 2 is JFK: (40deg 38min N,  73deg 47min W)<br>
 
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
 
 Initial True Course from lat1/lon1 = #Numberformat(InitialTrueCourse(lat1,lon1,lat2,lon2),'0.00')# Degrees True Course
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


javaDoc: |
 /**
  * Calculates the initial true course between two latitudes and longitudes.
  * 
  * @param lat1      Latitude of the first point in degrees. (Required)
  * @param lon1      Longitude of the first point in degrees. (Required)
  * @param lat2      Latitude of the second point in degrees. (Required)
  * @param lon2      Longitude of the second point in degrees. (Required)
  * @return Returns a number or an error string. 
  * @author Tom Nunamaker (tom@toshop.com) 
  * @version 1, May 14, 2002 
  */

code: |
 function InitialTrueCourse(lat1,lon1,lat2,lon2)
 {
   // Check to make sure latitutdes and longitudes are valid
   if(lat1 GT 90 OR lat1 LT -90 OR
      lon1 GT 180 OR lon1 LT -180 OR
      lat2 GT 90 OR lat2 LT -90 OR
      lon2 GT 280 OR lon2 LT -280) {
     Return ("Incorrect parameters");
   }
      
   // Calculate distance betweent the two points in radians
   d = LatLonDist(lat1,lon1,lat2,lon2,'radians');
 
 
   // Convert latitudes and longitudes to radians and set truc course to zero
   lat1 = lat1 * pi()/180;
   lon1 = lon1 * pi()/180;
   lat2 = lat2 * pi()/180;
   lon2 = lon2 * pi()/180;
   tc1 = 0;  
   
   // Handle the special cases of starting at the poles 
   if(lat1 IS pi()/2)
        Return ( 180 );    //  starting from noth pole
   if(lat1 IS -1*pi()/2)
        Return ( 360 );  //  starting from south pole
 
   
   if (sin(lon2 - lon1) LT 0)
     tc1 = acos((sin(lat2)-sin(lat1)*cos(d))/(sin(d)*cos(lat1)));
   else
     tc1 = 2*pi()-acos((sin(lat2)-sin(lat1)*cos(d))/(sin(d)*cos(lat1)));  
 
   Return ( tc1 * 180/pi() );
 }

---

