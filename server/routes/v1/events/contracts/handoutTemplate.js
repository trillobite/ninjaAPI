/*
  File: handoutTemplate.js
*/


var dateUtils = require('../../../../utilities/dates');
var numUtils = require('../../../../utilities/numbers');
var strUtils = require('../../../../utilities/strings');

module.exports = function (data) {
  console.log("HERE'S THE DATA!!:", data);

  let jsonDef = `
  {

  "pageSize": "A6",
  "pageOrientation":  "portrait",
  "pageMargins": [ 18, 18, 18, 18 ],
  "content": [
      {"image": "./bailys_logo.JPG", "alignment": "justify"}
      ${data.menuItems.length > 0 ? "," + data.menuItems.map(mi => {
        return `{ "text": "${mi.name}", "style": ["bold", "fontSize10"]}, 
            { "text": "${strUtils.stripNewLines(mi.description)}", "style": ["fontSize8"]}`
      }).join(",") : ""}
    ]
  }
  `

  // console.log("docDef:", jsonDef);

  let docDef = JSON.parse(jsonDef);


  docDef.styles = {
    alignRight: {
      alignment: "right",
    },
    header: {
      fontSize: 18,
      bold: true,
      alignment: "right",
      margin: [0, 190, 0, 80]
    },
    subheader: {
      fontSize: 12
    },
    superMargin: {
      margin: [20, 0, 40, 0],
      fontSize: 13
    },
    marginTop10: {
      margin: [0, 10, 0, 0],
    },
    marginTop20: {
      margin: [0, 20, 0, 0],
    },
    marginTopBottom18: {
      margin: [0, 18]
    },
    tableExample: {
      margin: [0, 5, 0, 15]
    },
    tableHeader: {
      bold: true,
      fontSize: 11,
      color: "black"
    },
    bold: {
      bold: true
    },
    italics: {
      italics: true
    },
    fontSize8: {
      fontSize: 8
    },
    fontSize10: {
      fontSize: 10
    },
    fontSize12: {
      fontSize: 12
    },
    fontSize14: {
      fontSize: 14
    },
    fontSize16: {
      fontSize: 16
    }
  }

  return docDef;
}