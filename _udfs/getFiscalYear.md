---
layout: udf
title:  getFiscalYear
date:   2010-03-07T05:28:49.000Z
library: DateLib
argString: "[date]"
author: Bob Clingan
authorEmail: bob@bobclingan.com
version: 0
cfVersion: CF5
shortDescription: Returns fiscal year for a date
tagBased: false
description: |
 Returns the fiscal year for date. If no date is provided, year returned is based on the current timestamp.

returnValue: Returns a number

example: |
 currentFY= getFiscalYear();
 currentFY= getFiscalYear(datetime=createdate(2009,10,1));

args:
 - name: date
   desc: valid date to determine fiscal year for
   req: false


javaDoc: |
 /**
  * Returns fiscal year for a date
  * 
  * @param date      valid date to determine fiscal year for (Optional)
  * @return Returns a number 
  * @author Bob Clingan (bob@bobclingan.com) 
  * @version 0, March 6, 2010 
  */

code: |
 function GetFiscalYear() {
         var datetime = now();
         var month = month(datetime);
         if (ArrayLen(Arguments) gte 1) {
         if (IsDate(Arguments[1])) {
             datetime = Arguments[1];
             month = month(datetime);
         } else datetime = Now();
         }
         if(month gte 10)
             return Year(DateAdd('yyyy', 1, datetime));
         else
            return Year(datetime);
     }

oldId: 2015
---

