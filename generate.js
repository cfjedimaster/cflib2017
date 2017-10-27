#!/usr/bin/env node

const fs = require('fs');

data = JSON.parse(fs.readFileSync('/mnt/c/websites/static.cflib.org/public/udf/_data.json','UTF-8'));

/*
take a string and replace tabs with 4 spaces
maybe also prefix with " "
*/
function fixForYaml(str) {
	//first tabs
	str = str.replace(/\t/g, '    ');
	//now space in front
	let lines = str.split('\n');
	lines = lines.map((line) => {
		return ' '+line;
	});
	str = lines.join('\n');
	return str;
}

//unlike the above, this is just escaping stuff for values
function formatForYaml(str) {
	str = str.replace(/:/g, "&#58;");
	str = str.replace(/\n/g, " ");
	return str;
}

data.udfs.forEach((udf,idx) => {
	if(idx % 100 === 0) process.stdout.write('#');
	//fix for nullPad
	if(!udf.shortDescription) udf.shortDescription = 'Needs short description.';
	if(!udf.javaDoc) udf.javaDoc = '';
	
	// create argument stuff
	let argString = '';
	let args = '';
	udf.args.forEach((arg, idx) => {

		if(arg.REQ) {
			if(idx !== 0) argString += ', ';
			argString += arg.NAME;
		} else {
			if(idx !== 0) {
				argString += '[, ';
			} else {
				argString += '[';
			}
			argString += arg.NAME + ']';
		}

		args += ` - name: ${arg.NAME}\n`;
		args += `   desc: ${formatForYaml(arg.DESC)}\n`;
		args += `   req: ${arg.REQ?true:false}\n`;
	});


	let template = `---
layout: udf
title:  ${udf.name}
date:   ${udf.lastUpdated}
library: ${udf.library}
argString: "${argString}"
author: ${udf.author}
authorEmail: ${udf.authorEmail}
version: ${udf.version}
cfVersion: ${udf.cfVersion}
shortDescription: ${formatForYaml(udf.shortDescription)}
tagBased: ${udf.tagBased}
description: |
${fixForYaml(udf.description)}

returnValue: ${formatForYaml(udf.returnValue)}

example: |
${fixForYaml(udf.example)}

args:
${args}

javaDoc: |
${fixForYaml(udf.javaDoc)}

code: |
${fixForYaml(udf.code)}

oldId: ${udf.oldId}
---

`;
 	//console.log(template);
	//process.exit(1);
	let filename = './_udfs/'+udf.name+'.md';
	fs.writeFileSync(filename, template, 'UTF-8');
	//console.log(filename);
	//if(idx === 500) process.exit(1);
});
process.stdout.write('\n');