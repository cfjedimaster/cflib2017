---
layout: udf
title:  scientificFormat
date:   2006-07-12T22:30:02.000Z
library: MathLib
argString: "n[, sigdigits]"
author: Tedd Van Diest
authorEmail: tedd@tedd.us
version: 1
cfVersion: CF6
shortDescription: This function formats a big decimal to scientific notation.
tagBased: false
description: |
 This UDF utilizes the java.text.DecimalFormat and java.text.BigDecimal Java classes
 to format a large number into scientific notation. There are two arguments that you can
 pass. (n) A large number which is required and the second arguments is significant digits
 and is not required. The default significant digits are 2.

returnValue: Returns a number.

example: |
 <cfscript>
     frequency = 99.5; // Frequency MHz
     c = 299792458; // Speed of light in meters per second
     v = frequency*(10^6); // Convert MHz to Hz
     w = c/v; // Wavelength in meters
 </cfscript>
 
 <pre>
 <cfoutput>
 Sample: Wavelength of #frequency# FM's radio frequency (#frequency# MHz).
 
 Speed of light (m/sec): #c#
 ScientificFormat(#c#) = #ScientificFormat(c)# (m/sec).
 
 Frequency: 99.5 MHz (#v# Hz).
 ScientificFormat(#v#,2) = #ScientificFormat(v,2)# (Hz).
 
 Wavelength of frequency in meters: #w#
 ScientificFormat(#w#,2) = #ScientificFormat(w,2)# (meters).
 </cfoutput>
 </pre>

args:
 - name: n
   desc: The number to format.
   req: true
 - name: sigdigits
   desc: Number of significant digits. Defaults to 2.
   req: false


javaDoc: |
 /**
  * This function formats a big decimal to scientific notation.
  * 
  * @param n      The number to format. (Required)
  * @param sigdigits      Number of significant digits. Defaults to 2. (Optional)
  * @return Returns a number. 
  * @author Tedd Van Diest (tedd@tedd.us) 
  * @version 1, July 12, 2006 
  */

code: |
 function scientificFormat(n,m) {
     // init result var
     var result = "";
     // Create DecimalFormat object and initialize it with our mask.
     var df = createObject("java","java.text.DecimalFormat").init(m);
     // Create BigDecimal object and initialize it with our number.
     var bd = createObject("java","java.math.BigDecimal").init(n);
     // Format our number using our mask.
     result = df.format(bd);
     // Return results.
     return result;
 }

---

