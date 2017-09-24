---
layout: post
title:  "Cherry"
date:   2017-09-19 16:26:53 -0500
library: mathlib
ray: |
 function date2ExcelDate(dateString) {
   var rtrnString = '';
   if(isDate(dateString)) {
     return dateDiff("d", createDate( 1899,12,30 ), dateString);
   };

   return rtrnString;
 };

---

this is cherry