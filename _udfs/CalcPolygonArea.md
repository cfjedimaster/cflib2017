---
layout: udf
title:  CalcPolygonArea
date:   2004-01-27T02:19:52.000Z
library: MathLib
argString: "data"
author: Tim Dudek
authorEmail: tim@igl.net
version: 1
cfVersion: CF5
shortDescription: Calculates the area of an irregular N sided Polygon.
tagBased: false
description: |
 Purpose = Calcuate the area of an N sided irregular polygon.
 Formula = Area = 1/2 * ((x1+x2)(y1-y2)+(x2+x3)(y2-y3)+...+(xn+x1)(yn-y1))
 Units = Units out are the same units as units in.
 Input = Array of X,Y points making up the polygon.  Array must have at least three items.

returnValue: Returns a number.

example: |
 <cfset p = arrayNew(1)>
 <cfset p[1] = structNew()>
 <cfset p[1].x = 0>
 <cfset p[1].y = 0>
 <cfset p[2] = structNew()>
 <cfset p[2].x = 5>
 <cfset p[2].y = 0>
 <cfset p[3] = structNew()>
 <cfset p[3].x = 5>
 <cfset p[3].y = 5>
 <cfset p[4] = structNew()>
 <cfset p[4].x = 0>
 <cfset p[4].y = 5>

args:
 - name: data
   desc: Array of structs
   req: true


javaDoc: |
 /**
  * Calculates the area of an irregular N sided Polygon.
  * 
  * @param data      Array of structs (Required)
  * @return Returns a number. 
  * @author Tim Dudek (tim@igl.net) 
  * @version 1, January 26, 2004 
  */

code: |
 function CalcPolygonArea(data) {
     var area = "0";
     var i = 1;
 
     // Check for valid Stucture with at least 3 records
     if(not isArray(data) or arrayLen(data) lte 2) return 0;
     
     data[arrayLen(data)+1] = structNew();
     data[arrayLen(data)].x = data[1].x;
     data[arrayLen(data)].y = data[1].y;
     
 
     // Loop through the structure performing the area calculation.
     // Formula = Area = 1/2 * ((x1+x2)(y1-y2)+(x2+x3)(y2-y3)+...+(xn+x1)(yn-y1))
     for(; i LT arrayLen(data) ; i=i+1) {
         area = area + ( data[i+1].x-data[i].x) * (data[i+1].y + data[i].y) / 2;
     }
     
     // Only return positive values.
     return abs(area);
 }

oldId: 1009
---

