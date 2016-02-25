var Contract = require('mongoose').model('Contract');
var Customer = require('mongoose').model('Customer');

var Q = require('q');


function createDefaultContracts(companyId, customers) {
    console.log(companyId);
    var dfd = Q.defer();
    console.log(customers);
    console.log(customers[0]._id);
    console.log('companyid' + companyId);

    var items = [];
    Contract.find({}).exec(function (err, collection) {
        if(err){
            console.log(err.toString());
        }
        
        else if (collection.length === 0) {
            
            var contract1 = {
                meta: {company: companyId},
                customer: customers[0]._id,
                eventName: "Smith Rehearsal Dinner",
                //description: "Test description",
                natureOfEvent: "Plated full service dinner",
                initialContactDate: new Date(2016, 11, 25),
                
                eventDate: new Date(2016, 11, 25),
                startTime: new Date('2016-12-26T03:00:00Z'),
                price: 10000,
                eventSteps: [{
                    time: 0800,
                    duration: 60,
                    description: "Guests arrive"}],
                commLog: [{
                    date: "1/12/2016",
                    commType: "email",
                    rep: "susan",
                    description: "test Description"
                }],
                menuItems: [{name: "made up item", description: "made up description", price: 20.95, quantity: 2}],
                status: ["In communication"],
                notes: "test notes"
            }
            
            Contract.create(contract1, function (err, item1, item2) {
                if (err) {

                    console.log(err);
                    dfd.reject(new Error(err));
                }
                items.push(item1);
                
                console.log('2 succesfully created contracts.....');
                Customer.findByIdAndUpdate(item1.customer, 
                    {$push: {contracts: item1._id}},
                    {safe: true, upsert: true}, function(err, customer){
                    if(err){
                        dfd.reject(new Error(err));
                    }
                    dfd.resolve(items);
                });
                
                
                
                

            });
            
            
           
        }
        
    });
}

module.exports = createDefaultContracts;