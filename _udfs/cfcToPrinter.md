---
layout: udf
title:  cfcToPrinter
date:   2005-08-30T21:04:32.000Z
library: UtilityLib
argString: "cfcType[, outputType]"
author: Jared Rypka-Hauer
authorEmail: jared@web-relevant.com
version: 1
cfVersion: CF7
shortDescription: Given the fully-qualified path of a CFC, it renders the cfcexplorer.getcfcashtml() output to html, flahspaper, or PDF for printing as reference.
description: |
 This UDF takes a fully-qualified CFC name (i.e. &quot;CFIDE.componentutils.cfcexplorer&quot;) as the only required parameter and displays the results of cfcexplorer.cfc's getCfcAsHtml() function as HTML, FlashPaper, or PDF.

returnValue: Returns either a string or binary data.

example: |
 <cfcontent type="application/x-shockwave-flash" reset="yes" variable="#cfcToPrinter('CFIDE.componentutils.cfcexplorer')#" />

args:
 - name: cfcType
   desc: The CFC type.
   req: true
 - name: outputType
   desc: Can be html, flashpaper, or pdf. Defaults to flashpaper.
   req: false


javaDoc: |
 <!---
  Given the fully-qualified path of a CFC, it renders the cfcexplorer.getcfcashtml() output to html, flahspaper, or PDF for printing as reference.
  
  @param cfcType      The CFC type. (Required)
  @param outputType      Can be html, flashpaper, or pdf. Defaults to flashpaper. (Optional)
  @return Returns either a string or binary data. 
  @author Jared Rypka-Hauer (jared@web-relevant.com) 
  @version 1, August 30, 2005 
 --->

code: |
 <cffunction name="cfcToPrinter" access="public" output="false"  returntype="any">
     <cfargument name="cfcType" type="string" required="true" />
     <cfargument name="outputType" type="string" required="false" default="flashPaper" />
     <cfset var myCfc = structNew()>
     <cfset var myExplorer =  createObject("component","CFIDE.componentutils.cfcexplorer")>
     <cfset var cfcDocument = "">
     <cfset var cfceData = "">
 
     <cfset myCfc.name = arguments.cfcType>
     <cfset myCfc.path = "/" & replace(myCfc.name,".","/","all") & ".cfc">
 
     <!--- Trap CFCExplorer's output --->
     <cfsavecontent  variable="cfceData">
         <cfoutput>#myExplorer.getcfcinhtml(myCfc.name,myCfc.path)#</cfoutput>
     </cfsavecontent>
 
     <!--- Clean up the HTML a bit... there's a lotta crap in that output  stream... --->
     <cfset cfceData = reReplace(cfceData,"\t*?\n","","all")>
     <cfset cfceData = reReplace(cfceData,"\s{2,}",chr(10),"all")>
 
     <!--- Switch up the output stream based on outputType argument --->
     <cfswitch expression="#arguments.outputType#">
         <cfcase value="html">
             <!--- Return tidied HTML for cfoutputting --->
             <cfreturn cfceData />
         </cfcase>
         <cfcase value="flashpaper,pdf">
             <!--- Return !! object !! (use cfcontent to set the right mime  type!!) --->
             <cfdocument fontembed="true" name="cfcDocument"  format="#arguments.outputType#">
                 <cfoutput>#cfceData#</cfoutput>
             </cfdocument>
             <cfreturn cfcDocument />
         </cfcase>
     <cfdefaultcase>
         <cfthrow message="Invalid data for argument outputType:  #arguments.outputType#"
             detail="Your choices for outputType are pdf, flashpaper, or html." />
     </cfdefaultcase>
     </cfswitch>
 </cffunction>

---

