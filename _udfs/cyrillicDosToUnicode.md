---
layout: udf
title:  cyrillicDosToUnicode
date:   2005-08-23T11:57:47.000Z
library: StrLib
argString: "str"
author: Namchin
authorEmail: namchin@gmail.com
version: 1
cfVersion: CF5
shortDescription: Convert Cyrillic DOS coded text to Unicode text.
description: |
 Convert Cyrillic DOS coded text to Unicode text.

returnValue: Returns a string.

example: |
 <cfset UnicodedTxt = cyrillicDosToUnicode("�������")>

args:
 - name: str
   desc: String to convert.
   req: true


javaDoc: |
 /**
  * Convert Cyrillic DOS coded text to Unicode text.
  * 
  * @param str      String to convert. (Required)
  * @return Returns a string. 
  * @author Namchin (namchin@gmail.com) 
  * @version 1, August 23, 2005 
  */

code: |
 function cyrillicDostoUnicode(str) {
     var result="";
     var dos = "1026,1027,8218,1107,8222,8230,8224,8225,8364,8240,1033,8249,1034,1036,1035,1039,1106,8216,8217,8220,8221,8226,8211,8212,0,8482,1113,8250,1114,1116,1115,1119,160,1038,1118,1032,164,1168,166,167,1025,169,1028,171,172,173,174,1031,1072,1073,1074,1075,1076,1077,1078,1079,1080,1081,1082,1083,1084,1085,1086,1087";
     var i=0;
     for (i=1; i LTE len(str); i=i+1) {
         j = ListFind(dos,Asc(mid(str,i,1)),",");
         if (j neq 0) result = result & Chr(j+1039);
         else if (Asc(mid(str, i, 1)) eq 65533) result = result & Chr(1064);
         else if (Asc(mid(str, i, 1)) eq 1088) result = result & Chr(1025);
         else if (Asc(mid(str, i, 1)) eq 1089) result = result & Chr(1105);
         else if (Asc(mid(str, i, 1)) eq 1090) result = result & Chr(1028);//1256
         else if (Asc(mid(str, i, 1)) eq 1091) result = result & Chr(1108);//1257
         else if (Asc(mid(str, i, 1)) eq 1092) result = result & Chr(1111);//1198
         else if (Asc(mid(str, i, 1)) eq 1093) result = result & Chr(1031);//1199
         else result = result & mid(str, i, 1);
     }
     return result;
 }

---

