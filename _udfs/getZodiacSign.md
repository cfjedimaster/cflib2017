---
layout: udf
title:  getZodiacSign
date:   2004-02-14T11:07:45.000Z
library: DateLib
argString: "date"
author: Charlie Griefer
authorEmail: charlie@griefer.com
version: 1
cfVersion: CF5
shortDescription: Given a date, returns the appropriate zodiac sign.
description: |
 Given a date, returns the appropriate zodiac sign.

returnValue: Returns a string.

example: |
 <cfloop index="x" from=1 to=12>
     <cfset thisDate = createDate(year(now()), x, 1)>
     <cfoutput>Sign for #dateFormat(thisDate,"mmmm d")# is #getZodiacSign(thisDate)#<br></cfoutput>
 </cfloop>

args:
 - name: date
   desc: Date value.
   req: true


javaDoc: |
 /**
  * Given a date, returns the appropriate zodiac sign.
  * 
  * @param date      Date value. (Required)
  * @return Returns a string. 
  * @author Charlie Griefer (charlie@griefer.com) 
  * @version 1, February 14, 2004 
  */

code: |
 function getZodiacSign(date) {
     var bday_m = month(date);
     var bday_d = day(date);
     
     switch(bday_m) {
         case 1: 
             if (bday_d LTE 20) { sign = "Capricorn"; } else { sign = "Aquarius"; }
             break;
         case 2: 
             if (bday_d LTE 19) { sign = "Aquarius"; } else { sign = "Pisces"; }
             break;
         case 3: 
             if (bday_d LTE 20) { sign = "Pisces"; } else { sign = "Aries"; }
             break;
         case 4:
             if (bday_d LTE 20) { sign = "Aries"; } else { sign = "Taurus"; }
             break;
         case 5: 
             if (bday_d LTE 21) { sign = "Taurus"; } else { sign = "Gemini";    }
             break;
         case 6: 
             if (bday_d LTE 22) { sign = "Gemini"; } else { sign = "Cancer";    }
             break;
         case 7: 
             if (bday_d LTE 23) { sign = "Cancer"; } else { sign = "Leo"; }
             break;
         case 8: 
             if (bday_d LTE 23) { sign = "Leo"; } else { sign = "Virgo"; }
             break;
         case 9: 
             if (bday_d LTE 23) { sign = "Virgo"; } else { sign = "Libra"; }
             break;
         case 10: 
             if (bday_d LTE 23) { sign = "Libra"; } else { sign = "Scorpio"; }
             break;
         case 11: 
             if (bday_d LTE 22) { sign = "Scorpio"; } else { sign = "Sagittarius"; }
             break;
         case 12: 
             if (bday_d LTE 21) { sign = "Sagittarius"; } else { sign = "Capricorn"; }
             break;
     }
     
     return sign;
 }

---

