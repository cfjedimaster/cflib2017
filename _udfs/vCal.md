---
layout: udf
title:  vCal
date:   2002-04-10T19:01:48.000Z
library: DataManipulationLib
argString: "stEvent[, stEvent.description][, stEvent.subject][, stEvent.location][, stEvent.startTime][, stEvent.endTime][, stEvent.priority]"
author: Chris Wigginton
authorEmail: cwigginton@macromedia.com
version: 1
cfVersion: CF5
shortDescription: Produces output used by the vCalendar standard for PIM's (such as Outlook).
description: |
 Pass a formatted structure containing subject, descrition, start date/time in GMT, end date/time in GMT, and priority and get back a formatted string in the vCalendar format that can be saved to a file to be used as an attachment with cfmail.

returnValue: Returns a string.

example: |
 <cfscript>
   stEvent = StructNew();
   stEvent.description = "This can come from a file or other variable";
   stEvent.subject = "A vCal created with the vCal UDF";
   stEvent.location = "Chicago, IL";
   stEvent.startTime = "{ts '2002-01-14 20:53:07'}"; //dateObj or timestamp in GMT
   stEvent.endTime = "{ts '2002-01-14 21:53:07'}"; // dateObj or timestamp in GMT
   stEvent.priority = 2;
   vCalOutput = vCal(stEvent);
 </cfscript>
 
 <cfoutput>
 #vCalOutput#
 </cfoutput>

args:
 - name: stEvent
   desc: Structure containg the key/value pairs comprising the vCalendar data.  Keys are shown below&#58;
   req: true
 - name: stEvent.description
   desc: Description for the event.
   req: false
 - name: stEvent.subject
   desc: Subject of the event.
   req: false
 - name: stEvent.location
   desc: Location for the event.
   req: false
 - name: stEvent.startTime
   desc: Event's start time in GMT.
   req: false
 - name: stEvent.endTime
   desc: Event's end time in GMT.
   req: false
 - name: stEvent.priority
   desc: Numeric priority for the event (1,2,3).
   req: false


javaDoc: |
 /**
  * Produces output used by the vCalendar standard for PIM's (such as Outlook).
  * There are other tags available such as (CF_AdvancedEmail) that will support multi-part mime encoding where the text of the attachment can be imbeded right into the email
  * 
  * @param stEvent      Structure containg the key/value pairs comprising the vCalendar data.  Keys are shown below: 
  * @param stEvent.description      Description for the event. 
  * @param stEvent.subject      Subject of the event. 
  * @param stEvent.location      Location for the event. 
  * @param stEvent.startTime      Event's start time in GMT. 
  * @param stEvent.endTime      Event's end time in GMT. 
  * @param stEvent.priority      Numeric priority for the event (1,2,3). 
  * @return Returns a string. 
  * @author Chris Wigginton (cwigginton@macromedia.com) 
  * @version 1.1, April 10, 2002 
  */

code: |
 function vCal(stEvent)
 {
 
     var description = "";
     var vCal = "";
     
     var CRLF=chr(13)&chr(10);
     
     if (NOT IsDefined("stEvent.startTime"))
         stEvent.startTime = DateConvert('local2Utc', Now());
     
     if (NOT IsDefined("stEvent.endTime"))
         stEvent.endTime = DateConvert('local2Utc', Now());
         
     if (NOT IsDefined("stEvent.location"))
         stEvent.location = "N/A";
                 
     if (NOT IsDefined("stEvent.subject"))
         stEvent.subject = "Auto vCalendar Generated";
         
     if (NOT IsDefined("stEvent.description"))
         stEvent.description = "Autobot VCalendar Generated";
         
     if (NOT IsDefined("stEvent.priority"))
         stEvent.priority = "1";
             
 
     vCal = "BEGIN:VCALENDAR" & CRLF;
     vCal = vCal & "PRODID:-//Microsoft Corporation//OutlookMIMEDIR//EN" & CRLF;
     vCal = vCal & "VERSION:1.0" & CRLF;
     vCal = vCal & "BEGIN:VEVENT" & CRLF;
     vCal = vCal & "DTSTART:" & 
             DateFormat(stEvent.startTime,"yyyymmdd") & "T" & 
             TimeFormat(stEvent.startTime, "HHmmss") & "Z" & CRLF;
     vCal = vCal & "DTEND:" & DateFormat(stEvent.endTime, "yyyymmdd") & "T" & 
             TimeFormat(stEvent.endTime, "HHmmss") & "Z" & CRLF;
     vCal = vCal & "LOCATION:" & stEvent.location & CRLF;
     vCal = vCal & "SUMMARY;ENCODING=QUOTED-PRINTABLE:" & stEvent.subject & CRLF;
     
     vCal = vCal & "DESCRIPTION;ENCODING=QUOTED-PRINTABLE:";
     // Convert CF_CRLF (13_10) into =0D=0A with CR/LF and indent sequences
     description = REReplace(stEvent.description,"[#Chr(13)##Chr(10)#]", "=0D=0A=#Chr(13)##Chr(10)#     ", "ALL");
     vCal = vCal & description & CRLF;
     
     vCal = vCal & "PRIORITY:" & stEvent.priority & CRLF;
     vCal = vCal & "END:VEVENT" & CRLF;
     vCal = vCal & "END:VCALENDAR" & CRLF;    
     
     return vCal;
     
 }

---

