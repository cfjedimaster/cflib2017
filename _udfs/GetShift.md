---
layout: udf
title:  GetShift
date:   2002-12-17T16:22:14.000Z
library: DateLib
argString: "Date, StartDate, Sequence"
author: Rob Rusher
authorEmail: rob@robrusher.com
version: 2
cfVersion: CF5
shortDescription: Returns the work shift for a sequence based work schedule.
tagBased: false
description: |
 Returns the work shift for a sequence based work schedule. Mostly used by public organizations such as fire and police depts.

returnValue: Returns a string.

example: |
 <cfoutput>
 Today's shift: #GetShift(Now(), "12/31/2001", "B,A,C,A,C,B,C,B,A", 9)#
 </cfoutput>

args:
 - name: Date
   desc: Date to return the shift for.
   req: true
 - name: StartDate
   desc: Start date of the sequence.
   req: true
 - name: Sequence
   desc: Comma delimited list defining the shift sequence.
   req: true


javaDoc: |
 /**
  * Returns the work shift for a sequence based work schedule.
  * v2 by Raymond Camden
  * 
  * @param Date      Date to return the shift for. (Required)
  * @param StartDate      Start date of the sequence. (Required)
  * @param Sequence      Comma delimited list defining the shift sequence. (Required)
  * @return Returns a string. 
  * @author Rob Rusher (rob@robrusher.com) 
  * @version 2, December 17, 2002 
  */

code: |
 function GetShift(date, startDate, sequence) {
   var daysDiff = DateDiff("d",startDate,date);
   var key = daysDiff mod listLen(sequence) + 1;
   return listGetAt(sequence,key);
 }

oldId: 653
---

