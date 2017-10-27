---
layout: udf
title:  calculateArrivalDate
date:   2015-11-19T12:18:36.000Z
library: DateLib
argString: "[orderDate][, cutOffTime][, businessDays][, arrivalDays][, shippingLength][, holidayDays]"
author: Gary Stanton
authorEmail: gary@simianenterprises.co.uk
version: 1
cfVersion: CF10
shortDescription: Calculate arrival date for a package.
tagBased: true
description: |
 Calculate arrival date for a package, taking into account working days and publid holidays.

returnValue: Returns a struct.

example: |
 <cfscript>
     Variables.ShippingExamples.ShipOverChristmas = calculateArrivalDate(
             orderDate     = CreateDateTime(2015,12,24,16,0,0)
         ,    cutOffTime     = CreateTime(15, 0, 0)
         ,     businessDays       = '2,3,4,5,6'
         ,    arrivalDays        = '2,3,4,5,6'
         ,    shippingLength     = 2
         ,    holidayDays     = '1,359,360'
     );
 
     Variables.ShippingExamples.DeliverOnSaturday = calculateArrivalDate(
             orderDate    = CreateDateTime(2015,08,17,12,0,0)
         ,    cutOffTime     = CreateTime(15, 0, 0)
         ,     businessDays       = '2,3,4,5,6'
         ,    arrivalDays        = '7'
         ,    shippingLength     = 1
         ,    holidayDays     = '1,359,360'
     );
 
     Variables.ShippingExamples.NextDayBeforeCutOff = calculateArrivalDate(
             orderDate     = CreateDateTime(2015,08,20,12,0,0)
         ,    cutOffTime     = CreateTime(15, 0, 0)
         ,     businessDays       = '2,3,4,5,6'
         ,    arrivalDays        = '2,3,4,5,6'
         ,    shippingLength     = 1
         ,    holidayDays     = '1,359,360'
     );
 
     Variables.ShippingExamples.NextDayAfterCutOff = calculateArrivalDate(
             orderDate     = CreateDateTime(2015,08,20,16,0,0)
         ,    cutOffTime     = CreateTime(15, 0, 0)
         ,     businessDays       = '2,3,4,5,6'
         ,    arrivalDays        = '2,3,4,5,6'
         ,    shippingLength     = 1
         ,    holidayDays     = '1,359,360'
     );
 
     writeDump(Variables.ShippingExamples);
 </cfscript>

args:
 - name: orderDate
   desc: Date shipment is hoped to take place - i.e. the date an order is made. Defaults to now.
   req: false
 - name: cutOffTime
   desc: Cut off time for a shipment to occurr on the same day. Defaults to 3PM.
   req: false
 - name: businessDays
   desc: Days of the week (1 = Sunday) that may be considered a business day in this context. Defaults to 2,3,4,5,6.
   req: false
 - name: arrivalDays
   desc: Days of the week (1 = Sunday) that a package may be delivered in this context. Defaults to 2,3,4,5,6.
   req: false
 - name: shippingLength
   desc: Amount of time in days, expected for shipping to take. Defaults to 2.
   req: false
 - name: holidayDays
   desc: Ordinal days of the year on which holidays fall - list of numeric days. Defaults to 1,359,360.
   req: false


javaDoc: |
 <!---
  * Calculate arrival date for a package.
  *  
  * @param cutOffTime Cut off time for a shipment to occurr on the same day
  * @param businessDays Days of the week (1 = Sunday) that may be considered a business day in this context
  * @param arrivalDays Days of the week (1 = Sunday) that a package may be delivered in this context
  * @param shippingLength Amount of time in days, expected for shipping to take
  * @param holidayDays Ordinal days of the year on which holidays fall - list of numeric days
  * @return Returns a struct. 
  * @author Gary Stanton (gary@simianenterprises.co.uk) 
  * @version 1, November 19, 2015 
  --->

code: |
 <cffunction name="calculateArrivalDate" access="public" returnType="struct" output="false" hint="Returns information about the arrival of a shipment based on a shipping date and shipping length">
     <cfargument name="OrderDate"        type="date"     default="#Now()#"             hint="Date shipment is hoped to take place - i.e. the date an order is made" />
     <cfargument name="cutOffTime"         type="string"     default="#CreateTime(15, 0, 0)#"     hint="Cut off time for a shipment to occurr on the same day" />
     <cfargument name="businessDays"         type="string"     default="2,3,4,5,6"             hint="Days of the week (1 = Sunday) that may be considered a business day in this context" />
     <cfargument name="arrivalDays"         type="string"     default="2,3,4,5,6"             hint="Days of the week (1 = Sunday) that a package may be delivered in this context" />
     <cfargument name="shippingLength"    type="string"     default="2"                 hint="Amount of time in days, expected for shipping to take" />
     <cfargument name="holidayDays"        type="string"     default="1,359,360"             hint="Ordinal days of the year on which holidays fall - list of numeric days" />
 
     <cfscript>
         var ThisShippingDate     = Arguments.OrderDate;
         var ThisArrivalDate     = Arguments.OrderDate;
 
         // If the current ship date is past the cut off time, increment to the next day
         if (DatePart('h', ThisShippingDate) GT hour(Arguments.cutOffTime) OR (DatePart('h', ThisShippingDate) EQ hour(Arguments.cutOffTime) AND DatePart('n', ThisShippingDate) GTE minute(Arguments.cutOffTime))) {
             ThisShippingDate = CreateDateTime(Year(ThisShippingDate), Month(ThisShippingDate), Day(DateAdd('d', 1, ThisShippingDate)), 09, 00, 00);
         }
 
         // Check to see if the ship date is valid (business day and does not fall on a holiday)
         while (ListFind(Arguments.businessDays, dayOfWeek(ThisShippingDate)) EQ 0 OR ListFind(Arguments.holidayDays, dayOfYear(ThisShippingDate))) {
             ThisShippingDate = dateAdd("d", 1, ThisShippingDate);
         }
 
         // Set arrival date 
         ThisArrivalDate = ThisShippingDate;
 
         // Calculate the arrival date by incrementing the days by the shipping length, checking for non valid days as above
         for (i=1; i LTE Arguments.shippingLength; i=i+1) {
             // Increment arrival date
             ThisArrivalDate = dateAdd("d", 1, ThisArrivalDate);
 
             // Check to see if the arrival date is valid (arrival day and does not fall on a holiday)
             while (ListFind(Arguments.arrivalDays, dayOfWeek(ThisArrivalDate)) EQ 0 OR ListFind(Arguments.holidayDays, dayOfYear(ThisArrivalDate))) {
                 ThisArrivalDate = dateAdd("d", 1, ThisArrivalDate);
             }
         }
 
         // Remove times for results
         ThisShippingDate     = CreateDate(Year(ThisShippingDate), Month(ThisShippingDate), Day(ThisShippingDate));
         ThisArrivalDate     = CreateDate(Year(ThisArrivalDate), Month(ThisArrivalDate), Day(ThisArrivalDate));
 
 
         return {
                 OrderDate     = Arguments.OrderDate
             ,    ShippingDate     = ThisShippingDate
             ,    ArrivalDate     = ThisArrivalDate
             ,    ShippingLength     = dateDiff('d', ThisShippingDate, ThisArrivalDate)
             ,    DaysFromOrder    = dateDiff('d', CreateDate(Year(Arguments.OrderDate), Month(Arguments.OrderDate), Day(Arguments.OrderDate)), ThisArrivalDate)
         };
     </cfscript>
 </cffunction>

oldId: calculateArrivalDate
---

