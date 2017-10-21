---
layout: udf
title:  unicodeToCyrillicDos
date:   2005-08-23T12:03:41.000Z
library: StrLib
argString: "str"
author: Namchin
authorEmail: namchin@gmail.com
version: 1
cfVersion: CF5
shortDescription: Convert Unicode chars to Cyrillic DOS  8-bit char.
description: |
 Convert Unicode chars to Cyrillic DOS  8-bit char.

returnValue: Returns a string.

example: |
 <cfset DOSTxt = unicodeToCyrillicDos(UnicTxt)>

args:
 - name: str
   desc: String to convert.
   req: true


javaDoc: |
 /**
  * Convert Unicode chars to Cyrillic DOS  8-bit char.
  * 
  * @param str      String to convert. (Required)
  * @return Returns a string. 
  * @author Namchin (namchin@gmail.com) 
  * @version 1, August 23, 2005 
  */

code: |
 function unicodeToCyrillicDos(str) {
     var result="";
     var dos = "1026,1027,8218,1107,8222,8230,8224,8225,8364,8240,1033,8249,1034,1036,1035,1039,1106,8216,8217,8220,8221,8226,8211,8212,0,8482,1113,8250,1114,1116,1115,1119,160,1038,1118,1032,164,1168,166,167,1025,169,1028,171,172,173,174,1031,1072,1073,1074,1075,1076,1077,1078,1079,1080,1081,1082,1083,1084,1085,1086,1087";
     var i=0;
     for (i=1; i LTE len(str); i=i+1) {
         if ((Asc(mid(str, i, 1)) gt 1040) and (Asc(mid(str, i, 1)) lt 1103) and Asc(mid(str, i, 1)) neq 1064)
             result = result & Chr(ListGetAt(dos,Asc(mid(str, i, 1))-1039));
         else if (Asc(mid(str, i, 1)) eq 1064) result = result & Chr(1064);//65533
         else if (Asc(mid(str, i, 1)) eq 1025) result = result & Chr(1088);
         else if (Asc(mid(str, i, 1)) eq 1105) result = result & Chr(1089);
         else if (Asc(mid(str, i, 1)) eq 1028 or Asc(mid(str, i, 1)) eq 1256) result = result & Chr(1090);
         else if (Asc(mid(str, i, 1)) eq 1108 or Asc(mid(str, i, 1)) eq 1257) result = result & Chr(1091);
         else if (Asc(mid(str, i, 1)) eq 1111 or Asc(mid(str, i, 1)) eq 1198) result = result & Chr(1092);
         else if (Asc(mid(str, i, 1)) eq 1031 or Asc(mid(str, i, 1)) eq 1199) result = result & Chr(1093);
         else result = result & mid(str, i, 1);
     }
     return result;
 }

---

