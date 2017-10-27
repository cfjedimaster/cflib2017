---
layout: udf
title:  Sha1
date:   2001-11-28T20:18:12.000Z
library: SecurityLib
argString: "message"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Produces a 160-bit condensed representation (message digest) of message using the Secure Hash Algorithm (SHA-1).
tagBased: false
description: |
 Produces a 160-bit condensed representation (message digest) of message using the Secure Hash Algorithm (SHA-1). For more information, see FIPS PUB 180-1
 (http://www.itl.nist.gov/fipspubs/fip180-1.htm).
 
 Original custom tag code by Tim McCarthy (tim@timmcc.com) - 2/2001

returnValue: Returns a string.

example: |
 <CFSET message="This is a test">
   <CFOUTPUT>
   Given message=#message#
   The SHA-1 message digest is: #sha1(message)#
   </CFOUTPUT>

args:
 - name: message
   desc: Text you want to hash.
   req: true


javaDoc: |
 /**
  * Produces a 160-bit condensed representation (message digest) of message using the Secure Hash Algorithm (SHA-1).
  * Original custom tag code by Tim McCarthy (tim@timmcc.com) - 2/2001
  * 
  * @param message      Text you want to hash. 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, November 28, 2001 
  */

code: |
 function sha1(message)
 {
   Var hex_msg = "";
   Var hex_msg_len = 0;
   Var padded_hex_msg = "";
   Var msg_block = "";
   Var num = 0;
   Var temp = "";
   Var h = ArrayNew(1);
   Var w = ArrayNew(1);
   Var a = "";
   Var b = "";
   Var c = "";
   Var d = "";
   Var e = "";
   Var f = "";
   Var i = 0;
   Var k = "";
   Var n = 0;
   Var t = 0;
   // convert the msg to ASCII binary-coded form
   for (i=1; i LTE Len(message); i=i+1) {  
       hex_msg = hex_msg & Right("0"&FormatBaseN(Asc(Mid(message,i,1)),16),2);
   }
   // compute the msg length in bits
   hex_msg_len = FormatBaseN(8*Len(message),16);
   // pad the msg to make it a multiple of 512 bits long
   padded_hex_msg = hex_msg & "80" & RepeatString("0",128-((Len(hex_msg)+2+16) Mod 128)) & RepeatString("0",16-Len(hex_msg_len)) & hex_msg_len;
   // initialize the buffers
   h[1] = InputBaseN("0x67452301",16);
   h[2] = InputBaseN("0xefcdab89",16);
   h[3] = InputBaseN("0x98badcfe",16);
   h[4] = InputBaseN("0x10325476",16);
   h[5] = InputBaseN("0xc3d2e1f0",16);
   // process the msg 512 bits at a time
   for (n=1; n LTE Evaluate(Len(padded_hex_msg)/128); n=n+1) {  
       msg_block = Mid(padded_hex_msg,128*(n-1)+1,128);
     a = h[1];
       b = h[2];
     c = h[3];
     d = h[4];
     e = h[5];
     for (t=0; t LTE 79; t=t+1) {  
       // nonlinear functions and constants
       // this code mess is courtesy of the lack of an elseif() function
       if (t LE 19) {
               f = BitOr(BitAnd(b,c),BitAnd(BitNot(b),d));
               k = InputBaseN("0x5a827999",16);
       }
       else {
         if (t LE 39) {
           f = BitXor(BitXor(b,c),d);
                 k = InputBaseN("0x6ed9eba1",16);
         }
         else {
           if (t LE 59) {
             f = BitOr(BitOr(BitAnd(b,c),BitAnd(b,d)),BitAnd(c,d));
                   k = InputBaseN("0x8f1bbcdc",16);
           }
           else {
                   f = BitXor(BitXor(b,c),d);
                   k = InputBaseN("0xca62c1d6",16);
             }    
         }
       }  
           // transform the msg block from 16 32-bit words to 80 32-bit words
           if (t LE 15) {
           w[t+1] = InputBaseN(Mid(msg_block,8*t+1,8),16);
       }
       else {
         num = BitXor(BitXor(BitXor(w[t-3+1],w[t-8+1]),w[t-14+1]),w[t-16+1]);
               w[t+1] = BitOr(BitSHLN(num,1),BitSHRN(num,32-1));
           }
           temp = BitOr(BitSHLN(a,5),BitSHRN(a,32-5)) + f + e + w[t+1] + k;
           e = d;
           d = c;
           c = BitOr(BitSHLN(b,30),BitSHRN(b,32-30));
           b = a;
           a = temp;
           num = a;
     
       while ((num LT -2^31) OR (num GE 2^31)) {    
               num = num - Sgn(num)*2^32;
       }
           a = num;
       }    
     
     h[1] = h[1] + a;
     h[2] = h[2] + b;
       h[3] = h[3] + c;
       h[4] = h[4] + d;
       h[5] = h[5] + e;
     
     for (i=1; i LTE 5; i=i+1) {
       while ((h[i] LT -2^31) OR (h[i] GE 2^31)) {
         h[i] = h[i] - Sgn(h[i])*2^32;
       }
     }
   }
   for (i=1; i LTE 5; i=i+1) {  
       h[i] = RepeatString("0",8-Len(FormatBaseN(h[i],16))) & UCase(FormatBaseN(h[i],16));
   }
   Return h[1] & h[2] & h[3] & h[4] & h[5];
 }

oldId: 34
---

