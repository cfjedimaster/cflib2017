---
layout: udf
title:  fadeList
date:   2003-05-22T09:42:45.000Z
library: UtilityLib
argString: "startcolor, endcolor, steps"
author: Adam Howitt
authorEmail: adamhowitt@yahoo.com
version: 1
cfVersion: CF5
shortDescription: Creates a comma separated list of hex colors forming a gradient between the start color and the end color over a specified number of steps.
tagBased: false
description: |
 Creates a comma separated list of hex colors forming a gradient between the start color and the end color over a specified number of steps.

returnValue: Returns a list.

example: |
 <cfoutput>
 <cfparam name="url.startcolor" default="ffffff">
 <cfparam name="url.endcolor" default="000000">
 
 <cfparam name="url.steps" default="20">
 
 <cfset fl=fadelist(url.startcolor,url.endcolor,url.steps)>
 <cfset rl=fadelist(url.endcolor,url.startcolor,url.steps)>
 
     Your start color and end color should be 6 characters long.<br>
     Each 2 character part of that should be in the range 0-9a-f (i.e. Hexadecimal)<br>
     The first two represent the red, middle 2 represent the green and the last 2 the blue component<br>
     e.g. ff0000 is red, 00ff00 is green and 0000ff is blue.
 <table cellpadding="0" cellspacing="0" border="black">
 <cfloop from="1" to="#url.steps#" index="ix">
     <tr>
         <td style="background: ###listgetat(fl,ix)#;"><font style="color: ###listgetat(rl,ix)#;">#listgetat(fl,ix)#</font></td>
         <td><font style="color: ###listgetat(rl,ix)#;">#listgetat(fl,ix)#</font></td>
         <td><font style="color: ###listgetat(rl,ix)#;">#inputbasen(left(listgetat(fl,ix),2),16)#</font></td>
         <td><font style="color: ###listgetat(rl,ix)#;">#inputbasen(mid(listgetat(fl,ix),3,2),16)#</font></td>
         <td><font style="color: ###listgetat(rl,ix)#;">#inputbasen(right(listgetat(fl,ix),2),16)#</font></td>
     </tr>
 </cfloop>
 </table>
 </cfoutput>

args:
 - name: startcolor
   desc: RGB value of the initial color.
   req: true
 - name: endcolor
   desc: RGV value of the end color.
   req: true
 - name: steps
   desc: Number of steps for the gradient.
   req: true


javaDoc: |
 /**
  * Creates a comma separated list of hex colors forming a gradient between the start color and the end color over a specified number of steps.
  * 
  * @param startcolor      RGB value of the initial color. (Required)
  * @param endcolor      RGV value of the end color. (Required)
  * @param steps      Number of steps for the gradient. (Required)
  * @return Returns a list. 
  * @author Adam Howitt (adamhowitt@yahoo.com) 
  * @version 1, May 22, 2003 
  */

code: |
 function fadeList(startcolor,endcolor,steps) {
     var outlist=startcolor;
     var decr=0;
     var decg=0;
     var decb=0;
     var newr=0;
     var newg=0;
     var newb=0;
     var ix = 1;
 
     steps=steps-1;
     decr=(inputbasen(left(startcolor,2),16)-inputbasen(left(endcolor,2),16))/steps;
     decg=(inputbasen(mid(startcolor,3,2),16)-inputbasen(mid(endcolor,3,2),16))/steps;
     decb=(inputbasen(right(startcolor,2),16)-inputbasen(right(endcolor,2),16))/steps;
     for (ix=1;ix lte steps;ix=ix+1) {
         newr=formatbasen(int(inputbasen(left(startcolor,2),16)-(ix*decr)),16);
         if (len(newr) eq 1) {newr="0"&newr;}
         newg=formatbasen(int(inputbasen(mid(startcolor,3,2),16)-(ix*decg)),16);
         if (len(newg) eq 1) {newg="0"&newg;}
         newb=formatbasen(int(inputbasen(right(startcolor,2),16)-(ix*decb)),16);
         if (len(newb) eq 1) {newb="0"&newb;}
         outlist=outlist&","&newr&newg&newb;
     }
     return outlist & "," & endcolor;
 }

oldId: 905
---

