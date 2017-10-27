---
layout: udf
title:  Decimal2Sexagesimal
date:   2002-04-23T12:25:29.000Z
library: MathLib
argString: "pCoordinate[, pCoordinatePart]"
author: Christopher Tackett
authorEmail: cflib@tackettproxy.com
version: 1
cfVersion: CF5
shortDescription: Converts a decimal Lat/Long coordinate into sexagesimal (degrees, minutes, seconds).
tagBased: false
description: |
 Returns a sexagesimal coordinate from a decimal coordinate representation.  Also will return just a part of the sexagesimal coordinate if requested.

returnValue: Returns a string.

example: |
 <cfoutput>
 #Decimal2Sexagesimal(34.3232123)#
 </cfoutput>

args:
 - name: pCoordinate
   desc: Decimal coordinate.
   req: true
 - name: pCoordinatePart
   desc: Coordinate part requested. Can be&#58; degree(s),minute(s),second(s)
   req: false


javaDoc: |
 /**
  * Converts a decimal Lat/Long coordinate into sexagesimal (degrees, minutes, seconds).
  * 
  * @param pCoordinate      Decimal coordinate. 
  * @param pCoordinatePart      Coordinate part requested. Can be: degree(s),minute(s),second(s) 
  * @return Returns a string. 
  * @author Christopher Tackett (cflib@tackettproxy.com) 
  * @version 1, April 23, 2002 
  */

code: |
 Function Decimal2Sexagesimal(pCoordinate) {
     var pCoordinatePart = "";
     var myDegrees = "";
     var myMinutes = "";
     var mySeconds = "";
     var retval = "";
     
     myDegrees = Int(pCoordinate);
     myMinutes = (pCoordinate - Int(pCoordinate)) * 60;
     mySeconds = (myMinutes - Int(myMinutes)) * 60;
     
     mySeconds = Round(mySeconds * 10000) / 10000;
     
     if (mySeconds eq 60) {
         myMinutes = myMinutes + 1;
         if (myMinutes eq 60) {
             myDegrees = myDegrees + 1;
             myMinutes = 0;
         }
         mySeconds = 0;
     }
     
     retval = myDegrees & chr(176) & " " & Int(myMinutes) & "' " & mySeconds & chr(34);
     
     if (ArrayLen(Arguments) gt 1) {
     
         pCoordinatePart = Arguments[2];
         
         if (pCoordinatePart eq "degree" or pCoordinatePart eq "degrees" or pCoordinatePart eq 1)
             retval = myDegrees;
         else if (pCoordinatePart eq "minute" or pCoordinatePart eq "minutes" or pCoordinatePart eq 2)
             retval = Int(myMinutes);
         else if (pCoordinatePart eq "second" or pCoordinatePart eq "seconds" or pCoordinatePart eq 3)
             retval = mySeconds;
             
     }
     
     return retval;
 
 }

oldId: 599
---

