---
layout: udf
title:  GetLoadTime
date:   2002-10-10T11:46:50.000Z
library: UtilityLib
argString: "mes, beg"
author: Kyle W. McNamara
authorEmail: mac@kwm.tm
version: 1
cfVersion: CF5
shortDescription: Measures the elapsed time (load time) from when the single function was first called to the time it was last called.
description: |
 The single getLoadTime function allows you to easily return loadtimes from anywhere within your application. Utilizes the CF getTickCount function.

returnValue: Returns a string.

example: |
 <!--- begin measure app load time --->
 <cfset request.tickBegin = getTickCount()>
 
 <!--- do stuff --->
 <cfloop index="x" from=1 to=15000></cfloop>
 
 <!--- end measure app load time --->
 <cfoutput>
 <font size="-2">[Load Time: #getLoadTime("mil",request.tickBegin)#]</font>
 <p>
 <font size="-2">[Load Time: #getLoadTime("sec",request.tickBegin)#]</font>
 </cfoutput>

args:
 - name: mes
   desc: Type of measurement, either 'mil' for miliseconds or 'sec' for seconds.
   req: true
 - name: beg
   desc: Beginning tick count.
   req: true


javaDoc: |
 /**
  * Measures the elapsed time (load time) from when the single function was first called to the time it was last called.
  * 
  * @param mes      Type of measurement, either 'mil' for miliseconds or 'sec' for seconds. (Required)
  * @param beg      Beginning tick count. (Required)
  * @return Returns a string. 
  * @author Kyle W. McNamara (mac@kwm.tm) 
  * @version 1, October 10, 2002 
  */

code: |
 function GetLoadTime(mes,beg) {
     var measurement = 0;
     var measure_text = "";
     var tickBeginValue = 0;
     var tickEnd = 0;
     var loadTime = "";
 
     if (mes eq "mil") {
         measurement = 1;
         measure_text = " Milliseconds";
     }
     else if (mes eq "sec") {
         measurement = 1000;
         measure_text = " Seconds";
     }
     tickBeginValue = beg;
     tickEnd = gettickcount();
     loadTime = ((tickEnd - tickBeginValue)/measurement) & measure_text;
     return loadTime;
 }

---

