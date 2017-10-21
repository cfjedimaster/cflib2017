---
layout: udf
title:  createLocalisedDayOfWeekAsInteger
date:   2013-12-08T14:34:09.000Z
library: CFMLLib
argString: "locale[, iso]"
author: Adam Cameron
authorEmail: dac.cfml@gmail.com
version: 1
cfVersion: CF10
shortDescription: Returns a localised version of dayOfWeekAsInteger() (http&#58;//www.cflib.org/udf/dayOfWeekAsInteger)
description: |
 Improves dayOfWeekAsInteger() to be locale- and ISO-aware. Thanks to Simon Bingham, Duncan Cumming, Matt Bourke and James Moberg for inspiration for this.

returnValue: A function which performed localised dayOfWeekAsInteger() operations

example: |
 include "createLocalisedDayOfWeekAsInteger.cfm";
 
 LSDayOfWeekAsIntegerFR = createLocalisedDayOfWeekAsInteger("fr_fr");
 
 writeOutput("Dimanche is day of week: #LSDayOfWeekAsIntegerFR("dimanche")#");

args:
 - name: locale
   desc: The locale to use when localising the returned function
   req: true
 - name: iso
   desc: Whether to consider Sunday day 1 (default in CFML) or 7 (ISO standard)
   req: false


javaDoc: |
 /**
  * Returns a localised version of dayOfWeekAsInteger() (http://www.cflib.org/udf/dayOfWeekAsInteger)
  * v1.0 by Adam Cameron
  * 
  * @param locale      The locale to use when localising the returned function (Required)
  * @param iso      Whether to consider Sunday day 1 (default in CFML) or 7 (ISO standard) (Optional)
  * @return A function which performed localised dayOfWeekAsInteger() operations 
  * @author Adam Cameron (dac.cfml@gmail.com) 
  * @version 1.0, December 8, 2013 
  */

code: |
 function function createLocalisedDayOfWeekAsInteger(required string locale, boolean iso=false){
     var supportedLocales = SERVER.coldfusion.supportedLocales;
     if (!listFindNoCase(supportedLocales, locale)){
         throw(type="InvalidLocaleException", message="Invalid locale value specified", detail="Locale must be one of #supportedLocales#");
     }
     var baseDate = createDate(1972, 1, iso ? 31:30); // ie: in ISO mode, start on Mon. Otherwise CF mode: Sun
     var days = "";
     for (var i=0; i < 7; i++){
         days = listAppend(days, lsDateFormat(dateAdd("d", i, baseDate), "dddd", locale));
     }
 
     return function(required string day){
         var index = listFindNoCase(days, day);
         if (index){
             return index;
         }
         throw(type="ArgumentOutOfRangeException", message="Invalid day value", detail="day argument value (#day#) must be one of #days#");
     };
 }

---

