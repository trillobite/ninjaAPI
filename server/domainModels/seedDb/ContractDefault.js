var Contract = require('mongoose').model('Contract');
var Q = require('q');



function createDefaultContracts(companyId) {
    console.log(companyId);
    var dfd = Q.defer();
    
    var items = [];
    Contract.find({}).exec(function (err, collection) {
        
        if (collection.length === 0) {
            
            var contract1 = {
                meta: {company: companyId},
                title: "Test title",
                description: "Test description",
                natureOfEvent: "Buffet Dinner",
                initialContactDate: new Date(2016, 21, 4),
                
                eventDate: new Date(2016, 21, 4),
                time: new Date(2016, 21, 4),
                price: 10000,
                eventSteps: [{
                    time: 0800,
                    duration: 60,
                    description: "Test event description"}],
                commLog: [{
                    date: "1/12/2016",
                    commType: "email",
                    rep: "susan",
                    description: "test Description"
                }],
                status: ["In communication"],
                notes: "test notes"
            }
            
            Contract.create(contract1, function (err, item1, item2) {
                if (err) {
                    dfd.reject(new Error(err));
                }
                items.push(item1);
                //items.push(item2);
                console.log('2 succesfully created contracts.....');
                dfd.resolve(items);
                
            });
            
            
           
        }
        
    });
    
    return dfd.promise;
}

module.exports = createDefaultContracts;