---
layout: udf
title:  RoundUpDown
date:   2002-06-27T16:41:47.000Z
library: MathLib
argString: "input[, multiple][, direction]"
author: Casey Broich
authorEmail: cab@pagex.com
version: 1
cfVersion: CF5
shortDescription: Rounds a number up or down to the nearest specified multiple.
description: |
 Rounds a number up or down to the nearest specified multiple.

returnValue: Returns a numberic value

example: |
 <CFOUTPUT>
 RoundUpDown(102): #RoundUpDown(102)#<BR>
 RoundUpDown(102,10,"up"): #RoundUpDown(102,10,"up")#<BR>
 RoundUpDown(102,10,"down"): #RoundUpDown(102,10,"down")#<BR>
 </CFOUTPUT>

args:
 - name: input
   desc: Number you want to round.
   req: true
 - name: multiple
   desc: Multiple by which to round.  Default is 5.
   req: false
 - name: direction
   desc: Direction to round.  Options are Up or Down.  Default is Up
   req: false


javaDoc: |
 /**
  * Rounds a number up or down to the nearest specified multiple.
  * 
  * @param input      Number you want to round. (Required)
  * @param multiple      Multiple by which to round.  Default is 5. (Optional)
  * @param direction      Direction to round.  Options are Up or Down.  Default is Up (Optional)
  * @return Returns a numberic value 
  * @author Casey Broich (cab@pagex.com) 
  * @version 1, June 27, 2002 
  */

code: |
 function RoundUpDown(input){
   var roundval = 5;
   var direction = "Up";
   var result = 0;
 
   if(ArrayLen(arguments) GTE 2) 
     roundval = arguments[2];
   if(ArrayLen(arguments) GTE 3) 
     direction = arguments[3];
   if(roundval EQ 0) 
     roundval = 1;
 
   if((input MOD roundval) NEQ 0){
      if((direction IS 1) OR (direction IS "Up")){
       result = input + (roundval - (input MOD roundval));
      }else{
       result = input - (input MOD roundval);
      }
   }else{
     result = input;
   }
   return result;
 }

---

