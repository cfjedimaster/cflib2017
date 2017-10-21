---
layout: udf
title:  GetTabTextFeed
date:   2003-05-09T18:16:53.000Z
library: StrLib
argString: "x"
author: Ray Bayly
authorEmail: rbayly@mediageneral.com
version: 1
cfVersion: CF5
shortDescription: This UDF will take a Tab delimited text file and parse it into a mutlidimensional array
description: |
 GetTabTextFeed will take a feed from an older batch Database or an excel tab delimited file and turn it into something a programmer can quickly use for validation or entry into a Database, this will also place values where values are missing getting around Cold Fusions problem of Shifting values when one is not present. This currently bases its lines off of the Ascii New Line Character. chr(10), if you would like to base it off of hard carriage returns simply change all of the chr(10) values to chr(13).

returnValue: Retuns an array.

example: |
 <!---Set a Tab delimited List--->
 <cfset inventory = "220537    82418014    1GCCS195X18121357    7546T    2001    Chevrolet    S-10    Club Cab    9995        0            Club Cab Pickup        2        2.2L 4 cyl            Anti-Lock Brakes,Security Features,Power Brakes,Power Steering
                     220537    82418024    1GCCS1940Y8147158    7547T    2000    Chevrolet    S-10    Club Cab    7995    35090    0        White    Club Cab Pickup        2        2.2L 4 cyl            Anti-Lock Brakes,Security Features,Power Brakes,Power Steering
                     220537    79931104    1GNFK16R7XJ515346    7243T    1999    Chevrolet    Suburban    K1500    20995    50371    0    http://images.cobaltgroup.com/3/1/2/30075213.jpg    Light Pewter Metallic    4 Dr. Wagon        4    a    5.7L 8 cyl            Four Wheel Drive,Air Conditioning,Anti-Lock Brakes,Security Features,Power Brakes,Power Steering,Tilt Steering Wheel,Automatic Transmission">
 
 <!---Dump the variable out to the screen--->
 <cfdump var="#GetTabTextFeed(inventory)#">

args:
 - name: x
   desc: Tab text to parse.
   req: true


javaDoc: |
 /**
  * This UDF will take a Tab delimited text file and parse it into a mutlidimensional array
  * 
  * @param x      Tab text to parse. (Required)
  * @return Retuns an array. 
  * @author Ray Bayly (rbayly@mediageneral.com) 
  * @version 1, May 9, 2003 
  */

code: |
 function GetTabTextFeed(X){
     //Declare all variables used within this UDF
     var Xy = "";//This is an array that holds the lines
     var Xc = "";//this is the count for the number of lines 
      var Yl = "";//This is a temp holder for the line
     var Yc = "";//This holds the length of the line bieng called
     var Yt = "";//this is an array that holds the line
     var i = 1;
     
     Xy = ArrayNew(1);
     Xc = ListLen(X, chr(10));
     for(i=1;i LTE Xc;i=i+1){
         Yl = ListGetAt(X, i, chr(10));
         //Now I check for missing data 
         Yl = replaceNoCase(Yl, "        ", "    NA    ", "ALL");
         Yl = replaceNoCase(Yl, "         ", "    NA    ", "ALL");
         Yl = replaceNoCase(Yl, "            ", "    NA    NA    ", "ALL");
         //I know redundant code but for some reason it does not 
         //catch all the tabs the first time through
          Yl = replaceNoCase(Yl, "        ", "    NA    ", "ALL");
         Yl = replaceNoCase(Yl, "         ", "    NA    ", "ALL");
         Yl = replaceNoCase(Yl, "            ", "    NA    NA    ", "ALL");
         //Now we grab the size of the Line/List
         Yc = ListLen(Yl, chr(9));
         //Set Yt as the array for the line
         Yt = ArrayNew(1);
         for(ix=1;ix LTE Yc;ix=ix+1){
             //load each piece of text into an Array Dimension
             Yt[ix] = ListGetAt(Yl, ix, chr(9));
         }
         //Add the New "Array Line" to the Master Array
         Xy[i] = Yt;
     }
     return Xy;
 }

---

