---
layout: udf
title:  histogram
date:   2007-01-02T13:54:59.000Z
library: MathLib
argString: "y[, low][, hi][, num]"
author: Paul Dragos
authorEmail: dragosp@battelle.org
version: 1
cfVersion: CF7
shortDescription: Bins the elements of an array into equally spaced containers and returns the number of elements in each container.
tagBased: false
description: |
 This function bins the elements of an array of numbers into equally spaced containers and returns the number of elements in each container.  X = HISTOGRAM(Y) bins the elements of Y into 10 equally spaced containers.  X = HISTOGRAM(Y,LOW,HI,NUM) bins the elements of Y into NUM equally spaced containers where the lowest container's midpoint is LOW and the highest container's midpoint is HI.  Returns a 2-D array containing the number of elements in each container and the mid-point of each container.  Use a bar chart to plot the resulting histogram.

returnValue: Returns an array.

example: |
 <cfset lisdata = "5.1,4.8,4.7,4.3,4.9,3.6,5.6,3.7,4.3,4.9,5.2,4.9,6.7,6.6,5.6,5.1,4.2,4.5,3.6,4.6,4.5,6.8,5.8,5.1,4.7">
 <cfset arrData = listToArray(lisData)>
 <cfset arrHist = histogram(arrData,3,8,6)>
 <cfoutput>
 For the following 25 data points determine the histogram:<br>#lisData#<br>
 <table border="1">  <tr>  <td>Bin</td>  <td>Num of elements</td>  </tr>
     <cfloop from="1" to="6" index="i">
     <tr> 
         <td>#numberFormat(arrHist[1][i],'__.__')#</td>
         <td>#arrHist[2][i]#</td>
     </tr>
     </cfloop>
 </table>
 </cfoutput>
 Add plot routines here.

args:
 - name: y
   desc: Array of numbers.
   req: true
 - name: low
   desc: Lowest container midpoint.
   req: false
 - name: hi
   desc: Highest container midpint.
   req: false
 - name: num
   desc: Number of containers.
   req: false


javaDoc: |
 /**
  * Bins the elements of an array into equally spaced containers and returns the number of elements in each container.
  * 
  * @param y      Array of numbers. (Required)
  * @param low      Lowest container midpoint. (Optional)
  * @param hi      Highest container midpint. (Optional)
  * @param num      Number of containers. (Optional)
  * @return Returns an array. 
  * @author Paul Dragos (dragosp@battelle.org) 
  * @version 1, January 2, 2007 
  */

code: |
 function histogram(y) {
     // Declarations
     var m = ArrayNew(1);    // array of bin Midpoints
     var b = ArrayNew(1);    // array of bin Boundaries
     var n = ArrayNew(1);    // array of Number of points in each bin
     var x = ArrayNew(2);    // 2-d array containing m and n above (returned)
     var i=1; 
     var j=1; 
     // Size of y
     var len = arrayLen(y);
     // Set the default upper and lower limits and number of bins
     var miny = arrayMin(y);
     var maxy = arrayMax(y);
     var nbins = 10;
     var binwidth = 1;
     // Set the limits if not using the defaults
     if(arrayLen(arguments) gte 2) {
         miny = arguments[2];
         maxy = arguments[3];
         nbins = arguments[4];
      }
     // Set the bin width
     binwidth = (maxy - miny) / (nbins-1);
     // Set the bin midpoints
     for(i=1; i LTE nbins; i=i+1) {
         m[i] = miny + (binwidth * (i-1));
     }
     // Set the bin boundaries
     for(i=1; i LTE (nbins+1); i=i+1) {
         b[i] = miny - (binwidth / 2) + (binwidth * (i-1));
     }
     // Count the number in each bin
     for(i=1; i LTE nbins; i=i+1) {
         n[i] = 0;  
     }
     for(j=1; j LTE len; j=j+1) {
         for(i=1; i LTE nbins; i=i+1) {
             if(y[j] GTE b[i] AND y[j] LT b[i+1] ) 
             {
                 n[i] = n[i] + 1;
             }
         }
     }
     for(i=1; i LTE nbins; i=i+1) 
     {  
         x[1][i] = m[i];  
         x[2][i] = n[i];  
     }
     return x;
 }

oldId: 1607
---

