---
layout: udf
title:  MD5
date:   2001-11-29T15:01:06.000Z
library: SecurityLib
argString: "message"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Produces a 128-bit condensed representation (message digest) of a message using the RSA MD5 algorithm.
tagBased: false
description: |
 Produces a 128-bit condensed representation (message digest) of a message using the RSA MD5 algorithm.  See RFC 1321 (http://www.ietf.org/rfc/rfc1321.txt) for more information.
 
 Original custom tag code by Tim McCarthy (tim@timmcc.com) - 2/2001

returnValue: Returns a string.

example: |
 <CFSET message="This is a test">
   <CFOUTPUT>
   Given message=#message#
   The MD5 message digest is: #MD5(message)#
   </CFOUTPUT>

args:
 - name: message
   desc: Text you want to hash.
   req: true


javaDoc: |
 /**
  * Produces a 128-bit condensed representation (message digest) of a message using the RSA MD5 algorithm.
  * Original custom tag code by Tim McCarthy (tim@timmcc.com) - 2/2001
  * 
  * @param message      Text you want to hash. 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, November 29, 2001 
  */

code: |
 function MD5(message)
 {
   Var hex_msg = "";
   Var hex_msg_len = 0;  
   Var padded_hex_msg = "";
   Var temp = "";  
   Var var1 = ArrayNew(1);
   Var f = 0;
   Var h = ArrayNew(1);
   Var i = 0;
   Var j = 0;
   Var k = ArrayNew(1);
   Var m = ArrayNew(1);
   Var n = 0;
   Var s = ArrayNew(1);  
   Var t = ArrayNew(1);
   // convert the msg to ASCII binary-coded form
   for (i=1; i LTE Len(message); i=i+1) {  
       hex_msg = hex_msg & Right("0"&FormatBaseN(Asc(Mid(message,i,1)),16),2);
   }    
 
   // compute the msg length in bits
   hex_msg_len = Right(RepeatString("0",15)&FormatBaseN(8*Len(message),16),16);
   for (i=1; i LTE 8; i=i+1) {
       temp = temp & Mid(hex_msg_len,-2*(i-8)+1,2);
   }
   hex_msg_len = temp;
 
   // pad the msg to make it a multiple of 512 bits long
   padded_hex_msg = hex_msg & "80" & RepeatString("0",128-((Len(hex_msg)+2+16) Mod 128)) & hex_msg_len;
 
   // initialize MD buffer
   h[1] = InputBaseN("0x67452301",16);
   h[2] = InputBaseN("0xefcdab89",16);
   h[3] = InputBaseN("0x98badcfe",16);
   h[4] = InputBaseN("0x10325476",16);
 
   var1[1] = "a";
   var1[2] = "b";
   var1[3] = "c";
   var1[4] = "d";
   // look at my crazy nested if action - courtesy of no elseif statement!
   for (i=1; i LTE 64; i=i+1) {
       t[i] = Int(2^32*abs(sin(i)));
       if (i LE 16){
           if (i EQ 1){
               k[i] = 0;
       }
       else {
         k[i] = k[i-1] + 1;
       }
           s[i] = 5*((i-1) MOD 4) + 7;
       }
     else {
       if (i LE 32) {
         if (i EQ 17) {
                 k[i] = 1;
         }
         else {
           k[i] = (k[i-1]+5) MOD 16;
         }
           s[i] = 0.5*((i-1) MOD 4)*((i-1) MOD 4) + 3.5*((i-1) MOD 4) + 5;
       }
         else {
         if(i LE 48) {
           if (i EQ 33) {
                   k[i] = 5;
           }
           else {
             k[i] = (k[i-1]+3) MOD 16;
           }
              s[i] = 6*((i-1) MOD 4) + ((i-1) MOD 2) + 4;
           }
         else {
           if (i EQ 49) {
             k[i] = 0;
           }
           else {
                   k[i] = (k[i-1]+7) MOD 16;
           }
               s[i] = 0.5*((i-1) MOD 4)*((i-1) MOD 4) + 3.5*((i-1) MOD 4) + 6;
           }
       }
     }
   }
 
   // process the msg 512 bits at a time
   for (n=1; n LTE Evaluate(Len(padded_hex_msg)/128); n=n+1) { 
       a = h[1];
       b = h[2];
       c = h[3];
       d = h[4];
     
       msg_block = Mid(padded_hex_msg,128*(n-1)+1,128);
 
     for (i=1; i LTE 16; i=i+1) {  
           sub_block = "";
       for (j=1; j LTE 4; j=j+1) {  
             sub_block = sub_block & Mid(msg_block,8*i-2*j+1,2);
           }
           m[i] = InputBaseN(sub_block,16);
       }
 
     for (i=1; i LTE 64; i=i+1) {      
         if (i LE 16) {
               f = BitOr(BitAnd(Evaluate(var1[2]),Evaluate(var1[3])),BitAnd(BitNot(Evaluate(var1[2])),Evaluate(var1[4])));
           }
       else {
         if (i LE 32) {
           f = BitOr(BitAnd(Evaluate(var1[2]),Evaluate(var1[4])),BitAnd(Evaluate(var1[3]),BitNot(Evaluate(var1[4]))));
         }
         else {
           if (i LE 48) {
             f = BitXor(BitXor(Evaluate(var1[2]),Evaluate(var1[3])),Evaluate(var1[4]));
           }
               else {
             f = BitXor(Evaluate(var1[3]),BitOr(Evaluate(var1[2]),BitNot(Evaluate(var1[4]))));
           }
             }
       }
           temp = Evaluate(var1[1]) + f + m[k[i]+1] + t[i];
           while ((temp LT -2^31) OR (temp GE 2^31)) {
         temp = temp - Sgn(temp)*2^32;
           }
           temp = Evaluate(var1[2]) + BitOr(BitSHLN(temp,s[i]),BitSHRN(temp,32-s[i]));
       while ((temp LT -2^31) OR (temp GE 2^31)) {
               temp = temp - Sgn(temp)*2^32;
       }
           temp = SetVariable(var1[1],temp);
           temp = var1[4];
           var1[4] = var1[3];
           var1[3] = var1[2];
           var1[2] = var1[1];
           var1[1] = temp;
        }
     
       h[1] = h[1] + a;
        h[2] = h[2] + b;
       h[3] = h[3] + c;
       h[4] = h[4] + d;
      
     for (i=1; i LTE 4; i=i+1) { 
       while ((h[i] LT -2^31) OR (h[i] GE 2^31)) {
               h[i] = h[i] - Sgn(h[i])*2^32;
           }
       }
   }
 
   for (i=1; i LTE 4; i=i+1) { 
       h[i] = Right(RepeatString("0",7)&UCase(FormatBaseN(h[i],16)),8);
   }
 
   for (i=1; i LTE 4; i=i+1) {   
       temp = "";
     for (j=1; j LTE 4; j=j+1) { 
           temp = temp & Mid(h[i],-2*(j-4)+1,2);
       }
       h[i] = temp;
   }
   Return h[1] & h[2] & h[3] & h[4];
 }

---

