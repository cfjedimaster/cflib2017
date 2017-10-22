---
layout: udf
title:  DaysTilChristmas
date:   2002-10-04T16:44:50.000Z
library: DateLib
argString: ""
author: Larry Juncker
authorEmail: ljuncker@aljcompserv.com
version: 2
cfVersion: CF5
shortDescription: Returns an integer of the days left before Christmas.
tagBased: false
description: |
 Returns the number of days left before Christmas day of the current year. If Christmas has passed, returns the number of days till next year's Christmas.

returnValue: Returns a number.

example: |
 <cfoutput>Are you Ready?  ONLY #DaysTillChristmas()# days till Christmas!</cfoutput>

args:


javaDoc: |
 /**
  * Returns an integer of the days left before Christmas.
  * Version 2 by Ken McCafferty
  * 
  * @return Returns a number. 
  * @author Larry Juncker (ljuncker@aljcompserv.com) 
  * @version 2, October 4, 2002 
  */

code: |
 function DaysTillChristmas() {
     var ChristmasDayOfYearThisYear =
 DayofYear(CreateDate(Year(Now()),12,25));
     var ChristmasDayOfYearNextYear =
 DayofYear(CreateDate(Year(Now()) + 1,12,25));
     var TodaysDayOfYear = DayofYear(Now());
     var DaysThisYear=DaysInYear(Now());
       //Christmas coming
     if (ChristmasDayOfYearThisYear gt TodaysDayOfYear){
        return ChristmasDayOfYearThisYear -
 TodaysDayOfYear;
     }
      //Christmas has passed
     if (TodaysDayOfYear gt ChristmasDayOfYearThisYear){
      return DaysThisYear-TodaysDayOfYear +
 ChristmasDayOfYearNextYear;
     }
         
     return 0;
 }

---

