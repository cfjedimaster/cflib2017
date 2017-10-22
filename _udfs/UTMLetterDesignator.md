---
layout: udf
title:  UTMLetterDesignator
date:   2006-01-26T13:16:54.000Z
library: UtilityLib
argString: "lat"
author: Wayne Graham
authorEmail: wsgrah@wm.edu
version: 1
cfVersion: CF5
shortDescription: Determines the correct UTM letter designator for a given latitude.
tagBased: false
description: |
 Determines the correct UTM letter designator for a given latitude; returns Z if latitude is outside UTM limits of 84N to 80S.

returnValue: Returns a string.

example: |
 <cfoutput>#UTMLetterDesignator(37.268946)#</cfoutput>

args:
 - name: lat
   desc: Latitude.
   req: true


javaDoc: |
 /**
  * Determines the correct UTM letter designator for a given latitude.
  * 
  * @param lat      Latitude. (Required)
  * @return Returns a string. 
  * @author Wayne Graham (wsgrah@wm.edu) 
  * @version 1, January 26, 2006 
  */

code: |
 function UTMLetterDesignator(lat){
     var UTMLetter = "Z";
             
     if(84 GTE lat AND lat GTE 72) UTMLetter = "X";
     else if(72 GT lat AND lat GTE 64) UTMLetter = "W";
     else if(64 GT lat AND lat GTE 56) UTMLetter = "V";
     else if (56 GT lat AND lat GTE 48) UTMLetter = "U";
     else if (48 GT lat AND lat GTE 40) UTMLetter = "T";
     else if (40 GT lat AND lat GTE 32) UTMLetter = "S";
     else if (32 GT lat AND lat GTE 24) UTMLetter = "R";
     else if (24 GT lat AND lat GTE 16) UTMLetter = "Q";
     else if (16 GT lat AND lat GTE 8) UTMLetter = "P";
     else if (8 GT lat AND lat GTE 0) UTMLetter = "N";
     else if (0 GT lat AND lat GTE -8) UTMLetter = "M";
     else if (-8 GT lat AND lat GTE -16) UTMLetter = "L";
     else if (-16 GT lat AND lat GTE -32) UTMLetter = "K";
     else if (-32 GT lat AND lat GTE -40) UTMLetter = "J";
     else if (-40 GT lat AND lat GTE -48) UTMLetter = "H";
     else if (-48 GT lat AND lat GTE -56) UTMLetter = "G";
     else if (-56 GT lat AND lat GTE -64) UTMLetter = "F";
     else if (-64 GT lat AND lat GTE -72) UTMLetter = "E";
     else if (-72 GT lat AND lat GTE -80) UTMLetter = "C";
     return UTMLetter;
 }

---

