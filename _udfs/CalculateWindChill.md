---
layout: udf
title:  CalculateWindChill
date:   2001-08-22T18:26:41.000Z
library: ScienceLib
argString: "intAirTemperature, intWindSpeed"
author: Russel Madere
authorEmail: rmadere@turbosquid.com
version: 1
cfVersion: CF5
shortDescription: This function calculates the wind chill based upon the new NWS Wind Chill Index calculations.
description: |
 This function calculates the wind chill based upon the new NWS Wind Chill Index calculations.
         
 Source: http://www.crh.noaa.gov/dmx/0winter/new_windchill.html
         
 According to the documentation, this new cacluation will:
 <UL>
 <LI>Use wind speed calculated at 5 feet (average human face height)
 <LI>Be based upon a human face model
 <LI>Incorporate modern heat flow theory
 <LI>Lower the calm wind threshold to 3 mph
 <LI>Use a consistant standard for skin tissue resistance
 <LI>Assume the worst case for solar radiation (clear night sky)
 </UL>

returnValue: Returns the wind chill.

example: |
 <cfset VARIABLES.intFahrenheit = 35>
 <cfset VARIABLES.intWindSpeed = 30>
 The Wind Chill is <cfoutput>#CalculateWindChill(VARIABLES.intFahrenheit, VARIABLES.intWindSpeed)#</cfoutput> degrees Fahrenheit.<br>

args:
 - name: intAirTemperature
   desc: Temperature
   req: true
 - name: intWindSpeed
   desc: Wind speed in MPH
   req: true


javaDoc: |
 /**
  * This function calculates the wind chill based upon the new NWS Wind Chill Index calculations.
  * 
  * @param intAirTemperature      Temperature 
  * @param intWindSpeed      Wind speed in MPH 
  * @return Returns the wind chill. 
  * @author Russel Madere (rmadere@turbosquid.com) 
  * @version 1, August 22, 2001 
  */

code: |
 function CalculateWindChill(intAirTemperature, intWindSpeed)
 {
 
     return Round(35.74 + (0.6215 * intAirTemperature) - (35.75 * (intWindSpeed ^ 0.16)) + (0.4275 * intAirTemperature * (intWindSpeed ^ 0.16)));
 
 }

---

