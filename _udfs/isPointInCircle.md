---
layout: udf
title:  isPointInCircle
date:   2006-04-20T12:05:21.000Z
library: MathLib
argString: "pointX, pointY, circleX, circleY, circleRadius"
author: Keith Westcott
authorEmail: kaw4@york.ac.uk
version: 1
cfVersion: CF5
shortDescription: Determines if a point lies within a circle.
description: |
 Calculates whether the point pointX,pointY lies in or on the circumfrence of the circle at centre circleX,circleY of radius circleRadius.

returnValue: Returns a boolean.

example: |
 <cfif isPointInCircle(10, 10, 15, 15, 5)>
     <cfoutput>Point is in circle</cfoutput>
 <cfelse>
     <cfoutput>Point is NOT in circle.</cfoutput>
 </cfif>

args:
 - name: pointX
   desc: X value of point.
   req: true
 - name: pointY
   desc: Y value of point.
   req: true
 - name: circleX
   desc: X value of center of circle.
   req: true
 - name: circleY
   desc: Y value of center of circle.
   req: true
 - name: circleRadius
   desc: Radius of circle.
   req: true


javaDoc: |
 /**
  * Determines if a point lies within a circle.
  * 
  * @param pointX      X value of point. (Required)
  * @param pointY      Y value of point. (Required)
  * @param circleX      X value of center of circle. (Required)
  * @param circleY      Y value of center of circle. (Required)
  * @param circleRadius      Radius of circle. (Required)
  * @return Returns a boolean. 
  * @author Keith Westcott (kaw4@york.ac.uk) 
  * @version 1, April 20, 2006 
  */

code: |
 function isPointInCircle (pointX, pointY, circleX, circleY, circleRadius) {
     var dx = (circleX - pointX);
     var dy = (circleY - pointY);
     return (dx * dx + dy * dy) LTE circleRadius * circleRadius;
 }

---

