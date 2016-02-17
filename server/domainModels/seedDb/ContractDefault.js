var Contract = require('mongoose').model('Contract');

function createDefaultContracts(companyId) {
    
    var items = [];
    Contract.find({}).exec(function (err, collection) {
        if(err){
            console.log(err.toString());
        }
        
        else if (collection.length === 0) {
            
            var contract1 = {
                meta: {company: companyId},
                title: "Test title",
                description: "Test description",
                date: new Date(2016, 21, 4),
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

            var contract2 = {
                meta: {company: companyId},
                title: "Test title 2",
                description: "Test description 2",
                date: new Date(2016, 5, 7),
                price: 20000,
                eventSteps: [{
                    time: 0800,
                    duration: 60,
                    description: "Test event description 2"}],
                commLog: [{
                    date: "1/12/2016",
                    commType: "email",
                    rep: "susan",
                    description: "test Description"
                }],
                status: ["Scheduled"],
                notes: "test notes 2"
            }
            
            Contract.create(contract1, contract2, function (err, item1, item2) {
                if (err) {
                    console.log('Contract default data failed: ' + err.toString());
                }
                else{
                    items.push(item1);
                    items.push(item2);
                    console.log('2 succesfully created contracts.....');
                }
            });
            
            
           
        }
        
    });
}

module.exports = createDefaultContracts;