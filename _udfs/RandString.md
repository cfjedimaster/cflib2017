---
layout: udf
title:  RandString
date:   2003-11-04T14:25:42.000Z
library: StrLib
argString: "Type, Length"
author: Joshua Miller
authorEmail: joshuamil@gmail.com
version: 2
cfVersion: CF5
shortDescription: Returns a random string of the specified length of either alpha, numeric or mixed-alpha-numeric characters.
description: |
 This UDF generates a random string of the specified length of either Alpha, Numeric or mixed Alpha-Numeric characters. Could be useful for username generation, &quot;Key Code&quot; generation or any number of other situations.

returnValue: Returns a string.

example: |
 <CFOUTPUT>
 Random Alpha-Numeric String: #randString('alphanum',8)#<br>
 Random Alpha String: #randString('alpha',8)#<br>
 Random Numeric String: #randString('numeric',8)#<br>
 Random "Secure" String: #randString('secure',10)#<br>
 </CFOUTPUT>

args:
 - name: Type
   desc: Type of random string to create.
   req: true
 - name: Length
   desc: Length of random string to create.
   req: true


javaDoc: |
 /**
  * Returns a random string of the specified length of either alpha, numeric or mixed-alpha-numeric characters.
  * v2, support for lower case
  * v3 - more streamlined code
  * 
  * @param Type      Type of random string to create. (Required)
  * @param Length      Length of random string to create. (Required)
  * @return Returns a string. 
  * @author Joshua Miller (josh@joshuasmiller.com) 
  * @version 2, November 4, 2003 
  */

code: |
 function randString(type,ct){
  var i=1;
  var randStr="";
  var randNum="";
  var useList="";
  var alpha="A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z";
  var secure="!,@,$,%,&,*,-,_,=,+,?,~";
  for(i=1;i LTE ct;i=i+1){  
   if(type is "alpha"){
    randNum=RandRange(1,52);
    useList=alpha;
   }else if(type is "alphanum"){
    randNum=RandRange(1,62);
    useList="#alpha#,0,1,2,3,4,5,6,7,8,9";
   }else if(type is "secure"){
    randNum=RandRange(1,73);
    useList="#alpha#,0,1,2,3,4,5,6,7,8,9,#secure#";
   }else{
    randNum=RandRange(1,10);
    useList="0,1,2,3,4,5,6,7,8,9";
   }
   
   randStr="#randStr##ListGetAt(useList,randNum)#";
  }
  return randStr;
 }

---

