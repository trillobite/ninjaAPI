exports.searchCustomers = function (req, res, model) {

    console.log("request");
    console.log(req.query);
   

    var searchName = {};
    // if two names, set them as first and last, if only one name,
    // search both first and last names by the give name
    if (req.query.lastName) {
        searchName = {
            $and: [
                {'firstName': new RegExp(req.query.firstName, 'i')},
                {'lastName': new RegExp(req.query.lastName, 'i')}
            ]
        };
    } else {
        searchName = {
            $or: [
                {'firstName': new RegExp(req.query.firstName, 'i')},
                {'lastName': new RegExp(req.query.firstName, 'i')}
            ]
        };
    }

    console.log("search params");
    console.log(searchName);
    model.find({ 
        $and: [
            searchName,
            // {$or:[{'firstName': new RegExp(req.query.firstName, 'i')}, {'lastName': new RegExp(req.query.lastName, 'i')}]},
            {'meta.company':req.user.company} ]}).select('firstName lastName fullName').exec(function(err, collection){
        if(err){
            res.status(500);
            return res.send({reason: err.toString()});
        }
        if (!collection.length) {
            //res.status(404);
            return res.send({noData: true, data: collection});
        }
        console.log("collection");
        console.log(collection);
        res.send({data:collection});
    });
};
