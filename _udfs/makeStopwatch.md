---
layout: udf
title:  makeStopwatch
date:   2013-12-22T11:50:09.000Z
library: UtilityLib
argString: ""
author: Adam Cameron
authorEmail: dac.cfml@gmail.com
version: 1
cfVersion: CF10
shortDescription: Returns functions for recording a sequence of timed events
description: |
 Uses closure to maintain a timeline which start() / lap() / stop() functions can capture points in time to, with an annotation.

returnValue: A struct containing functions start(), lap(), stop()

example: |
 stopwatch = makeStopwatch();
 
 stopwatch.start("Begin timing");
 sleep(500);
 stopwatch.lap();
 sleep(1500);
 secondLap = stopwatch.lap("after another 1500ms");
 writeDump(var=secondLap, label="secondLap");
 sleep(2000);
 stopwatch.start("Stop timing");
 writeDump(var=stopWatch.getTimeline());

args:


javaDoc: |
 /**
  * Returns functions for recording a sequence of timed events
  * v1.0 by Adam Cameron
  * 
  * @return A struct containing functions start(), lap(), stop() 
  * @author Adam Cameron (dac.cfml@gmail.com) 
  * @version 1.0, December 22, 2013 
  */

code: |
 struct function makeStopwatch(){
     var timeline        = [];
 
     var lap = function(string message=""){
         var ticksNow    = getTickCount();
         var lapCount    = arrayLen(timeline);
         var lap            = {
             currentClock    = ticksNow,
             lapDuration        = lapCount > 0 ? ticksNow - timeLine[lapCount].currentClock : 0,
             totalDuration    = lapCount > 0 ? ticksNow - timeLine[1].currentClock : 0,
             message            = message
         };
         arrayAppend(timeline, lap);
         return lap;
     };
 
     return {
         start        = function(string message="start"){
             return lap(message);
         },
         lap            = function(string message="lap"){
             return lap(message);
         },
         stop        = function(string message="stop"){
             return lap(message);
         },
         getTimeline    = function(){
             return timeLine;
         }
     };
 }

---

