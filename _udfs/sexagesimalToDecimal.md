---
layout: udf
title:  sexagesimalToDecimal
date:   2012-12-20T09:37:14.000Z
library: UtilityLib
argString: "latitude, latitudeRef, longitude, longitudeRef"
author: John Allen
authorEmail: jallen@figleaf.com
version: 1
cfVersion: CF9
shortDescription: Changes a sexagesimal latitude longitude co-ordinates to decimal format
tagBased: false
description: |
 Say you have a .jpg file and it has EXIF data with its location information. Sometimes the EXIF location information is in sexagesimal format which is hard to use in popular mapping libraries. This code puts the information into the more &quot;normal&quot; decimal lat/lng format. Ben Nadel was the inspiration for this, see: http://www.bennadel.com/index.cfm?event=blog.viewcode&amp;id=1832&amp;index=1

returnValue: A struct with keys longitude and latitude

example: |
 <cfimage action="read" source="c:\foo.jpg" name="img">
 <cfset exifTags = ImageGetEXIFMetaData(img)>
 
 <cfset coordinates = sexagesimalToDecimal(
     exifTags["GPS Latitude"],
     exifTags["GPS Latitude Ref"],
     exifTags["GPS Longitude"],
     exifTags[ "GPS Longitude Ref" ]
 )>
 <cfdump var="#coordinates#">

args:
 - name: latitude
   desc: Latitude in degrees/min/sec, using " and ' delimiters
   req: true
 - name: latitudeRef
   desc: N or S
   req: true
 - name: longitude
   desc: Longitude in degrees/min/sec, using " and ' delimiters
   req: true
 - name: longitudeRef
   desc: E or W
   req: true


javaDoc: |
 /**
  * Changes a sexagesimal latitude longitude co-ordinates to decimal format
  * v0.9 by John Allen
  * v1.0 by Adam Cameron (converted to script, changed return value to be a struct rather than a specially-formatted string)
  * 
  * @param latitude      Latitude in degrees/min/sec, using " and ' delimiters (Required)
  * @param latitudeRef      N or S (Required)
  * @param longitude      Longitude in degrees/min/sec, using " and ' delimiters (Required)
  * @param longitudeRef      E or W (Required)
  * @return A struct with keys longitude and latitude 
  * @author John Allen (jallen@figleaf.com) 
  * @version 1.0, December 20, 2012 
  */

code: |
 function sexagesimalToDecimal(latitude, latitudeRef, longitude, longitudeRef){
     var coordinates = {};
     var latitudeParts = listToArray(arguments.latitude, "'""");
     coordinates.latitude = (
         latitudeParts[1] +
         (latitudeParts[2] / 60) +
         (latitudeParts[3] / 3600)
     );
     if (arguments.latitudeRef == "S"){
         coordinates.latitude *= -1;
     }
 
     var longitudeParts = listToArray(arguments.longitude,"'""");
     coordinates.longitude = (
         longitudeParts[1] +
         (longitudeParts[2] / 60) +
         (longitudeParts[3] / 3600)
     );
     if (arguments.longitudeRef == "W"){
         coordinates.longitude *= -1;
     }
     return coordinates;
 }

---

