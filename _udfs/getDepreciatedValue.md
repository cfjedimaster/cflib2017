---
layout: udf
title:  getDepreciatedValue
date:   2008-06-04T20:27:58.000Z
library: FinancialLib
argString: "acq_cost, act_date, numberOfYears"
author: Steve Walker
authorEmail: sneakyllama@gmail.com
version: 1
cfVersion: CF6
shortDescription: This function outputs the current value of an item based on straight line depreciation.
description: |
 This function outputs the current value of an item based on straight line depreciation.

returnValue: Returns a number.

example: |
 <cfoutput>
 Current Value as of Today: #LSCurrencyFormat((getDepreciatedValue(125000,'9/1/2006', 8)))#
 </cfoutput>

args:
 - name: acq_cost
   desc: Cost of item.
   req: true
 - name: act_date
   desc: Date item acquired.
   req: true
 - name: numberOfYears
   desc: Number of years to depreciate the item.
   req: true


javaDoc: |
 <!---
  This function outputs the current value of an item based on straight line depreciation.
  
  @param acq_cost      Cost of item. (Required)
  @param act_date      Date item acquired. (Required)
  @param numberOfYears      Number of years to depreciate the item. (Required)
  @return Returns a number. 
  @author Steve Walker (sneakyllama@gmail.com) 
  @version 1, June 4, 2008 
 --->

code: |
 <cffunction name="getDepreciatedValue" output="no" returntype="numeric" hint="Calculates the current straight line depreciated value">
     <cfargument name="acq_cost" required="yes" type="numeric" hint="The acquistion cost or value of an item">
     <cfargument name="acq_date" type="date" required="yes" hint="the acquisition date of the item">
     <cfargument name="numberofYears" type="numeric" default="5" required="yes" hint="the number of years to depreciate the item.">
     <cfset var DV = "">
     <cfset var cost = arguments.acq_cost>
     <cfset var days = arguments.numberofYears * 365>
     <cfset var age = dateDiff('d', DateFormat(arguments.acq_date,'mm/dd/yyyy'), DateFormat(Now(),'mm/dd/yyyy'))>
     
     <cfif age gte days>
         <cfset age = days>
     </cfif>
     
     <cfset DV = (cost*((age/days)-1)*-1)>
     
     <cfreturn DV>
 </cffunction>

---

