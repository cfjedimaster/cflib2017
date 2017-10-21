---
layout: udf
title:  getTagListFromRLOG
date:   2008-10-14T15:58:38.000Z
library: UtilityLib
argString: "rlog"
author: Douglas Knudsen
authorEmail: doug@cubicleman.com
version: 1
cfVersion: CF5
shortDescription: returns a list of tags for a module in CVS based on passed in rlog results.
description: |
 CVS has no easy way to return a list of tags for a module.  The common method is to parse the results of rlog to obtain this list.  Use cfexecute, or some other method, to execute cvs rlog -h -l &lt;filelist&gt;.  Pass the results to getTagListFromRLOG() to get a list of tags on the file list.  See getAllFilesInModule() for help in building this file list.

returnValue: Returns a string.

example: |
 <!--- sample rlog results --->
 <cfset rlog = "RCS file: /rrt/agentanalysis/com/alltel/rapid/agentanalysis/view/MainView.mxml,v head: 1.17 branch: locks: strict access list: symbolic names: HD0000002580216: 1.16 HD0000002496921: 1.15 HD0000002488496: 1.14 HD0000002373393: 1.14 HD0000002333286: 1.14 keyword substitution: kv total revisions: 17" />
 <cfset myTagList = getTagListFromRLOG(rlog) />

args:
 - name: rlog
   desc: RLog results from CVS.
   req: true


javaDoc: |
 /**
  * returns a list of tags for a module in CVS based on passed in rlog results.
  * 
  * @param rlog      RLog results from CVS. (Required)
  * @return Returns a string. 
  * @author Douglas Knudsen (doug@cubicleman.com) 
  * @version 1, October 14, 2008 
  */

code: |
 function getTagListFromRLOG( rlog )    {
         var myrlog = replace(arguments.rlog,'=============================================================================',chr(236),'All');
         var myArray = ListToArray(myrlog,chr(236));
         var myLength = ArrayLen(myArray);
         var startStr = 'symbolic names:';
         var endStr = 'keyword substitution:';
         var startPos = 0;
         var myLen = 0;
         var HDList = '';
         var i = '';
         var j = '';
         var tag = '';
         var hdArray = '';
         var hdArrayLen = 0;
     
         for(i=1; i LTE myLength; i = i +1)    {
             startPos = Find(startStr,myArray[i])+Len(startStr);
             myLen = Find(endStr,myArray[i]) - Find(startStr,myArray[i]) - Len(endStr);
             if( myLen GT 0 )    {
                 hdArray = ListToArray(myArray[i],':');
                 hdArrayLen = ArrayLen(hdArray);
                 for(j=1; j LTE hdArrayLen; j = j + 1)    {
                     if( Find('HD',hdArray[j]) )    {
                         tag = Mid(hdArray[j],Find('HD',hdArray[j]), Len(hdArray[j]));
                         if(NOT ListContains(HDList,tag,',') )
                             HDList = ListAppend(HDList,tag);
                     }
                 
                 }
             
             }
         
         }
         return HDList;
     }

---

