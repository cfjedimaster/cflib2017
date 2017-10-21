---
layout: udf
title:  returnRandomHEXColors
date:   2009-06-12T16:58:58.000Z
library: UtilityLib
argString: "numToReturn"
author: Pablo Varando
authorEmail: webmaster@easycfm.com
version: 0
cfVersion: CF5
shortDescription: Generate random colors for cfcharts!
description: |
 This UDF will allow you to generate random colors that you can use with your charts. Pass in a numbr of colors and it will randomly generate as many colors are you requested in a comma delimited list to pass into a cfchartseries colorlist.

returnValue: Returns a string.

example: |
 <cfquery name="qGetTutorialStats" datasource="#application.dsn#">
         select    tutorialID, title, views
         from    paidTutorials
         where    authorID = #val(session.authorID)#
     </cfquery>
 
     <!--- my stats --->
     <cfchart format="flash" title="Tutorial Views" chartwidth="700" chartheight="400" show3d="yes">
         <cfchartseries type="bar" colorlist="#returnRandomHEXColors(qGetTutorialStats.recordCount)#">
             <cfloop query="qGetTutorialStats">
                 <cfchartdata item="#title#" value="#views#" />
             </cfloop>
         </cfchartseries>
     </cfchart>

args:
 - name: numToReturn
   desc: Number of colors to return.
   req: true


javaDoc: |
 /**
  * Generate random colors for cfcharts!
  * 
  * @param numToReturn      Number of colors to return. (Required)
  * @return Returns a string. 
  * @author Pablo Varando (webmaster@easycfm.com) 
  * @version 0, June 12, 2009 
  */

code: |
 function returnRandomHEXColors(numToReturn) {
     var returnList = ""; // define a clear var to return in the end with a list of colors
     var colorTable = "A,B,C,D,E,F,0,1,2,3,4,5,6,7,8,9"; // define all possible characters in hex colors
     var i = "";
     var tRandomColor = "";
     // loop through and generate as many colors as defined by the request
     for (i=1; i LTE val(numToReturn); i=i+1){
         // clear the color list
         tRandomColor = "";
         for(c=1; c lte 6; c=c+1){
             // generate a random (6) character hex code
             tRandomColor = tRandomColor & listGetAt(colorTable, randRange(1, listLen(colorTable)));
         }
         // append it to the list to return in the end
         returnList = listAppend(returnList, tRandomColor);
     
     }
     // return the list of random colors
     return returnList;
 }

---

