---
layout: udf
title:  WeightWatchersPoints
date:   2002-01-16T14:58:58.000Z
library: MathLib
argString: "calories, fat, fiber"
author: William Steiner
authorEmail: williams@hkusa.com
version: 1
cfVersion: CF5
shortDescription: Returns Weight Watchers Winning Points from calories, fat, and dietary fiber.
tagBased: false
description: |
 Function takes calories, fat grams, and grams of dierary fiber and returns the number of Weight Watchers Winning Points.

returnValue: Returns a number.

example: |
 <CFSET Cal=400>
 <CFSET Fat=3>
 <CFSET Fiber=1>
 
 <CFOUTPUT>
 A meal containing #Cal# calories, #Fat# gram(s) of fat, and #Fiber# gram(s) of fiber equals #WeightWatchersPoints(Cal,Fat,Fiber)# point(s).
 </CFOUTPUT>

args:
 - name: calories
   desc: Total number of calories (kcal) .
   req: true
 - name: fat
   desc: Total number of fat grams.
   req: true
 - name: fiber
   desc: Total grams of fiber.
   req: true


javaDoc: |
 /**
  * Returns Weight Watchers Winning Points from calories, fat, and dietary fiber.
  * 
  * @param calories      Total number of calories (kcal) . 
  * @param fat      Total number of fat grams. 
  * @param fiber      Total grams of fiber. 
  * @return Returns a number. 
  * @author William Steiner (williams@hkusa.com) 
  * @version 1, January 16, 2002 
  */

code: |
 function WeightWatchersPoints(calories,fat,fiber) {
   if (fiber gte 4)
     fiber = 4;
   return Int((calories - (fiber * 10) ) / 50 + fat / 12 + 0.5);
 }

oldId: 466
---

