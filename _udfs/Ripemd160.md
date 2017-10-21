---
layout: udf
title:  Ripemd160
date:   2001-11-29T15:00:11.000Z
library: SecurityLib
argString: "message"
author: Rob Brooks-Bilson
authorEmail: rbils@amkor.com
version: 1
cfVersion: CF5
shortDescription: Produces a 160-bit condensed representation (message digest) of a message using the RIPEMD-160 algorithm.
description: |
 Produces a 160-bit condensed representation (message digest) of a message using the RIPEMD-160 algorithm. See http://www.esat.kuleuven.ac.be/~bosselae/ripemd160.html for more information.
 
 Original custom tag code by Tim McCarthy (tim@timmcc.com) - 2/2001

returnValue: Returns a string.

example: |
 <CFSET message="This is a test">
   <CFOUTPUT>
   Given message=#message#
   The RIPEMD-160 message digest is: #Ripemd160(message)#
   </CFOUTPUT>

args:
 - name: message
   desc: Text you want to hash.
   req: true


javaDoc: |
 /**
  * Produces a 160-bit condensed representation (message digest) of a message using the RIPEMD-160 algorithm.
  * Original custom tag code by Tim McCarthy (tim@timmcc.com) - 2/2001
  * 
  * @param message      Text you want to hash. 
  * @return Returns a string. 
  * @author Rob Brooks-Bilson (rbils@amkor.com) 
  * @version 1, November 29, 2001 
  */

