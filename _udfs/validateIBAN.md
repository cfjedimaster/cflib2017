---
layout: udf
title:  validateIBAN
date:   2015-01-07T14:58:58.570Z
library: FinancialLib
argString: "IBANnr"
author: Hank van Empel
authorEmail: h.vanempel@s-hertogenbosch.nl
version: 1
cfVersion: CF10
shortDescription: Validates an IBAN number.
tagBased: true
description: |
 Validates an IBAN number.

returnValue: Returns a boolean.

example: |
 <cfoutput>#validateIBAN("NL60INGB0006155045")#</cfoutput><!--- this is a valid IBAN --->
 <br />
 <cfoutput>#validateIBAN("NL58INGA0006155031")#</cfoutput><!--- an invalid IBAN --->

args:
 - name: IBANnr
   desc: IBAN input.
   req: true


javaDoc: |
 <!---
 Validates an IBAN number.
 
 @param IBANnr IBAN input (Required)
 @author Hank van Empel (h.vanempel@s-hertogenbosch.nl)
 @version 1.0, January 7, 2015
 --->

code: |
 <cffunction name="validateIBAN" returntype="boolean" output="no">
     <cfargument name="IBANnr" required="Yes" type="string" /> <!--- input IBAN --->
     <cfset var ci = structNew() />
 
     <!--- remove spaces first from input-IBAN --->
     <cfset arguments.IBANnr = replaceNoCase(arguments.IBANnr," ","","ALL") />
 
     <!--- after spaces are removed, we can do a syntaxcheck, IE. "NL60INGB0001234567" --->
     <cfset ci.syntaxCheck = REFind("[A-Z]{2}[0-9]{2}[A-Z]{4}[0-9]{4}[0-9]{4}[0-9]{2}", arguments.IBANnr) />
 
     <cfif ci.syntaxCheck>
         <cfset ci.IBANnr = arguments.IBANnr />    
         <cfset ci.Result = ci.IBANnr />
     <cfelse> <!--- IBAN failed the syntax-check, so return False --->
         <cfreturn false />
     </cfif>
 
     <!--- our example is "NL60INGB0001234567" --->
     <!--- where "NL" is the country-code
                                        "60" is our control-number
                                        "INGB" is our bank-code
                                        "0001234567" is our accountnumber --->
     <!--- !!! our example is NOT a valid IBAN by the way --->                                  
 
     
     <!--- determine controlnumber; we will use this later on (in our example: "60")--->        
     <cfset ci.submittdeControlNumber = mid(ci.IBANnr, 3, 2) />
     <!--- get first 2 characters, they represent the country-code (in our example: "NL") --->
     <cfset ci.Landcode = left(ci.IBANnr, 2) />
 
     <!--- turn these characters ("NL" in our example) into digits where A=10, B=11 etc. --->
     <!--- to do so we subtract 55 from the character's ASCII-value --->
     <!--- remember, these have to be uppercase --->
     <!--- Example: "AB" becomes 1011, "NL" becomes 2321 --->
     <cfset ci.countryDigits = ((asc(left(ci.Landcode,1))-55)*100) + (asc(right(ci.Landcode,1))-55) /> 
 
     <!--- add 2 zeroes and convert to numeric at the same time by multiplying it with 100--->
     <cfset ci.countryDigits = ci.countryDigits * 100 />
 
     <!--- get the bankcode, in this example "INGB"  (A=10, B=11 etc.) --->
     <cfset ci.Bankcode = Mid(ci.IBANnr, 5, 4 ) />
 
     <!--- convert to digits, where (A=10, B=11 etc.) --->
     <!--- IE. "INGB" becomes 18231611 --->
     <cfset ci.bankDigits = (asc(left(ci.Bankcode, 1)) - 55) & (asc(Mid(ci.Bankcode, 2, 1)) - 55) & (asc(Mid(ci.Bankcode, 3, 1)) - 55) & (asc(Mid(ci.Bankcode, 4, 1)) - 55) />
 
     <!--- replace the bankcode by it's numeric value (ASCII-value minus 55, for each character)
     IE. "INGB" will become "18231611" --->
    <cfset ci.IBANnr = replace(ci.IBANnr, ci.bankcode, ci.bankDigits, "ONE") />
 
     <!--- remove the bankcode and the controlnumber, in our case "NL60" --->
     <cfset ci.IBANnr = Right(ci.IBANnr, Len(ci.IBANnr) -4) />
 
      <!--- concatenate the numbervalue that represents the
     bankname (in this example "INGB") to the accountnumber --->
     <cfset ci.IBANString = ci.IBANnr & ci.countryDigits />
 
     <!--- create a Java.BigDecimal because CF cannot handle such a big number
                in our example that would be 182316110003770857232100 --->
     <cfset ci.bigInt = createObject("java", "java.math.BigDecimal").init(javaCast("string", ci.IBANnr&ci.countryDigits)) />
 
     <!--- all other component have to have the same cast: bigdecimal --->
     <cfset ci.baseNumber = createObject("java", "java.math.BigDecimal").init(javaCast("string", "98" )) />
     <cfset ci.divider = createObject("java", "java.math.BigDecimal").init(javaCast("string", "97" )) />
 
     <!--- take the baseNumber and subtract the remainder after divide by 97--->
     <cfset ci.remainder = ci.baseNumber - ci.bigInt.remainder(ci.divider) />
 
     <!--- return True if the remainder matches the controlNumber (56 in this example) --->
     <cfif ci.submittdeControlNumber EQ ci.remainder>
        <cfreturn true />
     <cfelse>
         <cfreturn false />
     </cfif>
 
 </cffunction>
 

oldId: undefined
---

