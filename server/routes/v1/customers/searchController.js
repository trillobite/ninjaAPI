exports.searchCustomers = function (req, res, model) {

    console.log(req.query);

    model.find({ 
        $and: [
            {$or:[{'firstName': new RegExp(req.query.name, 'i')}, {'lastName': new RegExp(req.query.name, 'i')}]},
            {'meta.company':req.user.meta.company}
        ]}).select('firstName lastName fullName').exec(function(err, collection){
        if(err){
            res.status(500);
            return res.send({reason: err.toString()})
        }
        if (!collection.length) {
            //res.status(404);
            return res.send({noData: true, data: collection})
        }
        res.send({data:collection});
    })
}