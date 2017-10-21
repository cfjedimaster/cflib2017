---
layout: udf
title:  getAllFilesInModule
date:   2008-10-14T15:57:26.000Z
library: UtilityLib
argString: "cvsdir, modulename"
author: Douglas Knudsen
authorEmail: doug@cubicleman.com
version: 1
cfVersion: CF5
shortDescription: Given output from a cvs ls command, this UDF returns a list of files path-qualified for CVS.
description: |
 CVS has no easy way to list all files in a module.  This UDF can parse the response from 'cvs ls -R &lt;modulemname&gt;' and return a list of files in the module.  This list is path-qualified the way CVS likes it.  Use in conjunction with getTagListFromRLOG() to get a list of tags in a module.

returnValue: Returns a string.

example: |
 <!--- sample output from cvs ls -R <modulename> --->
 <!--- chr(13) have to be manually entered to simulate cvs ls output --->
 <cfset cvsdir = "application.cfm" &chr(13)& "dsp_home.cfm" &chr(13)& "index.cfm" &chr(13)& " Directory traffic/admin" &chr(13)& "dsp_home.cfm" &chr(13)& "index.cfm" &chr(13)& "Directory traffic/admin/security" &chr(13)& "dsp_home.cfm" &chr(13)& "index.cfm" &chr(13)& "qry_add.cfm" &chr(13)& "qry_delete.cfm" &chr(13)& "qry_home.cfm" &chr(13)& "qry_update.cfm" />
 <cfset myFiles = getAllFilesInModule(cvsdir,'traffic') />

args:
 - name: cvsdir
   desc: List of files.
   req: true
 - name: modulename
   desc: Second attribute.
   req: true


javaDoc: |
 /**
  * Given output from a cvs ls command, this UDF returns a list of files path-qualified for CVS.
  * 
  * @param cvsdir      List of files. (Required)
  * @param modulename      Second attribute. (Required)
  * @return Returns a string. 
  * @author Douglas Knudsen (doug@cubicleman.com) 
  * @version 1, October 14, 2008 
  */

code: |
 function getAllFilesInModule(cvsdir, moduleName)    {
         var fileList = '';
         var curdir = arguments.moduleName;
         var myArray = ListToArray(arguments.cvsdir, chr(13));
         var myLength = ArrayLen(myArray);
         var temp = '';
         var i = 1;
         
         for( i = 1; i LTE myLength; i = i + 1)    {
             //WriteOutput(myArray[i] & '<br>');
             if(Find('Directory',myArray[i])) {
                 curdir = Mid(myArray[i], Len('Directory ') + 1, Len(myArray[i])-Len('Directory '));
             }    else if(Trim(myArray[i]) NEQ '') {
                 filelist = ListAppend(filelist, curdir & '/' & trim(myArray[i]) );
             }
             
         }
         return fileList;
     }

---

