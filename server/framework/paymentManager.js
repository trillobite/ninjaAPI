var request = require('request');
var q = require('q');

exports.processOneTime = function (cardInfo) {
	var deferred = q.defer();
	var options = {
		url: 'https://apitest.authorize.net/xml/v1/request.api',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		json: {
			"createTransactionRequest": {
				"merchantAuthentication": {
					"name": "6Bc9pU6nvrHW",
					"transactionKey": "879VDTN57uka7gzu"
				},
				"refId": "123456",
				"transactionRequest": {
					"transactionType": "authCaptureTransaction",
					"amount": "25",
					"payment": {
						"creditCard": {
							"cardNumber": cardInfo.cardNumber,
							"expirationDate": cardInfo.expirationDate,
							"cardCode": cardInfo.cardCode
						}
					},
					// "lineItems": {
					// 	"lineItem": {
					// 		"itemId": "1",
					// 		"name": "vase",
					// 		"description": "Cannes logo",
					// 		"quantity": "18",
					// 		"unitPrice": "45.00"
					// 	}
					// },
					// "tax": {
					// 	"amount": "4.26",
					// 	"name": "level2 tax name",
					// 	"description": "level2 tax"
					// },
					// "duty": {
					// 	"amount": "8.55",
					// 	"name": "duty name",
					// 	"description": "duty description"
					// },
					// "shipping": {
					// 	"amount": "4.26",
					// 	"name": "level2 tax name",
					// 	"description": "level2 tax"
					// },
					// "poNumber": "456654",
					// "customer": {
					// 	"id": "99999456654"
					// },
					"billTo": {
						"firstName": "Ellen",
						"lastName": "Johnson",
						"company": "Souveniropolis",
						"address": "14 Main Street",
						"city": "Pecan Springs",
						"state": "TX",
						"zip": "44628",
						"country": "USA"
					},
					"shipTo": {
						"firstName": "China",
						"lastName": "Bayles",
						"company": "Thyme for Tea",
						"address": "12 Main Street",
						"city": "Pecan Springs",
						"state": "TX",
						"zip": "44628",
						"country": "USA"
					},
					//"customerIP": "192.168.1.1",
					"transactionSettings": {
						"setting": {
							"settingName": "testRequest",
							"settingValue": "false"
						}
					}//,
					// "userFields": {
					// 	"userField": [
					// 		{
					// 			"name": "MerchantDefinedFieldName1",
					// 			"value": "MerchantDefinedFieldValue1"
					// 		},
					// 		{
					// 			"name": "favorite_color",
					// 			"value": "blue"
					// 		}
					// 	]
					// }
				}
			}
		}
	};
	
	function callback(error, response, body){
		if(!error && response.statusCode == 200) {
			console.log(body);
			deferred.resolve('success');
		} else {
			deferred.reject('i failed');
		}
	}
	
	request.post(options, callback);
	
	return deferred.promise;
};