---
layout: udf
title:  xmlToJson
date:   2009-02-27T21:15:56.000Z
library: DataManipulationLib
argString: "[xml][, includeFormatting]"
author: Tony Felice
authorEmail: tfelice@reddoor.biz
version: 0
cfVersion: CF8
shortDescription: Converts valid xml and valid xhtml to json
tagBased: true
description: |
 xmlToJson uses an integrated xsl template (xslt) and xmlTransform() to convert valid markup to JSON. Because of the possible combinations of attribute and node text, the JSON is structured in a very similar fashion as xmlParse.  The JSON result for a node will contain the following keys: text; attributes; [children]. Text is always a simple value. Arguments will be a struct, and is present whether the node has attributes or not. The structure will repeat within [children] for the length of the tree.  This function should work for any well-formed and valid xml/xhtml

returnValue: Returns a string.

example: |
 <!--- XML example: --->
 <cfsavecontent variable="xml"><?xml version="1.0" encoding="ISO-8859-1"?>
     <root arg="arg_root">text_root
         <depth1node1 d1n1a1="d1n1a1">
             text_d1n1
             <depth2node1 d2n1a1="d2n1a1" d2n1a2="d2n1a2">
                 text_d2n1
                 <depth3nodearr d3naa1="d3naa1" d3naa2="d3naa2" d3naa3="d3naa3">
                     text_d3na
                 </depth3nodearr>
                 <depth3nodearr d3naa1="d3naa1" d3naa2="d3naa2" d3naa3="d3naa3">
                     text_d3na
                 </depth3nodearr>                
             </depth2node1>
             <depth2node2 d2n2a1="d2n2a1" d2n2a2="d2n2a2" d2n2a3="d2n2a3">
                 text_d2n2
             </depth2node2>
         </depth1node1>
     </root>
 </cfsavecontent>
 <cfdump var="#xmlToJson(xml)#">
 <cfdump var="#xmlParse(xml)#">
 
 <!--- XHTML example: --->
 <cfhttp url="http://www.xhtmlvalid.com/demo/"/>
 <cfdump var="#xmlToJson(cfhttp.filecontent)#">
 <cfdump var="#xmlParse(cfhttp.filecontent)#">

args:
 - name: xml
   desc: XML to convert.
   req: false
 - name: includeFormatting
   desc: Boolean value that determines if tabs, line feeds, and carriage returns should be preserved. Defaults to false.
   req: false


javaDoc: |
 <!---
  Converts valid xml and valid xhtml to json
  
  @param xml      XML to convert. (Optional)
  @param includeFormatting      Boolean value that determines if tabs, line feeds, and carriage returns should be preserved. Defaults to false. (Optional)
  @return Returns a string. 
  @author Tony Felice (tfelice@reddoor.biz) 
  @version 0, February 27, 2009 
 --->

