---
layout: udf
title:  xmlHumanReadable
date:   2006-03-20T16:16:50.000Z
library: StrLib
argString: "XmlDoc"
author: Steve Bryant
authorEmail: steve@bryantwebconsulting.com
version: 2
cfVersion: CF6
shortDescription: Formats an XML document for readability.
description: |
 This function takes an XML Document (or an XML string) and returns an XML string formatted for readability.

returnValue: Returns a string.

example: |
 <cfsavecontent variable="MyXml"><widgets><widget name="Foo">This is a note<part name="Push &amp; Pull" type="tool">Blah</part><part name="Turn" type="gear"/></widget></widgets></cfsavecontent>
 <cfoutput>#XmlHumanReadable(MyXml)#</cfoutput>

args:
 - name: XmlDoc
   desc: XML document.
   req: true


javaDoc: |
 /**
  * Formats an XML document for readability.
  * update by Fabio Serra to CR code
  * 
  * @param XmlDoc      XML document. (Required)
  * @return Returns a string. 
  * @author Steve Bryant (steve@bryantwebconsulting.com) 
  * @version 2, March 20, 2006 
  */

code: |
 function xmlHumanReadable(XmlDoc) {
     var elem = "";
     var result = "";
     var tab = "    ";
     var att = "";
     var i = 0;
     var temp = "";
     var cr = createObject("java","java.lang.System").getProperty("line.separator");
     
     if ( isXmlDoc(XmlDoc) ) {
         elem = XmlDoc.XmlRoot;//If this is an XML Document, use the root element
     } else if ( IsXmlElem(XmlDoc) ) {
         elem = XmlDoc;//If this is an XML Document, use it as-as
     } else if ( NOT isXmlDoc(XmlDoc) ) {
         XmlDoc = XmlParse(XmlDoc);//Otherwise, try to parse it as an XML string
         elem = XmlDoc.XmlRoot;//Then use the root of the resulting document
     }
     //Now we are just working with an XML element
     result = "<#elem.XmlName#";//start with the element name
     if ( StructKeyExists(elem,"XmlAttributes") ) {//Add any attributes
         for ( att in elem.XmlAttributes ) {
             result = '#result# #att#="#XmlFormat(elem.XmlAttributes[att])#"';
         }
     }
     if ( Len(elem.XmlText) OR (StructKeyExists(elem,"XmlChildren") AND ArrayLen(elem.XmlChildren)) ) {
         result = "#result#>#cr#";//Add a carriage return for text/nested elements
         if ( Len(Trim(elem.XmlText)) ) {//Add any text in this element
             result = "#result##tab##XmlFormat(Trim(elem.XmlText))##cr#";
         }
         if ( StructKeyExists(elem,"XmlChildren") AND ArrayLen(elem.XmlChildren) ) {
             for ( i=1; i lte ArrayLen(elem.XmlChildren); i=i+1 ) {
                 temp = Trim(XmlHumanReadable(elem.XmlChildren[i]));
                 temp = "#tab##ReplaceNoCase(trim(temp), cr, "#cr##tab#", "ALL")#";//indent
                 result = "#result##temp##cr#";
             }//Add each nested-element (indented) by using recursive call
         }
         result = "#result#</#elem.XmlName#>";//Close element
     } else {
         result = "#result# />";//self-close if the element doesn't contain anything
     }
     
     return result;
 }

---

