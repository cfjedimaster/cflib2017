---
layout: udf
title:  IsISBN
date:   2002-05-16T11:51:54.000Z
library: StrLib
argString: "isbn"
author: Alex
authorEmail: axs@arbornet.org
version: 1
cfVersion: CF5
shortDescription: Checks to to see if value is a valid ISBN.
description: |
 Checks to to see if value is a valid ISBN.

returnValue: Returns a boolean.

example: |
 <cfoutput>
 #isISBN("013152447X")#
 </cfoutput>

args:
 - name: isbn
   desc: ISBN string to check.
   req: true


javaDoc: |
 /**
  * Checks to to see if value is a valid ISBN.
  * 
  * @param isbn      ISBN string to check. (Required)
  * @return Returns a boolean. 
  * @author Alex (axs@arbornet.org) 
  * @version 1, May 16, 2002 
  */

code: |
 function IsISBN(isbn)  {
      var total       = 0;
       var test        = 0;
     var check_digit = 0;
     var i = 1;
     
     if (len(isbn) neq  10) return false;
     
     test = left(isbn,9);
     check_digit = right(isbn,1);
     
     if (NOT isnumeric(test)) return false;
     
     for ( i = 1; i lt 10; i=i+1) {
         total = total + (Mid(isbn, i, 1) * i);
     }
 
     test = total mod 11; 
 
     if (test eq 10) test = "X";
             
     if (test eq check_digit) return true;
     else return false;
 }

---