code: |
 <cffunction name="xmlToJson" output="false" returntype="any" hint="convert xml to JSON">
         <cfargument name="xml" default="" required="false" hint="raw xml"/>
         <cfargument name="includeFormatting" type="boolean" default="false" required="false" hint="whether or not to maintain and encode tabs, linefeeds and carriage returns"/>
         <cfset var result ="">
         <cfset var xsl ="">
         <cfsavecontent variable="xsl">
             <?xml version="1.0" encoding="UTF-8"?>
             <xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
                 <xsl:output indent="no" omit-xml-declaration="yes" method="text" encoding="UTF-8" media-type="application/json"/>
                 <xsl:strip-space elements="*"/>
             
                 <!-- used to identify unique children in Muenchian grouping, credit Martynas Jusevicius http://www.xml.lt -->
                 <xsl:key name="elements-by-name" match="@* | *" use="concat(generate-id(..), '@', name(.))"/>
             
                 <!-- string -->
                 <xsl:template match="text()">
                     <xsl:call-template name="processValues">
                          <xsl:with-param name="s" select="."/>
                     </xsl:call-template>
                 </xsl:template>
             
                 <!-- text values (from text nodes and attributes) -->
                 <xsl:template name="processValues">
                     <xsl:param name="s"/>
                     <xsl:choose>
                         <!-- number -->
                         <xsl:when test="not(string(number($s))='NaN')">
                             <xsl:value-of select="$s"/>
                         </xsl:when>            
                         <!-- boolean -->
                         <xsl:when test="translate($s,'TRUE','true')='true'">true</xsl:when>
                         <xsl:when test="translate($s,'FALSE','false')='false'">false</xsl:when>            
                         <!-- string -->
                         <xsl:otherwise>
                             <xsl:call-template name="escapeArtist">
                                 <xsl:with-param name="s" select="$s"/>
                             </xsl:call-template>
                         </xsl:otherwise>            
                     </xsl:choose>
                 </xsl:template>
             
                 <!-- begin filter chain -->
                 <xsl:template name="escapeArtist">
                     <xsl:param name="s"/>
                     "
                     <xsl:call-template name="escapeBackslash">
                         <xsl:with-param name="s" select="$s"/>
                     </xsl:call-template>
                     "
                 </xsl:template>
             
                 <!-- escape the backslash (\) before everything else. -->
                 <xsl:template name="escapeBackslash">
                     <xsl:param name="s"/>
                     <xsl:choose>
                         <xsl:when test="contains($s,'\')">
                             <xsl:call-template name="escapeQuotes">
                                 <xsl:with-param name="s" select="concat(substring-before($s,'\'),'\\')"/>
                             </xsl:call-template>
                             <xsl:call-template name="escapeBackslash">
                                 <xsl:with-param name="s" select="substring-after($s,'\')"/>
                             </xsl:call-template>
                         </xsl:when>
                         <xsl:otherwise>
                             <xsl:call-template name="escapeQuotes">
                                 <xsl:with-param name="s" select="$s"/>
                             </xsl:call-template>
                         </xsl:otherwise>
                     </xsl:choose>
                 </xsl:template>
             
                 <!-- escape the double quote ("). -->
                 <xsl:template name="escapeQuotes">
                     <xsl:param name="s"/>
                     <xsl:choose>
                         <xsl:when test="contains($s,'&quot;')">
                             <xsl:call-template name="encoder">
                                 <xsl:with-param name="s" select="concat(substring-before($s,'&quot;'),'\&quot;')"/>
                             </xsl:call-template>
                             <xsl:call-template name="escapeQuotes">
                                 <xsl:with-param name="s" select="substring-after($s,'&quot;')"/>
                             </xsl:call-template>
                         </xsl:when>
                         <xsl:otherwise>
                             <xsl:call-template name="encoder">
                                 <xsl:with-param name="s" select="$s"/>
                             </xsl:call-template>
                         </xsl:otherwise>
                     </xsl:choose>
                 </xsl:template>
             
                 <!-- encode tab, line feed and/or carriage return-->
                 <xsl:template name="encoder">
                     <xsl:param name="s"/>
                     <xsl:choose>
                         <!-- tab -->
                         <xsl:when test="contains($s,'&#x9;')">
                             <xsl:call-template name="encoder">
                                 <xsl:with-param name="s" select="concat(substring-before($s,'&#x9;'),'<cfoutput>#iif(arguments.includeFormatting,DE("\t"),DE(" "))#</cfoutput>',substring-after($s,'&#x9;'))"/>
                             </xsl:call-template>
                         </xsl:when>            
                         <!-- line feed -->
                         <xsl:when test="contains($s,'&#xA;')">
                             <xsl:call-template name="encoder">
                                 <xsl:with-param name="s" select="concat(substring-before($s,'&#xA;'),'<cfoutput>#iif(arguments.includeFormatting,DE("\n"),DE(" "))#</cfoutput>',substring-after($s,'&#xA;'))"/>
                             </xsl:call-template>
                         </xsl:when>            
                         <!-- carriage return -->
                         <xsl:when test="contains($s,'&#xD;')">
                             <xsl:call-template name="encoder">
                                 <xsl:with-param name="s" select="concat(substring-before($s,'&#xD;'),'<cfoutput>#iif(arguments.includeFormatting,DE("\r"),DE(" "))#</cfoutput>',substring-after($s,'&#xD;'))"/>
                             </xsl:call-template>
                         </xsl:when>
                         <xsl:otherwise><xsl:value-of select="$s"/></xsl:otherwise>
                     </xsl:choose>
                 </xsl:template>
                 
                 <!-- main handler template
                     creates a struct containing: the node text(); struct of attributes; and set a struct key for any node children. 
                     this template then drills into the children, repeating itself until complete
                 -->
                 <xsl:template name="processNode">
                     {
                         "text":    
                         <xsl:call-template name="escapeArtist">
                             <xsl:with-param name="s" select="key('elements-by-name', concat(generate-id(..), '@', name(.)))/text()"/>
                         </xsl:call-template>
                         ,"attributes":{                
                             <xsl:for-each select="@*">
                                 <xsl:call-template name="escapeArtist">
                                     <xsl:with-param name="s" select="name()"/>
                                 </xsl:call-template>
                                 :                        
                                 <xsl:call-template name="processValues">
                                     <xsl:with-param name="s" select="."/>
                                 </xsl:call-template>
                                 <xsl:if test="position() &lt; count(parent::node()/attribute::*)">
                                     ,
                                 </xsl:if>
                             </xsl:for-each>
                         }
                         <!-- drill down the tree -->
                         <xsl:for-each select="*[generate-id(.) = generate-id(key('elements-by-name', concat(generate-id(..), '@', name(.))))]">
                             ,
                             <xsl:call-template name="escapeArtist">
                                 <xsl:with-param name="s" select="name()"/>
                             </xsl:call-template>
                             :                        
                             <xsl:apply-templates select="."/>                
                         </xsl:for-each>
                     }
                 </xsl:template>
                 
                 <!-- main parser
                     basically a node 'loop' - performed once for all matches of *, so once for each node including the root.
                     note: this loop has no knowledge of other iterations it may have performed.
                 -->
                 <xsl:template match="*">
                     <!-- determine whether any peers share the node name, so we can spool off into 'array mode' -->
                     <xsl:variable name="isArray" select="count(key('elements-by-name', concat(generate-id(..), '@', name(.)))) &gt; 1"/>
                     
                     <xsl:if test="count(ancestor::node()) = 1"><!-- begin the root node-->
                         { 
                         <xsl:call-template name="escapeArtist">
                             <xsl:with-param name="s" select="name()"/>
                         </xsl:call-template>
                         :        
                     </xsl:if>                
                     
                     <xsl:if test="not($isArray)">
                         <xsl:call-template name="processNode">
                             <xsl:with-param name="s" select="."/>
                         </xsl:call-template>
                     </xsl:if>                
                     <xsl:if test="$isArray">
                         [
                             <xsl:apply-templates select="key('elements-by-name', concat(generate-id(..), '@', name(.)))" mode="array"/>
                         ]
                     </xsl:if>        
                     <xsl:if test="count(ancestor::node()) = 1">}</xsl:if><!-- close the root node -->        
                 </xsl:template>
                 
                 <!-- array template called from main parser -->
                 <xsl:template match="*" mode="array">    
                     <xsl:call-template name="processNode">
                         <xsl:with-param name="s" select="."/>
                     </xsl:call-template>
                     <xsl:if test="position() != last()">,</xsl:if>                
                 </xsl:template>
                 
             </xsl:stylesheet>
         </cfsavecontent>
         <cfset xsl = xmlParse(reReplace(xsl,'([\s\S\w\W]*)(<\?xml)','\2','all'))>
         <cfscript>        
             result = arguments.xml;
             result = reReplace(result,'([\s\S\w\W]*)(<\?xml)','\2','all');
             result = xmlTransform(trim(result),xsl);
             return result;
         </cfscript>
     </cffunction>

---

