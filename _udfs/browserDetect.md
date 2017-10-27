---
layout: udf
title:  browserDetect
date:   2011-10-11T03:57:12.000Z
library: UtilityLib
argString: "[UserAgent]"
author: John Bartlett
authorEmail: jbartlett@strangejourney.net
version: 5
cfVersion: CF8
shortDescription: Detects 130+ browsers.
tagBased: false
description: |
 Detects what browser the user is using and version number. If the HTTP_USER_AGENT is stripped by a firewall or unknown (edited) Agent ID string, an &quot;Unknown&quot; is returned.

returnValue: Returns a string.

example: |
 <cfoutput>#browserDetect()#</cfoutput>

args:
 - name: UserAgent
   desc: User agent string to parse. Defaults to cgi.http_user_agent.
   req: false


javaDoc: |
 /**
  * Detects 130+ browsers.
  * v2 by Daniel Harvey, adds Flock/Chrome and Safari fix.         
  * v5 fix by RCamden based on bug found by Jeff Mayer
  * 
  * @param UserAgent      User agent string to parse. Defaults to cgi.http_user_agent. (Optional)
  * @return Returns a string. 
  * @author John Bartlett (jbartlett@strangejourney.net) 
  * @version 5, October 10, 2011 
  */

code: |
 function browserDetect() {
 
     // Default User Agent to the CGI browser string
     var UserAgent=CGI.HTTP_USER_AGENT;
     
     // Regex to parse out version numbers
     var VerNo="/?v?_? ?v?[\(?]?([A-Z0-9]*\.){0,9}[A-Z0-9\-.]*(?=[^A-Z0-9])";
     
     // List of browser names
     var BrowserList="";
     
     // Identified browser info
     var BrowserName="";
     var BrowserVer="";
     
     // Working variables
     var Browser="";
     var tmp="";
     var tmp2="";
     var x=0;
     
     
     // If a value was passed to the function, use it as the User Agent
     if (ArrayLen(Arguments) EQ 1) UserAgent=Arguments[1];
     
     // Allow regex to match on EOL and instring
     UserAgent=UserAgent & " ";
     
     // Browser List (Allows regex - see BlackBerry for example)
     BrowserList="1X|Amaya|Ubuntu APT-HTTP|AmigaVoyager|Android|Arachne|Amiga-AWeb|Arora|Bison|Bluefish|Browsex|Camino|Check&Get|Chimera|Chrome|Contiki|cURL|Democracy|" &
                 "Dillo|DocZilla|edbrowse|ELinks|Emacs-W3|Epiphany|Galeon|Minefield|Firebird|Phoenix|Flock|IceApe|IceWeasel|IceCat|Gnuzilla|" &
                 "Google|Google-Sitemaps|HTTPClient|HP Web PrintSmart|IBrowse|iCab|ICE Browser|Kazehakase|KKman|K-Meleon|Konqueror|Links|Lobo|Lynx|Mosaic|SeaMonkey|" &
                 "muCommander|NetPositive|Navigator|NetSurf|OmniWeb|Acorn Browse|Oregano|Prism|retawq|Shiira Safari|Shiretoko|Sleipnir|Songbird|Strata|Sylera|" &
                 "ThunderBrowse|W3CLineMode|WebCapture|WebTV|w3m|Wget|Xenu_Link_Sleuth|Oregano|xChaos_Arachne|WDG_Validator|W3C_Validator|" &
                 "Jigsaw|PLAYSTATION 3|PlayStation Portable|IPD|" &
                 "AvantGo|DoCoMo|UP.Browser|Vodafone|J-PHONE|PDXGW|ASTEL|EudoraWeb|Minimo|PLink|NetFront|Xiino|";
                 // Mobile strings
                 BrowserList=BrowserList & "iPhone|Vodafone|J-PHONE|DDIPocket|EudoraWeb|Minimo|PLink|Plucker|NetFront|PIE|Xiino|" &
                 "Opera Mini|IEMobile|portalmmm|OpVer|MobileExplorer|Blazer|MobileExplorer|Opera Mobi|BlackBerry\d*[A-Za-z]?|" &
                 "PPC|PalmOS|Smartphone|Netscape|Opera|Safari|Firefox|MSIE|HP iPAQ|LGE|MOT-[A-Z0-9\-]*|Nokia|";
     
                 // No browser version given
                 BrowserList=BrowserList & "AlphaServer|Charon|Fetch|Hv3|IIgs|Mothra|Netmath|OffByOne|pango-text|Avant Browser|midori|Smart Bro|Swiftfox";
     
                 // Identify browser and version
     Browser=REMatchNoCase("(#BrowserList#)/?#VerNo#",UserAgent);
     
     if (ArrayLen(Browser) GT 0) {
     
         if (ArrayLen(Browser) GT 1) {
     
             // If multiple browsers detected, delete the common "spoofed" browsers
             if (Browser[1] EQ "MSIE 6.0" AND Browser[2] EQ "MSIE 7.0") ArrayDeleteAt(Browser,1);
             if (Browser[1] EQ "MSIE 7.0" AND Browser[2] EQ "MSIE 6.0") ArrayDeleteAt(Browser,2);
             tmp2=Browser[ArrayLen(Browser)];
     
             for (x=ArrayLen(Browser); x GTE 1; x=x-1) {
                 tmp=Rematchnocase("[A-Za-z0-9.]*",Browser[x]);
                 if (ListFindNoCase("Navigator,Netscape,Opera,Safari,Firefox,MSIE,PalmOS,PPC",tmp[1]) GT 0) ArrayDeleteAt(Browser,x);
             }
     
             if (ArrayLen(Browser) EQ 0) Browser[1]=tmp2;
         }
     
         // Seperate out browser name and version number
         tmp=Rematchnocase("[A-Za-z0-9. _\-&]*",Browser[1]);
 
         Browser=tmp[1];
     
         if (ArrayLen(tmp) EQ 2) BrowserVer=tmp[2];
     
         // Handle "Version" in browser string
         tmp=REMatchNoCase("Version/?#VerNo#",UserAgent);
         if (ArrayLen(tmp) EQ 1) {
             tmp=Rematchnocase("[A-Za-z0-9.]*",tmp[1]);
             //hack added by Camden to try better handle weird UAs
             if(arrayLen(tmp) eq 2) BrowserVer=tmp[2];
             else browserVer=tmp[1];
         }
     
         // Handle multiple BlackBerry browser strings
         if (Left(Browser,10) EQ "BlackBerry") Browser="BlackBerry";
     
         // Return result
         return Browser & " " & BrowserVer;
     
     }
     
     // Unable to identify browser
     return "Unknown";
 
 }

oldId: 1313
---

