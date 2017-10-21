---
layout: udf
title:  codeToLanguage
date:   2005-08-10T12:38:16.000Z
library: StrLib
argString: "code"
author: Stephen Lapointe
authorEmail: stephen@waldenstreet.com
version: 1
cfVersion: CF5
shortDescription: Takes an ISO 669 Two-Letter Language Code (e.g., EN) and returns the Language (e.g., English).
description: |
 Simple function, based on LanguageToCode by Neil Robertson-Ravo (neil.robertson-ravo@csd.reedexpo.com), which returns the full name of the language (in English) represented by the ISO 669 Two-Letter Language Code -- the most common system of language reference codes.

returnValue: Returns a string.

example: |
 <cfoutput>#codeToLanguage("NO")#</cfoutput>

args:
 - name: code
   desc: Country code.
   req: true


javaDoc: |
 /**
  * Takes an ISO 669 Two-Letter Language Code (e.g., EN) and returns the Language (e.g., English).
  * 
  * @param code      Country code. (Required)
  * @return Returns a string. 
  * @author Stephen Lapointe (stephen@waldenstreet.com) 
  * @version 1, August 10, 2005 
  */

code: |
 function codeToLanguage(code) {
   var lCode ="AA,AB,AF,AM,AR,AS,AY,AZ,BA,BE,BG,BH,BI,BN,BN,BO,BR,CA,CO,CS,CY,DA,DE,DZ,EL,EN,EN,EN,EO,ES,ET,EU,FA,FI,FJ,FO,FR,FY,GA,GD,GD,GL,GN,GU,HA,HI,HR,HU,HY,IA,IE,IK,IN,IS,IT,IW,JA,JI,JW,KA,KK,KL,KM,KN,KO,KS,KU,KY,LA,LN,LO,LT,LV,LV,MG,MI,MK,ML,MN,MO,MR,MS,MT,MY,NA,NE,NL,NO,OC,OM,OM,OR,PA,PL,PS,PS,PT,QU,RM,RN,RO,RU,RW,SA,SD,SG,SH,SI,SK,SL,SM,SN,SO,SQ,SR,SS,ST,SU,SV,SW,TA,TE,TG,TH,TI,TK,TL,TN,TO,TR,TS,TT,TW,UK,UR,UZ,VI,VO,WO,XH,YO,ZH,ZU";  
   var languages = "Afar,Abkhazian,Afrikaans,Amharic,Arabic,Assamese,Aymara,Azerbaijani,Bashkir,Byelorussian,Bulgarian,Bihari,Bislama,Bengali ,Bangla,Tibetan,Breton,Catalan,Corsican,Czech,Welsh,Danish,German,Bhutani,Greek,English,English (British),English (American),Esperanto,Spanish,Estonian,Basque,Persian,Finnish,Fiji,Faeroese,French,Frisian,Irish,Gaelic,Gaelic (Scots),Galician,Guarani,Gujarati,Hausa,Hindi,Croatian,Hungarian,Armenian,Interlingua,Interlingue,Inupiak,Indonesian,Icelandic,Italian,Hebrew,Japanese,Yiddish,Javanese,Georgian,Kazakh,Greenlandic,Cambodian,Kannada,Korean,Kashmiri,Kurdish,Kirghiz,Latin,Lingala,Laothian,Lithuanian,Latvian ,Lettish,Malagasy,Maori,Macedonian,Malayalam,Mongolian,Moldavian,Marathi,Malay,Maltese,Burmese,Nauru,Nepali,Dutch,Norwegian,Occitan,Oromo,Afan,Oriya,Punjabi,Polish,Pashto ,Pushto,Portuguese,Quechua,Rhaeto-Romance,Kirundi,Romanian,Russian,Kinyarwanda,Sanskrit,Sindhi,Sangro,Serbo-Croatian,Singhalese,Slovak,Slovenian,Samoan,Shona,Somali,Albanian,Serbian,Siswati,Sesotho,Sudanese,Swedish,Swahili,Tamil,Tegulu,Tajik,Thai,Tigrinya,Turkmen,Tagalog,Setswana,Tonga,Turkish,Tsonga,Tatar,Twi,Ukrainian,Urdu,Uzbek,Vietnamese,Volapuk,Wolof,Xhosa,Yoruba,Chinese,Zulu";
 
   if(listFindNoCase(lCode,code)) return listGetAt(languages,listFindNoCase(lCode,code));
 }

---

