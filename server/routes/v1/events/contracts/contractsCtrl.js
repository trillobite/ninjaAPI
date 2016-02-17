var Customer = require('mongoose').model('Customer');
//var amqp = require('amqplib/callback_api');


exports.createContract = function (req, res, model) {
    var modelItemData = req.body;
    // set the meta company
    modelItemData.meta = {company: req.user.meta.company};
    model.create(modelItemData, function (err, modelItem) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        // amqp.connect('amqp://zxgwmlrj:BWDncRazqsRszcwTWMtnJ3xGlliMKD1D@hyena.rmq.cloudamqp.com/zxgwmlrj', function(err, conn){
        //     conn.createChannel(function(err, ch){
        //         var q = 'hello';
        //         ch.assertQueue(q, {durable: false});
        //         ch.sendToQueue(q, new Buffer('Hello World!'));
        //         console.log("sent hello world");
        //     });
        //     setTimeout(function(){conn})
        // });
        Customer.findByIdAndUpdate(modelItem.customer, 
            {$push: {contracts: modelItem._id}},
            {safe: true, upsert: true}, function(err, customer){
            if(err){
                res.status(400);
                return res.send({reason: err.toString(), appMessage: "Problem updating customer.contracts array"})
            }
            res.send({data: modelItem.toObject()});
        });
    });
};