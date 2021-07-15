/*
  File: handoutTemplate.js
*/


var dateUtils = require('../../../../utilities/dates');
var numUtils = require('../../../../utilities/numbers');
var strUtils = require('../../../../utilities/strings');

module.exports = function (data) {
  console.log("HERE'S THE DATA!!:", data);

  let def = {
    pageSize: {
      width: 264,
      height: 408,
    },
    pageOrientation: "portrait",
    pageMargins: [9, 9, 9, 9],
    content: [
      { "image": "./bailys_logo.JPG", "alignment": "center" },
    ]
  };

  let addContent = () => {
    if (data.menuItems.length > 0) {
      data.menuItems.map((mi) => {

        let title = {
          text: mi.name,
        };

        let subtitle = {
          text: strUtils.stripNewLines(mi.description),
        };

        if (mi.itemType == "divider") {
          title.text.toUpperCase();
          title.style = ["bold", "alignCenter", "fontSize10", "marginTop5"];
          subtitle.style = ["fontSize6", "alignCenter", "marginBottom5"];
        } else {
          title.style = ["bold", "alignCenter", "fontSize8"];
          subtitle.style = ["fontSize6", "alignCenter"];
        }

        def.content.push(title);
        def.content.push(subtitle);
      });
    }
  };

  //were going to duplicate so we can make a second page!
  let dup = () => {
    def.content.map((obj, index) => {

      let tmp = JSON.parse(JSON.stringify(obj)); //trick to copy byVal, not byRef.

      if(index == 0) {
        //starting a new page on the first copied object.
        tmp.pageBreak = "before";
      }

      def.content.push(tmp);
    });
  };

  //build that stuff!
  addContent();
  dup();

  // console.log("def!!!!!!!!!!!!!!!!!!1", def);

  let docDef = def;


  docDef.styles = {
    alignCenter: {
      alignment: "center",
    },
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
      fontSize: 12,
    },
    superMargin: {
      margin: [20, 0, 40, 0],
      fontSize: 13
    },
    marginTop5: {
      margin: [0, 5, 0, 0],
    },
    marginTop10: {
      margin: [0, 10, 0, 0],
    },
    marginTop20: {
      margin: [0, 20, 0, 0],
    },
    marginBottom5: {
      margin: [0, 0, 0, 5],
    },
    marginBottom10: {
      margin: [0, 0, 0, 10],
    },
    marginBottom20: {
      margin: [0, 0, 0, 20],
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
    fontSize4: {
      fontSize: 4
    },
    fontSize5: {
      fontSize: 5
    },
    fontSize6: {
      fontSize: 6
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