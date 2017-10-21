---
layout: udf
title:  ChineseZodiac
date:   2001-12-03T13:41:07.000Z
library: DateLib
argString: "yyyy"
author: Sierra Bufe
authorEmail: sierra@brighterfusion.com
version: 1
cfVersion: CF5
shortDescription: Returns the Chinese Zodiac animal corresponding to the given year of birth.
description: |
 Returns the Chinese Zodiac animal corresponding to the given year of birth.  Takes any year, positive or negative.  All years will be taken at face value, for example 73 will be the year 73 A.D., not 1973.

returnValue: Returns a string.

example: |
 <cfoutput>
 ChineseZodiac(69) = #ChineseZodiac(69)#<br>
 ChineseZodiac(1969) = #ChineseZodiac(1969)#<br>
 ChineseZodiac(1973) = #ChineseZodiac(1973)#<br>
 ChineseZodiac(1976) = #ChineseZodiac(1976)#<br>
 ChineseZodiac(-1200) = #ChineseZodiac(-1200)#<br>
 </cfoutput>

args:
 - name: yyyy
   desc: Year (in the format yyyy) you want the Chinese Zodiac animal for.
   req: true


javaDoc: |
 /**
  * Returns the Chinese Zodiac animal corresponding to the given year of birth.
  * 
  * @param yyyy      Year (in the format yyyy) you want the Chinese Zodiac animal for. 
  * @return Returns a string. 
  * @author Sierra Bufe (sierra@brighterfusion.com) 
  * @version 1, December 3, 2001 
  */

code: |
 function ChineseZodiac(yyyy) {
   var Animals = ListToArray("Monkey,Chicken,Dog,Pig,Mouse,Ox,Tiger,Rabbit,Dragon,Snake,Horse,Sheep");
   return Animals[(yyyy MOD 12) + 1];    
 }

---

