---
layout: udf
title:  getHostAndTLD
date:   2010-10-29T14:47:05.000Z
library: NetLib
argString: "domain"
author: Patrick Heppler
authorEmail: p.heppler@fusionality.de
version: 2
cfVersion: CF5
shortDescription: Get the TLD and Hostname from FQDN.
tagBased: false
description: |
 Returns the Hostname and TLD from a FQDN.

returnValue: Returns a struct with hostname and toplevel domain.

example: |
 <cfset domain="example.co.uk">
 <cfdump var="#GetHostAndTLD(domain)#">
 
 Returns a struct.
 result.hostname: example
 result.tld: co.uk

args:
 - name: domain
   desc: Full Qualified Domain Name.
   req: true


javaDoc: |
 /**
  * Get the TLD and Hostname from FQDN.
  * v2 by Ray - just added a var scope
  * 
  * @param domain      Full Qualified Domain Name. (Required)
  * @return Returns a struct with hostname and toplevel domain. 
  * @author Patrick Heppler (p.heppler@fusionality.de) 
  * @version 2, October 29, 2010 
  */

code: |
 function getHostAndTLD(domain) {
 var result=structnew();
 if (len(domain) lte 0) return false;
        result.hostname=listfirst(domain,".");
        if(listlen(domain,".") gt 2){
                result.tld=listgetat(domain,2,".")&"."&listgetat(domain,3,".");
                }
        else{
                result.tld=listlast(domain,".");
                }
        return result;
 }

---

