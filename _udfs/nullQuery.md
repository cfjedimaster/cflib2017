---
layout: udf
title:  nullQuery
date:   2007-08-10T12:38:31.000Z
library: DataManipulationLib
argString: "q, Fields, Values"
author: John Bartlett
authorEmail: jbartlett@strangejourney.net
version: 1
cfVersion: CF5
shortDescription: Initialize an empty query with default values.
description: |
 If a query result set contains no rows but your code requires it, this function will initialize it with pre-defined values.
 
 Lists passed in are pipe delimited.

returnValue: Returns a query.

example: |
 <cfset taxes = queryNew("year,receipts,donations")>
 <cfset taxes=nullQuery(Taxes,"Year|Receipts|Donations","#Year(Now())#|0|0")>
 <cfdump var="#taxes#">

args:
 - name: q
   desc: Query.
   req: true
 - name: Fields
   desc: Fields to use.
   req: true
 - name: Values
   desc: Values to use.
   req: true


javaDoc: |
 /**
  * Initialize an empty query with default values.
  * 
  * @param q      Query. (Required)
  * @param Fields      Fields to use. (Required)
  * @param Values      Values to use. (Required)
  * @return Returns a query. 
  * @author John Bartlett (jbartlett@strangejourney.net) 
  * @version 1, August 10, 2007 
  */

code: |
 function nullQuery(q,Fields,Values) {
     var i=0;
     var NewQ=QueryNew(Replace(Fields,"|",",","ALL"));
     if (q.RecordCount GT 0) return q;
     QueryAddRow(NewQ);
     for(i=1; i LTE ListLen(Fields,'|'); i=i+1) {
         querySetCell(NewQ,ListGetAt(Fields,i,'|'),ListGetAt(Values,i,'|'));
     }
     return NewQ;
 }

---

