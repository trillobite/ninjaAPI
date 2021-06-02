
var dateUtils = require('../../../../utilities/dates');
var numUtils = require('../../../../utilities/numbers');
var strUtils = require('../../../../utilities/strings');

module.exports = function(data) {

  
  const sectionEventSteps = (events) => {
    return events && events.length > 0 ?
      `"Event Steps"`
      : "{}"
  };
  const sectionRentalItems = (rentalItems) => {
    return rentalItems && rentalItems.length > 0 ?
      `"Rental Items"`
      : "{}"
  };

  let jsonDef = `
  {

  "pageSize": "letter",
  "pageOrientation":  "landscape",
  "pageMargins": [ 18, 18, 18, 18 ],
  "content": [
      {
        "alignment": "justify",
        "columns": [
          {
            "stack": [
              { "text": "Customer", "style": ["fontSize16", "bold"] },
              { "text": ${`"${data.customer.firstName} ${data.customer.lastName}"`}, "style": ["fontSize12"] }
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
              { "text": "Event Details", "style": ["fontSize16", "bold"] },
              { "text": ${`"Event Name: ${data.eventName}"`}, "style": [] },
              { "text": ${`"Event Date: ${
                dateUtils.dateFormat1(data.eventDate)
              }"`}, "style": [] },
              { "text": ${`"Nature of Event: ${data.natureOfEvent}"`}, "style": [] }
            ]
          }
        ]
      },
      {"text": "Menu Items", "style": ["fontSize16", "marginTopBottom18"]},
      {
        "style": "tableExample",
        "table": {
          "widths": ["*", 72, 72, 72],
          "body": [
            ["Menu Item", "Quantity", "Price", "Extended"],
            ${data.menuItems.map(mi => {
              return `[
                { "stack": [ { "text": "${mi.name}", "style": ["bold"] }, { "text": "${strUtils.stripNewLines(mi.description)}" } ] },
                {"text": "${mi.quantity}", "style": []},
                {"text": "${numUtils.convertToCurrencyString(mi.price)}", "style": []},
                {"text": "${numUtils.convertToCurrencyString(mi.quantity * mi.price)}", "style": []}
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

  let docDef = JSON.parse(jsonDef);
  docDef.styles = {
		header: {
			fontSize: 18,
			bold: true,
			alignment: "right",
			margin: [0, 190, 0, 80]
		},
		subheader: {
			fontSize: 14
		},
		superMargin: {
			margin: [20, 0, 40, 0],
			fontSize: 15
    },
    marginTopBottom18: {
      margin: [0, 18]
    },
		tableExample: {
			margin: [0, 5, 0, 15]
		},
		tableHeader: {
			bold: true,
			fontSize: 13,
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