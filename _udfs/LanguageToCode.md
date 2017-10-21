---
layout: udf
title:  LanguageToCode
date:   2004-08-06T09:52:08.000Z
library: StrLib
argString: "language"
author: Neil Robertson-Ravo
authorEmail: neil.robertson-ravo@csd.reedexpo.com
version: 1
cfVersion: CF5
shortDescription: Takes a Language Name (i.e. English) and returns the ISO 669 Two-Letter Language Code (i.e. EN).
description: |
 Takes a Language Name (i.e. English) and returns the ISO 669 Two-Letter Language Code (i.e. EN).

returnValue: Returns a string.

example: |
 <cfoutput>#LanguageToCode("Czech")#</cfoutput>

args:
 - name: language
   desc: Language code.
   req: true


javaDoc: |
 /**
  * Takes a Language Name (i.e. English) and returns the ISO 669 Two-Letter Language Code (i.e. EN).
  * 
  * @param language      Language code. (Required)
  * @return Returns a string. 
  * @author Neil Robertson-Ravo (neil.robertson-ravo@csd.reedexpo.com) 
  * @version 1, August 6, 2004 
  */

code: |
 function languageToCode(language) {
   var languages = "Afar,Abkhazian,Afrikaans,Amharic,Arabic,Assamese,Aymara,Azerbaijani,Bashkir,Byelorussian,Bulgarian,Bihari,Bislama,Bengali ,Bangla,Tibetan,Breton,Catalan,Corsican,Czech,Welsh,Danish,German,Bhutani,Greek,English,English (British),English (American),Esperanto,Spanish,Estonian,Basque,Persian,Finnish,Fiji,Faeroese,French,Frisian,Irish,Gaelic,Gaelic (Scots),Galician,Guarani,Gujarati,Hausa,Hindi,Croatian,Hungarian,Armenian,Interlingua,Interlingue,Inupiak,Indonesian,Icelandic,Italian,Hebrew,Japanese,Yiddish,Javanese,Georgian,Kazakh,Greenlandic,Cambodian,Kannada,Korean,Kashmiri,Kurdish,Kirghiz,Latin,Lingala,Laothian,Lithuanian,Latvian ,Lettish,Malagasy,Maori,Macedonian,Malayalam,Mongolian,Moldavian,Marathi,Malay,Maltese,Burmese,Nauru,Nepali,Dutch,Norwegian,Occitan,Oromo,Afan,Oriya,Punjabi,Polish,Pashto ,Pushto,Portuguese,Quechua,Rhaeto-Romance,Kirundi,Romanian,Russian,Kinyarwanda,Sanskrit,Sindhi,Sangro,Serbo-Croatian,Singhalese,Slovak,Slovenian,Samoan,Shona,Somali,Albanian,Serbian,Siswati,Sesotho,Sudanese,Swedish,Swahili,Tamil,Tegulu,Tajik,Thai,Tigrinya,Turkmen,Tagalog,Setswana,Tonga,Turkish,Tsonga,Tatar,Twi,Ukrainian,Urdu,Uzbek,Vietnamese,Volapuk,Wolof,Xhosa,Yoruba,Chinese,Zulu";
   
   var lCode ="AA,AB,AF,AM,AR,AS,AY,AZ,BA,BE,BG,BH,BI,BN,BN,BO,BR,CA,CO,CS,CY,DA,DE,DZ,EL,EN,EN,EN,EO,ES,ET,EU,FA,FI,FJ,FO,FR,FY,GA,GD,GD,GL,GN,GU,HA,HI,HR,HU,HY,IA,IE,IK,IN,IS,IT,IW,JA,JI,JW,KA,KK,KL,KM,KN,KO,KS,KU,KY,LA,LN,LO,LT,LV,LV,MG,MI,MK,ML,MN,MO,MR,MS,MT,MY,NA,NE,NL,NO,OC,OM,OM,OR,PA,PL,PS,PS,PT,QU,RM,RN,RO,RU,RW,SA,SD,SG,SH,SI,SK,SL,SM,SN,SO,SQ,SR,SS,ST,SU,SV,SW,TA,TE,TG,TH,TI,TK,TL,TN,TO,TR,TS,TT,TW,UK,UR,UZ,VI,VO,WO,XH,YO,ZH,ZU";
 
   if(listFindNoCase(languages,language))
     return listGetAt(lCode,listFindNoCase(languages,language));
 }

---

