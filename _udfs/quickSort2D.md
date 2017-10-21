---
layout: udf
title:  quickSort2D
date:   2006-03-28T13:21:15.000Z
library: DataManipulationLib
argString: "arrayToSort, key, down, top"
author: Matthew Wear
authorEmail: matt.b.wear@gmail.com
version: 1
cfVersion: CF5
shortDescription: Sorts a two dimensional array by the specified column using quicksort.
description: |
 Send the array you want to sort, the column you want to sort by, the lower index you want to start the sort from, and then upper index you want to start the sort from.  The function will sort the array using the quicksort algorithm and return the sorted array.

returnValue: Returns an array.

example: |
 <cfset foo = arrayNew(2)>
 <cfset top = 5>
 <cfloop index="x" from="1" to="5">
     <cfloop index="y" from="1" to="#top#">
         <cfset foo[x][y] = randRange(1,100)>
     </cfloop>
 </cfloop>
 
 <cfdump var="#foo#">
 
 <cfdump var="#quickSort2d(foo,2,1, top)#">

args:
 - name: arrayToSort
   desc: The array to sort.
   req: true
 - name: key
   desc: Position in the second dimension to sort by.
   req: true
 - name: down
   desc: Index in fist dimension indicating where to begin sorting.
   req: true
 - name: top
   desc: Position in first dimension indicating where to end sorting.
   req: true


javaDoc: |
 /**
  * Sorts a two dimensional array by the specified column using quicksort.
  * 
  * @param arrayToSort      The array to sort. (Required)
  * @param key      Position in the second dimension to sort by. (Required)
  * @param down      Index in fist dimension indicating where to begin sorting. (Required)
  * @param top      Position in first dimension indicating where to end sorting. (Required)
  * @return Returns an array. 
  * @author Matthew Wear (matt.b.wear@gmail.com) 
  * @version 1, March 28, 2006 
  */

code: |
 function quickSort2D(arrayToSort, key, down, top) {
     var i = down;
     var j = top;
     var p = JavaCast("int",((down + top)/2));
     var x = arrayToSort[p][key];
     var temp = 0;
     var length = 0;
     var y = 0;
     var z = 0;
     
     do {
         while(arrayToSort[i][key] LT x AND i LT p) i=i+1;
         while(arrayToSort[j][key] GT x AND j GT p) j=j-1;
         if(i LT j){
             if(j EQ p){
                 length = ArrayLen(arrayToSort)+1;
                 for(z=length;z GT p+1;z=z-1)
                     for(y=1;y LTE ArrayLen(arrayToSort[i]);y=y+1)
                         arrayToSort[z][y]=arrayToSort[z-1][y];
                                 
                 for(y=1;y LTE ArrayLen(arrayToSort[i]);y=y+1){ 
                     arrayToSort[j+1][y] = arrayToSort[i][y];                 
                     arrayToSort[i][y] = 0;
                 }
                 
                 ArrayDeleteAt(arrayToSort,i);
                 
                 i=i-1;
                 p=p-1;
             }
                 
             else if(i EQ p){
                 length = ArrayLen(arrayToSort)+1;
                 for(z=length;z GT p;z=z-1)
                     for(y=1;y LTE ArrayLen(arrayToSort[i]);y=y+1)
                         arrayToSort[z][y]=arrayToSort[z-1][y];
                 
                 j = j + 1;
                 i = i + 1;
                 p = p + 1;
                 
                 for(y=1;y LTE ArrayLen(arrayToSort[i]);y=y+1){ 
                     arrayToSort[i-1][y] = arrayToSort[j][y];                 
                     arrayToSort[j][y] = 0;
                 }
                 
                 ArrayDeleteAt(arrayToSort,j);
             }
             
             else{
                 for(y=1;y LTE ArrayLen(arrayToSort[i]);y=y+1){
                     temp = arrayToSort[i][y];
                     arrayToSort[i][y] = arrayToSort[j][y];
                     arrayToSort[j][y] = temp;        
                 }
             }                    
         }
                 
         if(i LT p) i=i+1;
         if(j GT p) j=j-1;        
                 
     }while(i LT j);
     
     if(down LT j) arrayToSort = QuickSort2D(arrayToSort, key, down, p-1);
     if(i LT top) arrayToSort = QuickSort2D(arrayToSort, key, p+1, top);
 
     return arrayToSort;
 }

---

