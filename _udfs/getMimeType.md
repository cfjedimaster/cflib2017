---
layout: udf
title:  getMimeType
date:   2004-04-21T16:12:52.000Z
library: UtilityLib
argString: "filename"
author: Kenneth Rainey
authorEmail: kip.rainey@incapital.com
version: 1
cfVersion: CF5
shortDescription: Returns mime type and subtype for a file.
tagBased: false
description: |
 getMimeType returns a string containing the mime type and subtype when given a file name and extention.

returnValue: Returns a string.

example: |
 <cfoutput>
 #getMimeType("myMSWordDoc.doc")#
 </cfoutput>

args:
 - name: filename
   desc: File name to examine.
   req: true


javaDoc: |
 /**
  * Returns mime type and subtype for a file.
  * 
  * @param filename      File name to examine. (Required)
  * @return Returns a string. 
  * @author Kenneth Rainey (kip.rainey@incapital.com) 
  * @version 1, April 21, 2004 
  */

code: |
 function getMimeType(filename) {
     var mimeStruct=structNew();
     var fileExtension ="";
     //extract file extension from file name
     fileExtension = Reverse(SpanExcluding(Reverse(fileName),"."));
     //build mime type array
     mimeStruct.ai="application/postscript";
     mimeStruct.aif="audio/x-aiff";
     mimeStruct.aifc="audio/x-aiff";
     mimeStruct.aiff="audio/x-aiff";
     mimeStruct.asc="text/plain";
     mimeStruct.au="audio/basic";
     mimeStruct.avi="video/x-msvideo";
     mimeStruct.bcpio="application/x-bcpio";
     mimeStruct.bin="application/octet-stream";
     mimeStruct.c="text/plain";
     mimeStruct.cc="text/plain";
     mimeStruct.ccad="application/clariscad";
     mimeStruct.cdf="application/x-netcdf";
     mimeStruct.class="application/octet-stream";
     mimeStruct.cpio="application/x-cpio";
     mimeStruct.cpt="application/mac-compactpro";
     mimeStruct.csh="application/x-csh";
     mimeStruct.css="text/css";
     mimeStruct.dcr="application/x-director";
     mimeStruct.dir="application/x-director";
     mimeStruct.dms="application/octet-stream";
     mimeStruct.doc="application/msword";
     mimeStruct.drw="application/drafting";
     mimeStruct.dvi="application/x-dvi";
     mimeStruct.dwg="application/acad";
     mimeStruct.dxf="application/dxf";
     mimeStruct.dxr="application/x-director";
     mimeStruct.eps="application/postscript";
     mimeStruct.etx="text/x-setext";
     mimeStruct.exe="application/octet-stream";
     mimeStruct.ez="application/andrew-inset";
     mimeStruct.f="text/plain";
     mimeStruct.f90="text/plain";
     mimeStruct.fli="video/x-fli";
     mimeStruct.gif="image/gif";
     mimeStruct.gtar="application/x-gtar";
     mimeStruct.gz="application/x-gzip";
     mimeStruct.h="text/plain";
     mimeStruct.hdf="application/x-hdf";
     mimeStruct.hh="text/plain";
     mimeStruct.hqx="application/mac-binhex40";
     mimeStruct.htm="text/html";
     mimeStruct.html="text/html";
     mimeStruct.ice="x-conference/x-cooltalk";
     mimeStruct.ief="image/ief";
     mimeStruct.iges="model/iges";
     mimeStruct.igs="model/iges";
     mimeStruct.ips="application/x-ipscript";
     mimeStruct.ipx="application/x-ipix";
     mimeStruct.jpe="image/jpeg";
     mimeStruct.jpeg="image/jpeg";
     mimeStruct.jpg="image/jpeg";
     mimeStruct.js="application/x-javascript";
     mimeStruct.kar="audio/midi";
     mimeStruct.latex="application/x-latex";
     mimeStruct.lha="application/octet-stream";
     mimeStruct.lsp="application/x-lisp";
     mimeStruct.lzh="application/octet-stream";
     mimeStruct.m="text/plain";
     mimeStruct.man="application/x-troff-man";
     mimeStruct.me="application/x-troff-me";
     mimeStruct.mesh="model/mesh";
     mimeStruct.mid="audio/midi";
     mimeStruct.midi="audio/midi";
     mimeStruct.mif="application/vnd.mif";
     mimeStruct.mime="www/mime";
     mimeStruct.mov="video/quicktime";
     mimeStruct.movie="video/x-sgi-movie";
     mimeStruct.mp2="audio/mpeg";
     mimeStruct.mp3="audio/mpeg";
     mimeStruct.mpe="video/mpeg";
     mimeStruct.mpeg="video/mpeg";
     mimeStruct.mpg="video/mpeg";
     mimeStruct.mpga="audio/mpeg";
     mimeStruct.ms="application/x-troff-ms";
     mimeStruct.msh="model/mesh";
     mimeStruct.nc="application/x-netcdf";
     mimeStruct.oda="application/oda";
     mimeStruct.pbm="image/x-portable-bitmap";
     mimeStruct.pdb="chemical/x-pdb";
     mimeStruct.pdf="application/pdf";
     mimeStruct.pgm="image/x-portable-graymap";
     mimeStruct.pgn="application/x-chess-pgn";
     mimeStruct.png="image/png";
     mimeStruct.pnm="image/x-portable-anymap";
     mimeStruct.pot="application/mspowerpoint";
     mimeStruct.ppm="image/x-portable-pixmap";
     mimeStruct.pps="application/mspowerpoint";
     mimeStruct.ppt="application/mspowerpoint";
     mimeStruct.ppz="application/mspowerpoint";
     mimeStruct.pre="application/x-freelance";
     mimeStruct.prt="application/pro_eng";
     mimeStruct.ps="application/postscript";
     mimeStruct.qt="video/quicktime";
     mimeStruct.ra="audio/x-realaudio";
     mimeStruct.ram="audio/x-pn-realaudio";
     mimeStruct.ras="image/cmu-raster";
     mimeStruct.rgb="image/x-rgb";
     mimeStruct.rm="audio/x-pn-realaudio";
     mimeStruct.roff="application/x-troff";
     mimeStruct.rpm="audio/x-pn-realaudio-plugin";
     mimeStruct.rtf="text/rtf";
     mimeStruct.rtx="text/richtext";
     mimeStruct.scm="application/x-lotusscreencam";
     mimeStruct.set="application/set";
     mimeStruct.sgm="text/sgml";
     mimeStruct.sgml="text/sgml";
     mimeStruct.sh="application/x-sh";
     mimeStruct.shar="application/x-shar";
     mimeStruct.silo="model/mesh";
     mimeStruct.sit="application/x-stuffit";
     mimeStruct.skd="application/x-koan";
     mimeStruct.skm="application/x-koan";
     mimeStruct.skp="application/x-koan";
     mimeStruct.skt="application/x-koan";
     mimeStruct.smi="application/smil";
     mimeStruct.smil="application/smil";
     mimeStruct.snd="audio/basic";
     mimeStruct.sol="application/solids";
     mimeStruct.spl="application/x-futuresplash";
     mimeStruct.src="application/x-wais-source";
     mimeStruct.step="application/STEP";
     mimeStruct.stl="application/SLA";
     mimeStruct.stp="application/STEP";
     mimeStruct.sv4cpio="application/x-sv4cpio";
     mimeStruct.sv4crc="application/x-sv4crc";
     mimeStruct.swf="application/x-shockwave-flash";
     mimeStruct.t="application/x-troff";
     mimeStruct.tar="application/x-tar";
     mimeStruct.tcl="application/x-tcl";
     mimeStruct.tex="application/x-tex";
     mimeStruct.texi="application/x-texinfo";
     mimeStruct.texinfo="application/x-texinfo";
     mimeStruct.tif="image/tiff";
     mimeStruct.tiff="image/tiff";
     mimeStruct.tr="application/x-troff";
     mimeStruct.tsi="audio/TSP-audio";
     mimeStruct.tsp="application/dsptype";
     mimeStruct.tsv="text/tab-separated-values";
     mimeStruct.txt="text/plain";
     mimeStruct.unv="application/i-deas";
     mimeStruct.ustar="application/x-ustar";
     mimeStruct.vcd="application/x-cdlink";
     mimeStruct.vda="application/vda";
     mimeStruct.viv="video/vnd.vivo";
     mimeStruct.vivo="video/vnd.vivo";
     mimeStruct.vrml="model/vrml";
     mimeStruct.wav="audio/x-wav";
     mimeStruct.wrl="model/vrml";
     mimeStruct.xbm="image/x-xbitmap";
     mimeStruct.xlc="application/vnd.ms-excel";
     mimeStruct.xll="application/vnd.ms-excel";
     mimeStruct.xlm="application/vnd.ms-excel";
     mimeStruct.xls="application/vnd.ms-excel";
     mimeStruct.xlw="application/vnd.ms-excel";
     mimeStruct.xml="text/xml";
     mimeStruct.xpm="image/x-xpixmap";
     mimeStruct.xwd="image/x-xwindowdump";
     mimeStruct.xyz="chemical/x-pdb";
     mimeStruct.zip="application/zip";
     if(structKeyExists(mimeStruct,fileExtension)) return mimeStruct[fileExtension];
     else return "unknown/unknown";
 }

---

