---
layout: udf
title:  GetFederalFiscalYear
date:   2002-07-02T13:18:54.000Z
library: DateLib
argString: "[date]"
author: Deanna Schneider
authorEmail: deanna.schneider@ces.uwex.edu
version: 1
cfVersion: CF5
shortDescription: Returns the Federal Fiscal Year for a given date.
description: |
 The Federal Fiscal year returned is the current year if the passed in date is before July 1, next year if after July 1. Defaults to current date if none is provided or if something other than a date is provided.

returnValue: Returns a numeric value.

example: |
 <cfoutput>
 #GetFederalFiscalYear()#<br>
 #GetFederalFiscalYear("6/1/02")#
 </cfoutput>

args:
 - name: date
   desc: Date to return the Federal Fiscal Year for.  Defaults to the current date.
   req: false


javaDoc: |
 /**
  * Returns the Federal Fiscal Year for a given date.
  * 
  * @param date      Date to return the Federal Fiscal Year for.  Defaults to the current date. (Optional)
  * @return Returns a numeric value. 
  * @author Deanna Schneider (deanna.schneider@ces.uwex.edu) 
  * @version 1, July 2, 2002 
  */

code: |
 function GetFederalFiscalYear() {
        var datetime = now();
        var month = month(datetime);
        if (ArrayLen(Arguments) gte 1) {
              if (IsDate(Arguments[1])) {
                    datetime = Arguments[1];
                    month = month(datetime);
              } else datetime = Now();
        }
        if (listfind("1,2,3,4,5,6", month)) 
          return Year(datetime);
        else 
          return  Year(DateAdd('yyyy', 1, datetime));
  }

---