code: |
 function Ripemd160(message)
 {
   Var hex_msg = "";
   Var hex_msg_len = 0;
   Var padded_hex_msg = "";
   Var msg_block = "";
   Var sub_block = "";
   Var num = 0;
   Var temp = "";
   Var rho = ArrayNew(1);
   Var pi = ArrayNew(1);
   Var shift = ArrayNew(2);
   Var a1 = 0;
   Var a2 = 0;
   Var b1 = 0;
   Var b2 = 0;
   Var c1 = 0;
   Var c2 = 0;
   Var d1 = 0;
   Var d2 = 0;
   Var e1 = 0;
   Var e2 = 0;    
   Var f1 = 0;
   Var f2 = 0;  
   Var k1 = ArrayNew(1);
   Var k2 = ArrayNew(1);
   Var r1 = ArrayNew(1);
   Var r2 = ArrayNew(1);
   Var s1 = ArrayNew(1);
   Var s2 = ArrayNew(1);
   Var var1 = ArrayNew(1);
   Var var2 = ArrayNew(1);
   Var h = ArrayNew(1);
   Var i = 0;
   Var j = 0;
   Var n = 0;
   Var t = 0;
   Var x = ArrayNew(1);
     
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
 
   // define permutations
   rho[1] = 7;
   rho[2] = 4;
   rho[3] = 13;
   rho[4] = 1;
   rho[5] = 10;
   rho[6] = 6;
   rho[7] = 15;
   rho[8] = 3;
   rho[9] = 12;
   rho[10] = 0;
   rho[11] = 9;
   rho[12] = 5;
   rho[13] = 2;
   rho[14] = 14;
   rho[15] = 11;
   rho[16] = 8;
 
   for (i=1; i LTE 16; i=i+1) {
     pi[i] = (9*(i-1)+5) Mod 16;
   }
 
   // define shifts
   shift[1][1] = 11;
   shift[1][2] = 14;
   shift[1][3] = 15;
   shift[1][4] = 12;
   shift[1][5] = 5;
   shift[1][6] = 8;
   shift[1][7] = 7;
   shift[1][8] = 9;
   shift[1][9] = 11;
   shift[1][10] = 13;
   shift[1][11] = 14;
   shift[1][12] = 15;
   shift[1][13] = 6;
   shift[1][14] = 7;
   shift[1][15] = 9;
   shift[1][16] = 8;
   shift[2][1] = 12;
   shift[2][2] = 13;
   shift[2][3] = 11;
   shift[2][4] = 15;
   shift[2][5] = 6;
   shift[2][6] = 9;
   shift[2][7] = 9;
   shift[2][8] = 7;
   shift[2][9] = 12;
   shift[2][10] = 15;
   shift[2][11] = 11;
   shift[2][12] = 13;
   shift[2][13] = 7;
   shift[2][14] = 8;
   shift[2][15] = 7;
   shift[2][16] = 7;
   shift[3][1] = 13;
   shift[3][2] = 15;
   shift[3][3] = 14;
   shift[3][4] = 11;
   shift[3][5] = 7;
   shift[3][6] = 7;
   shift[3][7] = 6;
   shift[3][8] = 8;
   shift[3][9] = 13;
   shift[3][10] = 14;
   shift[3][11] = 13;
   shift[3][12] = 12;
   shift[3][13] = 5;
   shift[3][14] = 5;
   shift[3][15] = 6;
   shift[3][16] = 9;
   shift[4][1] = 14;
   shift[4][2] = 11;
   shift[4][3] = 12;
   shift[4][4] = 14;
   shift[4][5] = 8;
   shift[4][6] = 6;
   shift[4][7] = 5;
   shift[4][8] = 5;
   shift[4][9] = 15;
   shift[4][10] = 12;
   shift[4][11] = 15;
   shift[4][12] = 14;
   shift[4][13] = 9;
   shift[4][14] = 9;
   shift[4][15] = 8;
   shift[4][16] = 6;
   shift[5][1] = 15;
   shift[5][2] = 12;
   shift[5][3] = 13;
   shift[5][4] = 13;
   shift[5][5] = 9;
   shift[5][6] = 5;
   shift[5][7] = 8;
   shift[5][8] = 6;
   shift[5][9] = 14;
   shift[5][10] = 11;
   shift[5][11] = 12;
   shift[5][12] = 11;
   shift[5][13] = 8;
   shift[5][14] = 6;
   shift[5][15] = 5;
   shift[5][16] = 5;
 
   for (i=1; i LTE 16; i=i+1) {
       // define constants
       k1[i] = 0;
       k1[i+16] = Int(2^30*Sqr(2));
       k1[i+32] = Int(2^30*Sqr(3));
       k1[i+48] = Int(2^30*Sqr(5));
       k1[i+64] = Int(2^30*Sqr(7));
       
       k2[i] = Int(2^30*2^(1/3));
       k2[i+16] = Int(2^30*3^(1/3));
       k2[i+32] = Int(2^30*5^(1/3));
       k2[i+48] = Int(2^30*7^(1/3));
       k2[i+64] = 0;
       
       // define word order
       r1[i] = i-1;
       r1[i+16] = rho[i];
       r1[i+32] = rho[rho[i]+1];
       r1[i+48] = rho[rho[rho[i]+1]+1];
       r1[i+64] = rho[rho[rho[rho[i]+1]+1]+1];
       
       r2[i] = pi[i];
       r2[i+16] = rho[pi[i]+1];
       r2[i+32] = rho[rho[pi[i]+1]+1];
       r2[i+48] = rho[rho[rho[pi[i]+1]+1]+1];
       r2[i+64] = rho[rho[rho[rho[pi[i]+1]+1]+1]+1];
       
       // define rotations
       s1[i] = shift[1][r1[i]+1];
       s1[i+16] = shift[2][r1[i+16]+1];
       s1[i+32] = shift[3][r1[i+32]+1];
       s1[i+48] = shift[4][r1[i+48]+1];
       s1[i+64] = shift[5][r1[i+64]+1];
       
       s2[i] = shift[1][r2[i]+1];
       s2[i+16] = shift[2][r2[i+16]+1];
       s2[i+32] = shift[3][r2[i+32]+1];
       s2[i+48] = shift[4][r2[i+48]+1];
       s2[i+64] = shift[5][r2[i+64]+1];
   }    
 
   // define buffers
   h[1] = InputBaseN("0x67452301",16);
   h[2] = InputBaseN("0xefcdab89",16);
   h[3] = InputBaseN("0x98badcfe",16);
   h[4] = InputBaseN("0x10325476",16);
   h[5] = InputBaseN("0xc3d2e1f0",16);
   
   var1[1] = "a1";
   var1[2] = "b1";
   var1[3] = "c1";
   var1[4] = "d1";
   var1[5] = "e1";
   
   var2[1] = "a2";
   var2[2] = "b2";
   var2[3] = "c2";
   var2[4] = "d2";
   var2[5] = "e2";
 
   // process msg in 16-word blocks
   for (n=1; n LTE Evaluate(Len(padded_hex_msg)/128); n=n+1) {
       a1 = h[1];
       b1 = h[2];
       c1 = h[3];
       d1 = h[4];
       e1 = h[5];
     
       a2 = h[1];
       b2 = h[2];
       c2 = h[3];
       d2 = h[4];
       e2 = h[5];
     
       msg_block = Mid(padded_hex_msg,128*(n-1)+1,128);
     for (i=1; i LTE 16; i=i+1) {
           sub_block = "";
       for (j=1; j LTE 4; j=j+1) {
               sub_block = sub_block & Mid(msg_block,8*i-2*j+1,2);
           }
           x[i] = InputBaseN(sub_block,16);
       }
       
     for (j=1; j LTE 80; j=j+1) {
           // nonlinear functions
       if (j LE 16) {
               f1 = BitXor(BitXor(Evaluate(var1[2]),Evaluate(var1[3])),Evaluate(var1[4]));
               f2 = BitXor(Evaluate(var2[2]),BitOr(Evaluate(var2[3]),BitNot(Evaluate(var2[4]))));
       }
       else {
         if (j LE 32) {
                 f1 = BitOr(BitAnd(Evaluate(var1[2]),Evaluate(var1[3])),BitAnd(BitNot(Evaluate(var1[2])),Evaluate(var1[4])));
                 f2 = BitOr(BitAnd(Evaluate(var2[2]),Evaluate(var2[4])),BitAnd(Evaluate(var2[3]),BitNot(Evaluate(var2[4]))));
         }  
         else {
           if (j LE 48) {
                   f1 = BitXor(BitOr(Evaluate(var1[2]),BitNot(Evaluate(var1[3]))),Evaluate(var1[4]));
                   f2 = BitXor(BitOr(Evaluate(var2[2]),BitNot(Evaluate(var2[3]))),Evaluate(var2[4]));
           }
           else {
             if (j LE 64) {
               f1 = BitOr(BitAnd(Evaluate(var1[2]),Evaluate(var1[4])),BitAnd(Evaluate(var1[3]),BitNot(Evaluate(var1[4]))));
                     f2 = BitOr(BitAnd(Evaluate(var2[2]),Evaluate(var2[3])),BitAnd(BitNot(Evaluate(var2[2])),Evaluate(var2[4])));
             }
                 else {
               f1 = BitXor(Evaluate(var1[2]),BitOr(Evaluate(var1[3]),BitNot(Evaluate(var1[4]))));
                     f2 = BitXor(BitXor(Evaluate(var2[2]),Evaluate(var2[3])),Evaluate(var2[4]));
             }
           }
         }
           }
           
           temp = Evaluate(var1[1]) + f1 + x[r1[j]+1] + k1[j];
       while ((temp LT -2^31) OR (temp GE 2^31)) {
               temp = temp - Sgn(temp)*2^32;
           }
           temp = BitOr(BitSHLN(temp,s1[j]),BitSHRN(temp,32-s1[j])) + Evaluate(var1[5]);
       while ((temp LT -2^31) OR (temp GE 2^31)) {
               temp = temp - Sgn(temp)*2^32;
           }
           temp = SetVariable(var1[1],temp);
           temp = SetVariable(var1[3],BitOr(BitSHLN(Evaluate(var1[3]),10),BitSHRN(Evaluate(var1[3]),32-10)));
           
           temp = var1[5];
           var1[5] = var1[4];
           var1[4] = var1[3];
           var1[3] = var1[2];
           var1[2] = var1[1];
           var1[1] = temp;
           
           temp = Evaluate(var2[1]) + f2 + x[r2[j]+1] + k2[j];
       while ((temp LT -2^31) OR (temp GE 2^31)) {
               temp = temp - Sgn(temp)*2^32;
           }
           temp = BitOr(BitSHLN(temp,s2[j]),BitSHRN(temp,32-s2[j])) + Evaluate(var2[5]);
       while ((temp LT -2^31) OR (temp GE 2^31)) {
               temp = temp - Sgn(temp)*2^32;
           }
           temp = SetVariable(var2[1],temp);
           temp = SetVariable(var2[3],BitOr(BitSHLN(Evaluate(var2[3]),10),BitSHRN(Evaluate(var2[3]),32-10)));
           
           temp = var2[5];
           var2[5] = var2[4];
           var2[4] = var2[3];
           var2[3] = var2[2];
           var2[2] = var2[1];
           var2[1] = temp;
       }
     
   t = h[2] + c1 + d2;
   h[2] = h[3] + d1 + e2;
   h[3] = h[4] + e1 + a2;
   h[4] = h[5] + a1 + b2;
   h[5] = h[1] + b1 + c2;
   h[1] = t;
     
   for (i=1; i LTE 5; i=i+1) {
     while ((h[i] LT -2^31) OR (h[i] GE 2^31)) {
       h[i] = h[i] - Sgn(h[i])*2^32;
         }
     }
     
   }
   for (i=1; i LTE 5; i=i+1) {
       h[i] = Right(RepeatString("0",7)&UCase(FormatBaseN(h[i],16)),8);
   }
 
   for (i=1; i LTE 5; i=i+1) {
       temp = "";
     for (j=1; j LTE 4; j=j+1) {
           temp = temp & Mid(h[i],-2*(j-4)+1,2);
       }
       h[i] = temp;
   }
 
   Return h[1] & h[2] & h[3] & h[4] & h[5];
 }

---

