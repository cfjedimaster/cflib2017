---
layout: udf
title:  TurkishDateFormat
date:   2002-05-14T16:47:41.000Z
library: DateLib
argString: "givenDate, dateDisplayFormat"
author: Nurettin Omer Hamzaoglu
authorEmail: omer@hamzaoglu.com
version: 1
cfVersion: CF5
shortDescription: Display date in Turkish language and Turkish date format.
tagBased: false
description: |
 Display date in Turkish language and Turkish date format. 8 different outputs available for display.

returnValue: Returns a string.

example: |
 <cfoutput>
 #TurkishDateFormat(DateFormat(Now(),"dd/mm/yyyy"),1)#<br>
 #TurkishDateFormat(DateFormat(Now(),"dd/mm/yyyy"),2)#<br>
 #TurkishDateFormat(DateFormat(Now(),"dd/mm/yyyy"),3)#<br>
 #TurkishDateFormat(DateFormat(Now(),"dd/mm/yyyy"),4)#<br>
 #TurkishDateFormat(DateFormat(Now(),"dd/mm/yyyy"),5)#<br>
 #TurkishDateFormat(DateFormat(Now(),"dd/mm/yyyy"),6)#<br>
 #TurkishDateFormat(DateFormat(Now(),"dd/mm/yyyy"),7)#<br>
 #TurkishDateFormat(DateFormat(Now(),"dd/mm/yyyy"),8)#
 </cfoutput>

args:
 - name: givenDate
   desc: Date you want to display in Turkish.
   req: true
 - name: dateDisplayFormat
   desc: Format mask to apply.  
   req: true


javaDoc: |
 /**
  * Display date in Turkish language and Turkish date format.
  * 
  * @param givenDate      Date you want to display in Turkish. (Required)
  * @param dateDisplayFormat      Format mask to apply.   (Required)
  * @return Returns a string. 
  * @author Nurettin Omer Hamzaoglu (omer@hamzaoglu.com) 
  * @version 1, May 14, 2002 
  */

code: |
 function TurkishDateFormat(GivenDate,DateDisplayFormat){
   var ChangedDate=DateFormat(GivenDate,"mm/dd/yyyy");
   var Ay="";
   var Yil="";
   var Gun = "";
   var DateToDisplay = "";
 
   if(DateDisplayFormat IS "2" OR DateDisplayFormat IS "4"){
     Gun = ReplaceList(DateFormat(ChangedDate,"ddd"),"Mon,Tue,Wed,Thu,Fri,Sat,Sun","Pazartesi,Sal�,�ar�amba,Per�embe,Cuma,Cumartesi,Pazar");
   }    
   Ay = ReplaceList(DateFormat(ChangedDate,"mm"),"01,02,03,04,05,06,07,08,09,10,11,12","Ocak,�ubat,Mart,Nisan,May�s,Haziran,Temmuz,A�ustos,Eyl�l,Ekim,Kas�m,Aral�k");
   Yil = DateFormat(GivenDate,"yyyy");
 
   switch(DateDisplayFormat){
     case 1: {
       DateToDisplay = DateFormat(GivenDate,"dd")&"/"&Ay&"/"&Yil;
       break;
     }
     case 2: {
       DateToDisplay = DateFormat(GivenDate,"dd")&"/"&Ay&"/"&Yil&" "&Gun;
       break;
     }
     case 3: {
       DateToDisplay = DateFormat(GivenDate,"dd")&" "&Ay&" "&Yil;
       break;
     }
     case 4: {
       DateToDisplay = DateFormat(GivenDate,"dd")&" "&Ay&" "&Yil&" "&Gun;
       break;
     }
     case 5: {
       DateToDisplay = DateFormat(GivenDate,"dd");
       break;
     }
     case 6: {
       DateToDisplay = Ay;
       break;
     }
     case 7: {
       DateToDisplay = Gun;
       break;
     }
     case 8: {
       DateToDisplay = Yil;
       break;
     }    
   }
   return DateToDisplay;
 }

---

