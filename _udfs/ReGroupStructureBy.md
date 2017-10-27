---
layout: udf
title:  ReGroupStructureBy
date:   2003-05-26T10:12:31.000Z
library: DataManipulationLib
argString: "[mydata], col"
author: Casey Broich
authorEmail: cab@pagex.com
version: 1
cfVersion: CF5
shortDescription: Pass an Array of structures and the name of a column that exists within each, and it will create a Grouped &quot;Structure of Array of Structures&quot;.
tagBased: false
description: |
 Pass an Array of structures and the name of a column that exists within each, and it will create a Grouped &quot;Structure of Array of Structures&quot;.

returnValue: Returns a structure.

example: |
 <cfscript>
 mydata = arraynew(1);
 
 mydata[1] = structnew();
 mydata[1].age = 25;
 mydata[1].gender = "m";
 mydata[1].state = "ca";
 
 mydata[2] = structnew();
 mydata[2].age = 25;
 mydata[2].gender = "m";
 mydata[2].state = "ca";
 
 mydata[3] = structnew();
 mydata[3].age = 25;
 mydata[3].gender = "f";
 mydata[3].state = "ca";
 
 mydata[4] = structnew();
 mydata[4].age = 30;
 mydata[4].gender = "m";
 mydata[4].state = "wa";
 
 mydata[5] = structnew();
 mydata[5].age = 30;
 mydata[5].gender = "m";
 mydata[5].state = "wa";
 
 mydata[6] = structnew();
 mydata[6].age = 30;
 mydata[6].gender = "f";
 mydata[6].state = "wa";
 </cfscript>
 
 <cfset newdata = ReGroupBy(mydata,"state")>
 
 <cfdump var="#newdata#">

args:
 - name: mydata
   desc: Structure to parse.
   req: false
 - name: col
   desc: Column to group by.
   req: true


javaDoc: |
 /**
  * Pass an Array of structures and the name of a column that exists within each, and it will create a Grouped &quot;Structure of Array of Structures&quot;.
  * 
  * @param mydata      Structure to parse. (Optional)
  * @param col      Column to group by. (Required)
  * @return Returns a structure. 
  * @author Casey Broich (cab@pagex.com) 
  * @version 1, May 26, 2003 
  */

code: |
 function ReGroupBy(mydata,col){
   var i = "";
   var sttemp = structnew();
   var thisValue = "";
   for (i=1; i LTE arraylen(mydata); i=i+1){
     thisValue = mydata[i][col];
     if (not structkeyexists(sttemp, thisValue)){
       sttemp[thisValue] = arraynew(1);
     }
     arrayappend(sttemp[thisValue] , mydata[i]);
   }
   return sttemp;
 }

oldId: 915
---

