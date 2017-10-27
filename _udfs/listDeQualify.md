---
layout: udf
title:  listDeQualify
date:   2005-07-29T03:08:08.000Z
library: StrLib
argString: "lst[, delim]"
author: Mike Gillespie
authorEmail: mike@striking.com
version: 1
cfVersion: CF5
shortDescription: Used to remove qualifieers from a delimited list.
tagBased: false
description: |
 Pass in a list and an optional delimiter and this UDF will strip the qualifiers.  The qualifier list contains single and double quotes in plain, MS and Unicode Flavors.  Also trims the list elements.

returnValue: Returns a string.

example: |
 <cfset mylist='"Cold","Fusion","Code"'>
 <cfoutput>#ListDeQualify(mylist)#</cfoutput>

args:
 - name: lst
   desc: List to dequalify.
   req: true
 - name: delim
   desc: List delimiter. Defaults to a comma.
   req: false


javaDoc: |
 /**
  * Used to remove qualifieers from a delimited list.
  * 
  * @param lst      List to dequalify. (Required)
  * @param delim      List delimiter. Defaults to a comma. (Optional)
  * @return Returns a string. 
  * @author Mike Gillespie (mike@striking.com) 
  * @version 1, July 28, 2005 
  */

code: |
 function listDeQualify(lst) {
     // the chr()s are the MS single and double quotes
     var qualifiers="',"",#chr(145)#,#chr(146)#,#chr(147)#,#chr(148)#,#chr(8220)#,#chr(8221)#,#chr(8216)#,#chr(8217)#";
     var workList="";
     var delim=",";
     var listElement="";
     var firstChar="";
     var lastChar="";
     var i = 1;
     
     // if delim specified...
     if (arraylen(arguments) eq 2) delim=arguments[2];
 
     // loop the list, pull the first and last char from each element to evaluate
     for (;i lte listlen(lst,delim);i=i+1) {
         listElement=trim(listgetat(lst,i,delim));
         firstChar=left(ListElement,1);
         lastChar=Right(ListElement,1);
         
         if (listFindNoCase(qualifiers,firstChar) ) {ListElement=right(ListElement,len(ListElement)-1);}
         if (listFindNoCase(qualifiers,lastChar) ) {ListElement=left(ListElement,len(ListElement)-1);}
         workList=listappend(workList,listElement,delim);
     }
     return workList;
 }

oldId: 1242
---

