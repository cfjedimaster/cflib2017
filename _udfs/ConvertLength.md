---
layout: udf
title:  ConvertLength
date:   2002-04-23T12:16:52.000Z
library: MathLib
argString: "numberValue, convertFrom, convertTo"
author: Seth Duffey
authorEmail: sduffey@ci.davis.ca.us
version: 1
cfVersion: CF5
shortDescription: Convert bewteen standard and metric lengths.
description: |
 Convert bewteen standard and metric lengths. Convert between any of these lengths: Inch, Foot, Yard, Mile, Millimeter, Centimeter, Meter, Kilometer.

returnValue: Returns a numeric value.

example: |
 <cfoutput>
 7 miles is #ConvertLength("7","mile","centimeter")# centimeters.
 </cfoutput>

args:
 - name: numberValue
   desc: Value to be converted.
   req: true
 - name: convertFrom
   desc: Type of unit to convert from.
   req: true
 - name: convertTo
   desc: Type of unit to convert to.
   req: true


javaDoc: |
 /**
  * Convert bewteen standard and metric lengths.
  * 
  * @param numberValue      Value to be converted. 
  * @param convertFrom      Type of unit to convert from. 
  * @param convertTo      Type of unit to convert to. 
  * @return Returns a numeric value. 
  * @author Seth Duffey (sduffey@ci.davis.ca.us) 
  * @version 1, April 23, 2002 
  */

code: |
 function ConvertLength(NumberValue,ConvertFrom,ConvertTo) {
     var ValuesArray = ArrayNew(1);
     var LookupArray = ArrayNew(2);
     var i = 1;
     var ii = 1;
     var GetMultiplier = 1;
     
     /* Set Convertions Values */
     ValuesArray[1] = "Inch,Foot,Yard,Mile,Millimeter,Centimeter,Meter,Kilometer";
     ValuesArray[2] = "1,12,36,63360,1/25.4,1/2.54,1/0.0254,1/0.0000254";
     ValuesArray[3] = "1/12,1,3,5280,1/304.8,1/30.48,1/0.3048,1/0.0003048";
     ValuesArray[4] = "1/36,1/3,1,1760,1/914.4,1/91.44,1/0.9144,1/0.0009144";
     ValuesArray[5] = "1/63360,1/5280,1/1760,1,1/1609334,1/160934.4,1/1609.344,1/1.609344";
     ValuesArray[6] = "25.4,304.8,914.4,1609334,1,10,1000,1000000";
     ValuesArray[7] = "2.54,30.48,91.44,160934.4,1/10,1,100,100000";
     ValuesArray[8] = "0.0254,0.3048,0.9144,1609.344,1/1000,1/100,1,1000";
     ValuesArray[9] = "0.0000254,0.0003048,0.0009144,1.609344,1/1000000,1/100000,1/1000,1";
     
     /* Populate Lookup Array */
     for (i=1; i LTE ArrayLen(ValuesArray); i=i+1)
     {
         for (ii=1; ii LTE ListLen(ValuesArray[i],","); ii=ii+1)
         LookupArray[i][ii]= ListGetAt(ValuesArray[i],ii,",");
     }
 /* Find Multiplier and Calculate Result */
     ConvertFrom = ListFindNoCase(ValuesArray[1],ConvertFrom,",");
     ConvertTo = ListFindNoCase(ValuesArray[1],ConvertTo,",");
     GetMultiplier = LookupArray[ConvertFrom+1][ConvertTo];
     return NumberValue/evaluate(GetMultiplier);
 }

---

