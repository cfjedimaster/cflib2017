---
layout: udf
title:  fncFileSize
date:   2009-02-03T20:31:06.000Z
library: FileSysLib
argString: "number"
author: Kyle Morgan
authorEmail: admin@kylemorgan.com
version: 3
cfVersion: CF5
shortDescription: Will take a number returned from a File.Filesize, calculate the number in terms of Bytes/Kilobytes/Megabytes and return the result.
description: |
 After using a variety of different methods to generate file sizes of files being uploaded to a server for public downloads, frustration lead to writing of this tag.  It will calculate in bytes, kilobytes, and megabytes, and return an accurate number to help plan/keep track of the size of files.
 
 To use the function, just use #fncFileSize(Number)# and it will return an accurate calculation.  If you provide a variable that is not numerical, it will return 'Error'.

returnValue: Returns a string.

example: |
 <cfoutput>
 #fncFileSize(120)#<br>
 #fncFileSize(1675)#<br>
 #fncFileSize(2082456)#<Br>
 #fncFileSize(3791576)#<Br>
 #fncFileSize(2813791576)#<Br>
 </cfoutput>

args:
 - name: number
   desc: Size in bytes of the file.
   req: true


javaDoc: |
 /**
  * Will take a number returned from a File.Filesize, calculate the number in terms of Bytes/Kilobytes/Megabytes and return the result.
  * v2 by Haikal Saadh
  * v3 by Michael Smith, cleaned up and added Gigabytes
  * 
  * @param number      Size in bytes of the file. (Required)
  * @return Returns a string. 
  * @author Kyle Morgan (admin@kylemorgan.com) 
  * @version 3, February 3, 2009 
  */

code: |
 function fncFileSize(size) {
     if (size lt 1024) return "#size# b";
     if (size lt 1024^2) return "#round(size / 1024)# Kb";
     if (size lt 1024^3) return "#decimalFormat(size/1024^2)# Mb";
     return "#decimalFormat(size/1024^3)# Gb";
 }

---

