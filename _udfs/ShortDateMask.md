---
layout: udf
title:  ShortDateMask
date:   2002-06-28T11:33:25.000Z
library: DateLib
argString: "[locale]"
author: matthew walker
authorEmail: matthew@cabbagetree.co.nz
version: 1
cfVersion: CF5
shortDescription: Generates a mask for a short date based on the locale.
tagBased: false
description: |
 ShortDateMask returns the appropriate mask for a short date based on the supplied locale. If no locale is supplied as a parameter, the function returns the mask for the current locale. You can then use this mask in a DateFormat() function.
 
 Please note that CFMX now supports a mask of &quot;short&quot; that should be used instead of this UDF. (It doesn't return the mask string however.)

returnValue: Returns a string.

example: |
 <table cellpadding="5">
     <cfoutput>
         <tr>
             <th>Locale</th>
             <th>Mask</th>
             <th>The Date Today</th>
         </tr>    
         <tr>
             <td>(no parameter)</td>
             <td>#ShortDateMask()#</td>
             <td>#DateFormat(Now(), ShortDateMask())#</td>
         </tr>        
         <cfloop index="Locale" list="#Server.ColdFusion.SupportedLocales#"> 
             <tr>
                 <td>#Locale#</td>
                 <td>#ShortDateMask(Locale)#</td>
                 <td>#DateFormat(Now(), ShortDateMask(Locale))#</td>
             </tr>
         </cfloop>
     </cfoutput>
 </table>

args:
 - name: locale
   desc: The locale to use. Defaults to getLocale()
   req: false


javaDoc: |
 /**
  * Generates a mask for a short date based on the locale.
  * 
  * @param locale      The locale to use. Defaults to getLocale() (Optional)
  * @return Returns a string. 
  * @author matthew walker (matthew@cabbagetree.co.nz) 
  * @version 1, June 28, 2002 
  */

code: |
 function ShortDateMask() {
     var Locale = GetLocale();
     var LocaleList = "Dutch (Belgian),Dutch (Standard),English (Australian),English (Canadian),English (New Zealand),English (UK),English (US),French (Belgian),French (Canadian),French (Standard),French (Swiss),German (Austrian),German (Standard),German (Swiss),Italian (Standard),Italian (Swiss),Norwegian (Bokmal),Norwegian (Nynorsk),Portuguese (Brazilian),Portuguese (Standard),Spanish (Mexican),Spanish (Modern),Spanish (Standard),Swedish";
     var MaskList = "d/mm/yyyy,d-m-yyyy,d/mm/yyyy,,dd/mm/yyyy,d/mm/yyyy,dd/mm/yyyy,m/d/yyyy,d/mm/yyyy,yyyy-mm-dd,dd/mm/yyyy,dd.mm.yyyy,dd.mm.yyyy,dd.mm.yyyy,dd.mm.yyyy,dd/mm/yyyy,dd.mm.yyyy,dd.mm.yyyy,dd.mm.yyyy,d/m/yyyy,dd-mm-yyyy,dd/mm/yyyy,dd/mm/yyyy,dd/mm/yyyy,yyyy-mm-dd";
     var ListPos = 0;
     if ( ArrayLen(Arguments) )
         Locale = Arguments[1]; 
     ListPos = ListFindNoCase(LocaleList, Locale);
     if ( ListPos )
         return ListGetAt(MaskList, ListPos);
     else 
         return "";    
 }

oldId: 578
---

