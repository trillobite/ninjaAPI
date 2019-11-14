

var pdfMakePrinter = require('pdfmake');
var contractDef = require('./contractTemplate');

module.exports = {
  generate: (template, data) => {
    console.log(data);
    return new Promise(function (resolve, reject) {
      try {

        var fonts = {
          Roboto: {
            normal: 'fonts/Roboto-Regular.ttf',
            bold: 'fonts/Roboto-Medium.ttf',
            italics: 'fonts/Roboto-Italic.ttf',
            bolditalics: 'fonts/Roboto-MediumItalic.ttf'
          }
        };

        var printer = new pdfMakePrinter(fonts)
        const docDef = contractDef(data);
        var doc = printer.createPdfKitDocument(docDef)

        var chunks = []
        var result

        doc.on('data', function (chunk) {
          chunks.push(chunk)
        });
        doc.on('end', function () {
          result = Buffer.concat(chunks)
          resolve(result);
        });
        doc.end();
      } catch (error) {
        reject(error);
      }
    });


  }
}