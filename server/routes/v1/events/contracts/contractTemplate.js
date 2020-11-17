
var dateUtils = require('../../../../utilities/dates');
var numUtils = require('../../../../utilities/numbers');
var strUtils = require('../../../../utilities/strings');

module.exports = function (data) {

  // console.log("pdf data:", escape(data.notes));

  const sectionEventSteps = (events) => {
    return events && events.length > 0 ?
      `"Event Steps"`
      : "{}"
  };
  const sectionRentalItems = (rentalItems) => {

    let tmp = (arr) => {
      console.log("rentalItems:", rentalItems);
      return arr.map((ri) => {
        console.log("rentalItem:", ri);
        return `[
              { "stack": [ { "text": "${ri.name}", "style": ["bold", "fontSize10"] }] },
              {"text": "${ri.quantity}", "style": ["fontSize8"]},
              {"text": "${numUtils.convertToCurrencyString(ri.price)}", "style": ["fontSize8"]},
              {"text": "${numUtils.convertToCurrencyString(ri.quantity * ri.price)}", "style": ["fontSize8"]}
            ]`;
      }).join(",");
    }

    let rentalTable = `{
        "style": "tableExample",
        "table": {
          "widths": ["*", 72, 72, 72],
          "body": [
            ["Rental Item", "Quantity", "Price", "Extended"],
            ${tmp(rentalItems)}
          ]
        }
      }`

    return rentalTable;
  };

  let jsonDef = `
  {

  "pageSize": "LETTER",
  "pageOrientation":  "portrait",
  "pageMargins": [ 18, 18, 18, 18 ],
  "content": [
      {"image": "./bailys_logo.JPG", "alignment": "justify"},
      {
        "alignment": "justify",
        "columns": [
          {
            "stack": [
              { "text": "Customer", "style": ["fontSize12", "bold"] },
              { "text": ${`"${data.customer.firstName} ${data.customer.lastName}"`}, "style": ["fontSize10"] }
              ${(data.customer.phoneNumbers.length > 0) ?
      `,${data.customer.phoneNumbers.map(pn => `{ "text": "${pn.number} (${pn.contactType})", "style": [] }`).join(",")}`
      : ""}
              ${(data.customer.emails.length > 0) ?
      `,${data.customer.emails.map(em => `{ "text": "${em.email} (${em.emailType})", "style": [] }`).join(",")}`
      : ""}
                  
            ]
          },
          {
            "stack": [
              { "text": "Event Details", "style": ["fontSize12", "bold"] },
              { "text": ${`"Event Name: ${data.eventName}"`}, "style": [] },
              { "text": ${`"Event Date: ${
    dateUtils.dateFormat1(data.eventDate)
    }"`}, "style": [] },
              { "text": ${`"Nature of Event: ${data.natureOfEvent}"`}, "style": [] }
            ]
          }
        ]
      },
      {"text": "Notes", "style": ["fontSize12", "marginTopBottom18"]},
      {"text": "${data.notes.replace(/\n/g, "\\n")}", "style": ["fontSize8"]},
      {"text": "Menu Items", "style": ["fontSize12", "marginTopBottom18"]},
      {
        "style": "tableExample",
        "table": {
          "widths": ["*", 72, 72, 72],
          "body": [
            ["Menu Item", "Quantity", "Price", "Extended"],
            ${data.menuItems.map(mi => {
            return `[
                      { "stack": [ 
                        { "text": "${mi.name}", "style": ["bold", "fontSize10"]}, 
                        { "text": "${strUtils.stripNewLines(mi.description)}", "style": ["fontSize8"]} 
                      ]},
                      {"text": "${mi.quantity}", "style": ["fontSize8"]},
                      {"text": "${numUtils.convertToCurrencyString(mi.price)}", "style": ["fontSize8"]},
                      {"text": "${numUtils.convertToCurrencyString(mi.quantity * mi.price)}", "style": ["fontSize8"]}
                    ]`
             }).join(",")}
          ]
        }
      },
      ${sectionEventSteps(data.eventSteps)},
      ${sectionRentalItems(data.rentalItems)}
    ]
  }
  `

  // {"text": "Notes", "style": ["fontSize16", "marginTopBottom18"]},
  // {
  //   "style": "tableExample",
  //   "table": {
  //     "widths": ["*"],
  //     "body": [
  //       ["Notes"],
  //       [{"text": "${escape(data.notes)}", "style": []}],
  //     ]
  //   }
  // },
  console.log("docDef:", jsonDef);

  let docDef = JSON.parse(jsonDef);


  docDef.styles = {
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