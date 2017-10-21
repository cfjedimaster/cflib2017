---
layout: udf
title:  iCalUS
date:   2008-12-18T21:42:51.000Z
library: DateLib
argString: "stEvent"
author: Troy Pullis
authorEmail: tpullis@yahoo.com
version: 2
cfVersion: CF5
shortDescription: Pass a formatted structure containing the event properties and get back a string in the iCalendar format (correctly offset for daylight savings time in U.S.) that can be saved to a file or returned to the browser with MIME type=&quot;text/calendar&quot;.
description: |
 Produces output used by the iCalendar standard for inclusion in calendaring tools such as Outlook, Sunbird, etc. 
 
 Adapted from the vCal() function found on cflib.org by Chris Wigginton
 
 Works to correctly offset daylight savings time in U.S.
 
 Will set a reminder alarm 30 minutes prior to event. Look at the spec if you want to change this.
 
 Good resource for the iCal spec -- http://www.kanzaki.com/docs/ical/

returnValue: Returns a string.

example: |
 <cfscript>
 eventStr = StructNew();
 eventStr.organizerName = "Joe Mauer";
 eventStr.organizerEmail = "joe@twins.com";
 eventStr.startTime = ParseDateTime("3/31/2008 7:00 PM");  // this is Eastern time 
 eventStr.endTime = ParseDateTime("3/31/2008 10:00 PM");
 eventStr.subject = "Twins vs Angels";
 eventStr.location = "Metrodome";
 eventStr.description = "The Twins home opener\n\nLet's cheer the Twins to a win!";
 </cfscript>
 <cfcontent type="text/calendar" reset="Yes">
 <cfheader name="Content-Disposition" value="inline; filename=newAppointment.ics"><cfoutput>#iCalUS(eventStr)#</cfoutput>

args:
 - name: stEvent
   desc: Structure of data for the event.
   req: true


javaDoc: |
 /**
  * Pass a formatted structure containing the event properties and get back a string in the iCalendar format (correctly offset for daylight savings time in U.S.) that can be saved to a file or returned to the browser with MIME type=&quot;text/calendar&quot;.
  * v2 updated by Dan Russel
  * 
  * @param stEvent      Structure of data for the event. (Required)
  * @return Returns a string. 
  * @author Troy Pullis (tpullis@yahoo.com) 
  * @version 2, December 18, 2008 
  */

code: |
 function iCalUS(stEvent) {
     var vCal = "";
     var CRLF=chr(13)&chr(10);
     var date_now = Now();
         
     if (NOT IsDefined("stEvent.organizerName"))
         stEvent.organizerName = "Organizer Name";
         
     if (NOT IsDefined("stEvent.organizerEmail"))
         stEvent.organizerEmail = "Organizer_Name@CFLIB.ORG";
                 
     if (NOT IsDefined("stEvent.subject"))
         stEvent.subject = "Event subject goes here";
         
     if (NOT IsDefined("stEvent.location"))
         stEvent.location = "Event location goes here";
     
     if (NOT IsDefined("stEvent.description"))
         stEvent.description = "Event description goes here\n---------------------------\nProvide the complete event details\n\nUse backslash+n sequences for newlines.";
         
     if (NOT IsDefined("stEvent.startTime"))  // This value must be in Eastern time!!!
         stEvent.startTime = ParseDateTime("3/21/2008 14:30");  // Example start time is 21-March-2008 2:30 PM Eastern
     
     if (NOT IsDefined("stEvent.endTime"))
         stEvent.endTime = ParseDateTime("3/21/2008 15:30");  // Example end time is 21-March-2008 3:30 PM Eastern
         
     if (NOT IsDefined("stEvent.priority"))
         stEvent.priority = "1";
         
     vCal = "BEGIN:VCALENDAR" & CRLF;
     vCal = vCal & "PRODID: -//CFLIB.ORG//iCalUS()//EN" & CRLF;
     vCal = vCal & "VERSION:2.0" & CRLF;
     vCal = vCal & "METHOD:REQUEST" & CRLF;
     vCal = vCal & "BEGIN:VTIMEZONE" & CRLF;
     vCal = vCal & "TZID:Eastern Time" & CRLF;
     vCal = vCal & "BEGIN:STANDARD" & CRLF;
     vCal = vCal & "DTSTART:20061101T020000" & CRLF;
     vCal = vCal & "RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=1SU;BYMONTH=11" & CRLF;
     vCal = vCal & "TZOFFSETFROM:-0400" & CRLF;
     vCal = vCal & "TZOFFSETTO:-0500" & CRLF;
     vCal = vCal & "TZNAME:Standard Time" & CRLF;
     vCal = vCal & "END:STANDARD" & CRLF;
     vCal = vCal & "BEGIN:DAYLIGHT" & CRLF;
     vCal = vCal & "DTSTART:20060301T020000" & CRLF;
     vCal = vCal & "RRULE:FREQ=YEARLY;INTERVAL=1;BYDAY=2SU;BYMONTH=3" & CRLF;
     vCal = vCal & "TZOFFSETFROM:-0500" & CRLF;
     vCal = vCal & "TZOFFSETTO:-0400" & CRLF;
     vCal = vCal & "TZNAME:Daylight Savings Time" & CRLF;
     vCal = vCal & "END:DAYLIGHT" & CRLF;
     vCal = vCal & "END:VTIMEZONE" & CRLF;
     vCal = vCal & "BEGIN:VEVENT" & CRLF;
     vCal = vCal & "UID:#date_now.getTime()#.CFLIB.ORG" & CRLF;  // creates a unique identifier
     vCal = vCal & "ORGANIZER;CN=#stEvent.organizerName#:MAILTO:#stEvent.organizerEmail#" & CRLF;
     vCal = vCal & "DTSTAMP:" & 
             DateFormat(date_now,"yyyymmdd") & "T" & 
             TimeFormat(date_now, "HHmmss") & CRLF;
     vCal = vCal & "DTSTART;TZID=Eastern Time:" & 
             DateFormat(stEvent.startTime,"yyyymmdd") & "T" & 
             TimeFormat(stEvent.startTime, "HHmmss") & CRLF;
     vCal = vCal & "DTEND;TZID=Eastern Time:" & 
             DateFormat(stEvent.endTime,"yyyymmdd") & "T" & 
             TimeFormat(stEvent.endTime, "HHmmss") & CRLF;
     vCal = vCal & "SUMMARY:#stEvent.subject#" & CRLF;
     vCal = vCal & "LOCATION:#stEvent.location#" & CRLF;
     vCal = vCal & "DESCRIPTION:#stEvent.description#" & CRLF;
     vCal = vCal & "PRIORITY:#stEvent.priority#" & CRLF;
     vCal = vCal & "TRANSP:OPAQUE" & CRLF;
     vCal = vCal & "CLASS:PUBLIC" & CRLF;
     vCal = vCal & "BEGIN:VALARM" & CRLF;
     vCal = vCal & "TRIGGER:-PT30M" & CRLF;  // alert user 30 minutes before meeting begins
     vCal = vCal & "ACTION:DISPLAY" & CRLF;
     vCal = vCal & "DESCRIPTION:Reminder" & CRLF;
     vCal = vCal & "END:VALARM" & CRLF;
     vCal = vCal & "END:VEVENT" & CRLF;
     vCal = vCal & "END:VCALENDAR";
     return Trim(vCal);
 }

---

