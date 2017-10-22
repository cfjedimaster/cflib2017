---
layout: udf
title:  StateToAbbr
date:   2002-01-07T13:52:20.000Z
library: StrLib
argString: "state"
author: Sivan Leoni
authorEmail: sleoni@leoniz.com
version: 1
cfVersion: CF5
shortDescription: Takes a full State name (i.e. California) and returns the two letter abbreviation (i.e. CA).
tagBased: false
description: |
 Takes a full State name (i.e. California) and returns the two letter abbreviation (i.e. CA).
 Includes all USPS abbreviations.
 
 If no match found the name will stay the same.

returnValue: Returns a string.

example: |
 <cfset State = StateToAbbr("Louisiana")>
 
 <CFOUTPUT>
 #State#
 </CFOUTPUT>

args:
 - name: state
   desc: The state to convert.
   req: true


javaDoc: |
 /**
  * Takes a full State name (i.e. California) and returns the two letter abbreviation (i.e. CA).
  * 
  * @param state      The state to convert. 
  * @return Returns a string. 
  * @author Sivan Leoni (sleoni@leoniz.com) 
  * @version 1, January 7, 2002 
  */

code: |
 function StateToAbbr(State) {
   var states = "ALABAMA,ALASKA,AMERICAN
 SAMOA,ARIZONA,ARKANSAS,CALIFORNIA,COLORADO,CONNECTICUT,DELAWARE,DISTRICT
 OF COLUMBIA,FEDERATED STATES OF
 MICRONESIA,FLORIDA,GEORGIA,GUAM,HAWAII,IDAHO,ILLINOIS,INDIANA,IOWA,KANSA
 S,KENTUCKY,LOUISIANA,MAINE,MARSHALL
 ISLANDS,MARYLAND,MASSACHUSETTS,MICHIGAN,MINNESOTA,MISSISSIPPI,MISSOURI,M
 ONTANA,NEBRASKA,NEVADA,NEW HAMPSHIRE,NEW JERSEY,NEW MEXICO,NEW
 YORK,NORTH CAROLINA,NORTH DAKOTA,NORTHERN MARIANA
 ISLANDS,OHIO,OKLAHOMA,OREGON,PALAU,PENNSYLVANIA,PUERTO RICO,RHODE
 ISLAND,SOUTH CAROLINA,SOUTH DAKOTA,TENNESSEE,TEXAS,UTAH,VERMONT,VIRGIN
 ISLANDS,VIRGINIA,WASHINGTON,WEST VIRGINIA,WISCONSIN,WYOMING";
   var abbr =
 "AL,AK,AS,AZ,AR,CA,CO,CT,DE,DC,FM,FL,GA,GU,HI,ID,IL,IN,IA,KS,KY,LA,ME,MH
 ,MD,MA,MI,MN,MS,MO,MT,NE,NV,NH,NJ,NM,NY,NC,ND,MP,OH,OK,OR,PW,PA,PR,RI,SC
 ,SD,TN,TX,UT,VT,VI,VA,WA,WV,WI,WY";
   if(listFindNoCase(states,State))
     State=listGetAt(abbr,listFindNoCase(states,state));
   return State;
 }

---

