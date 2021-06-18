
var dateUtils = require('../../../../utilities/dates');
var numUtils = require('../../../../utilities/numbers');
var strUtils = require('../../../../utilities/strings');

module.exports = function (data) {
  console.log("HERE'S THE DATA!!:", data.venues);

  let totals = {
    menuTotal: 0,
    rentTotal: 0,
    tax: 0,
    gratuity: 0,
    discount: 0,
    deposit: 0
  };

  const fees = {
    taxPercent: 0.0875,
    gratuityPercent: 0.2,
  };

  const totalIt = (items) => {
    // console.log("items:", items);
    let total = 0;
    items.map((obj) => {
      if(obj.quantity == undefined) {
        total += obj.price;
      } else {
        total += (obj.quantity * obj.price);
      }
    });
    return total;
  };

  const getMenuTotal = (menuItems) => {
    totals.menuTotal = totalIt(menuItems);
    return totals.menuTotal;
  };

  const getRentTotal = (rentalItems) => {
    totals.rentTotal = totalIt(rentalItems);
    return totals.rentTotal;
  };

  const calcTax = (total) => {
    totals.tax = fees.taxPercent * total;
    return totals.tax;
  };

  const calcGratuity = (total) => {
    totals.gratuity = fees.gratuityPercent * total;
    return totals.gratuity;
  };

  const getTotal = () => {
    let total = ((totals.menuTotal + totals.rentTotal) + totals.tax + totals.gratuity) - totals.discount;
    return total;
  };

  const getTotalDue = () => {
    let totalDue = getTotal();
    totalDue -= totals.deposit;
    return totalDue;
  };

  const getVenues = (arrVenue) => {
    console.log("venues:", arrVenue);
    let str = "";
    arrVenue.map((obj) => {
      if(str.length > 0) {
        str += ",";
      }
      str += obj.name;
    });
    return str;
  };

  // console.log("pdf data:", escape(data.notes));
  const evntFoodTxt = `The following menu items will be available during the event in the assigned amounts. If there is to be a choice of menu items, the below numbers are estimates and the actual amounts will be reconciled at the conclusion of the event.`;
  const endTimeFee = `$50.00`;
  const endTimeTxt = `In order to better serve you, please keep in mind the end time of your party. Due to sequential bookings of parties during peak times (Friday and Saturday and especially durng the holiday season), we require that our guests adhere to the end time of their party so that our staff may prepare the room for the next party. You will be charged a late fee of ${endTimeFee} if your party exceeds the end time by more than 10 minutes.`;
  const paybllingTxt = `A 50% installment (of the minimum food and beverage charge) will be required one week prior to your event. Your final bill will be the minimum food and beverage charge plus tax and 20% gratuity. If your bill exceeds the minimum food and beverage charge as defined above, then you will be charged the actual amount of the food and beverage purchases, plus tax and a 20% gratuity. Credit card payments only. No personal checks are accepted.`;
  const weatherTxt = `For the Front Street Bar and Grill, please be aware that we do not have any contigency plans for incement weather. We do have suspended patio umbrellas and patio heaters for your comfort.`;
  const menPricTxt = `At times the menus and pricing are subject to change. If your previous selections have been replaced, we will work with you to select an alternate substitution. Pricing will revert to the most current pricing.`;

  const sectionEventSteps = (events) => {
    console.log("events:", events);
    return events && events.length > 0 ?
      `"Event Steps"`
      : "{}"
  };

  const sectionRentalItems = (rentalItems) => {

    let tmp = (arr) => {
      console.log("rental!!!!!!!!!!!!!!!!!", arr);
      if(arr == []) {
        return undefined;
      }

      return arr.map((ri) => {
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
            ["Rental Item", "Quantity", "Price", "Extended"]${tmp(rentalItems) ? "," + tmp(rentalItems) : ""}
          ]
        }
      }`

    return rentalItems && rentalTable;
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
              ${(data.customer.phoneNumbers.length > 0) ? `,${data.customer.phoneNumbers.map(pn => `{ "text": "${pn.number} (${pn.contactType})", "style": [] }`).join(",")}` : ""}
              ${(data.customer.emails.length > 0) ? `,${data.customer.emails.map(em => `{ "text": "${em.email} (${em.emailType})", "style": [] }`).join(",")}` : ""}
            ]      
          },
          {
            "stack": [
              { "text": "Event Details", "style": ["fontSize12", "bold"] },
              { "text": ${`"Event Name: ${data.eventName}"`}, "style": [] },
              { "text": ${`"Event Date: ${dateUtils.dateFormat1(data.eventDate)}"`}, "style": [] },
              { "text": ${`"Event Time: ${dateUtils.timeFormat1(data.time)} to ${dateUtils.timeFormat1(data.endTime)}"`}, "style": [] },
              { "text": ${`"Location: ${getVenues(data.venues)}"`}, "style": []},
              { "text": ${`"Nature of Event: ${data.natureOfEvent}"`}, "style": [] }
            ]
          }
        ]
      },
      {"text": "Notes", "style": ["fontSize12", "marginTopBottom18"]},
      {"text": "${data.notes.replace(/\n/g, "\\n")}", "style": ["fontSize8"]},
      {"text": "Menu Items", "style": ["fontSize12", "marginTopBottom18"]},
      {"text": "${evntFoodTxt}", "style": ["fontSize8"]},
      {
        "style": "tableExample",
        "table": {
          "widths": ["*", 72, 72, 72],
          "body": [
            ["Menu Item", "Quantity", "Price", "Extended"]
            ${data.menuItems.length > 0 ? "," + data.menuItems.map(mi => {
            return `[
                      { "stack": [ 
                        { "text": "${mi.name}", "style": ["bold", "fontSize10"]}, 
                        { "text": "${strUtils.stripNewLines(mi.description)}", "style": ["fontSize8"]} 
                      ]},
                      {"text": "${mi.quantity}", "style": ["fontSize8"]},
                      {"text": "${numUtils.convertToCurrencyString(mi.price)}", "style": ["fontSize8"]},
                      {"text": "${numUtils.convertToCurrencyString(mi.quantity * mi.price)}", "style": ["fontSize8"]}
                    ]`
             }).join(",") : ""}
          ]
        }
      },
      ${sectionEventSteps(data.eventSteps)},
      ${sectionRentalItems(data.rentalItems)},
      {
        "style": "tableExample",
        "table": {
          "widths": [140, 75],
          "body": [
              ["Type", "Totals"],
              [{"text": "Food Total", "style": ["fontSize8", "alignRight"]}, {"text": "${numUtils.convertToCurrencyString(getMenuTotal(data.menuItems))}", "style": ["fontSize8"]}],
              [{"text": "Rental Total", "style": ["fontSize8", "alignRight"]}, {"text": "${numUtils.convertToCurrencyString(getRentTotal(data.rentalItems))}", "style": ["fontSize8"]}],
              [{"text": "Tax", "style": ["fontSize8", "alignRight"]}, {"text": "${numUtils.convertToCurrencyString(calcTax(totals.menuTotal + totals.rentTotal))}", "style": ["fontSize8"]}],
              [{"text": "20% Gratuity", "style": ["fontSize8", "alignRight"]}, {"text": "${numUtils.convertToCurrencyString(calcGratuity(totals.menuTotal + totals.rentTotal))}", "style": ["fontSize8"]}],
              [{"text": "Sub Total", "style": ["fontSize8", "alignRight"]}, {"text": "${numUtils.convertToCurrencyString((totals.menuTotal + totals.rentTotal))}", "style": ["fontSize8"]}],
              [{"text": "Discount", "style": ["fontSize8", "alignRight"]}, {"text": "${numUtils.convertToCurrencyString(totals.discount)}", "style": ["fontSize8"]}],
              [{"text": "Total", "style": ["fontSize8", "alignRight"]}, {"text": "${numUtils.convertToCurrencyString(getTotal())}", "style": ["fontSize8"]}],
              [{"text": "Deposit", "style": ["fontSize8", "alignRight"]}, {"text": "${numUtils.convertToCurrencyString(totals.deposit)}", "style": ["fontSize8"]}],
              [{"text": "Total Due", "style": ["fontSize8", "alignRight"]}, {"text": "${numUtils.convertToCurrencyString(getTotalDue())}", "style": ["fontSize8"]}]
          ]
        }
      },
      {"text": "End Time", "style": ["fontSize10", "marginTopBottom18"]},
      {"text": "${endTimeTxt}", "style": ["fontSize8"]},
      {"text": "Payments and Billing", "style": ["fontSize10", "marginTopBottom18"]},
      {"text": "${paybllingTxt}", "style": ["fontSize8"]},
      {"text": "Inclement Weather", "style": ["fontSize10", "marginTopBottom18"]},
      {"text": "${weatherTxt}", "style": ["fontSize8"]},
      {"text": "Menus and Pricing", "style": ["fontSize10", "marginTopBottom18"]},
      {"text": "${menPricTxt}", "style": ["fontSize8"]}
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