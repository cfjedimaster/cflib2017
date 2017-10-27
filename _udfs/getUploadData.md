---
layout: udf
title:  getUploadData
date:   2010-06-23T16:27:47.000Z
library: UtilityLib
argString: ""
author: David Boyer
authorEmail: dave@yougeezer.co.uk
version: 0
cfVersion: CF8
shortDescription: Returns a structure containing upload information.
tagBased: false
description: |
 Without touching &quot;cffile action='upload'&quot; this function can give you all the information you need about any uploads.  This includes the size, original name, temporary name, content type and extension.

returnValue: Returns a struct.

example: |
 <cfdump var="#getUploadData()#" />

args:


javaDoc: |
 /**
  * Returns a structure containing upload information.
  * 
  * @return Returns a struct. 
  * @author David Boyer (dave@yougeezer.co.uk) 
  * @version 0, June 23, 2010 
  */

code: |
 function getUploadData() {
   var local = {};
   local.result = {};
   if (cgi.request_method Eq 'post') {
     local.uploads = form.getPartsArray();
     if (StructKeyExists(local, 'uploads')) {
       local.count = ArrayLen(local.uploads);
       for (local.u = 1; local.u Lte local.count; local.u++) {
         local.info = GetFileInfo(form[local.uploads[local.u].getName()]);
         local.result[local.uploads[local.u].getName()] = {
           tempFileName = form[local.uploads[local.u].getName()],
           originalName = local.uploads[local.u].getFileName(),
           contentType = local.uploads[local.u].getContentType(),
           filesize = local.info.size,
           ext = ListLast(local.uploads[local.u].getFileName(), '.')
         };
       }
     }
   }
   return local.result;
 }

oldId: 2084
---

