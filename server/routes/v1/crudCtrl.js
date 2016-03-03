
//example query string
// tags <> indicate variables (e.g. <pagesize> should be replaced with an actual number)
//?page[size]=<pageSize>    size of page
//?page[number]=<pageNumber>   page number
//?sort[<searchCriteria>]=<sort order>   sort order should be either '1' for ascending or '2' for descending
//?select=<var1>+<var2>+<var3> select only properties var1, var2, and var3
//http://localhost:3001/api/v1/events/venues?page[size]=2&page[number]=4&sort[capacity]=1&select=price+capacity+name


exports.getModelItems = function (req, res, model) {
<<<<<<< HEAD
    //checking query for where statements
=======


>>>>>>> 8024c28d866e39523edeed97009dbada8e7bab3d
    if(req.query.where) {
        req.query.where["meta.company"] = req.user.meta.company;
    }
    //use either the where statement from the query, or an empty one with just the company selector
    var where = req.query.where || {'meta.company':req.user.meta.company};
    //check for 'like' statements in query string, add to the where statement if they exist
    if(req.query.like){
        for (var key in req.query.like) {
            if (req.query.like.hasOwnProperty(key)) {
                where[key] = new RegExp(req.query.like[key], 'i');
                console.log(where[key]);
            }
        }
    }
    //create initial query
    var query = (model.find(where));
    //check for 'select' statements in the query string, add to mongoose query if they exist
    if(req.query.select){
        query.select(req.query.select);
    }
    //check for paging request in the query string
    if(req.query.page){
        query.limit(req.query.page.size);
        query.skip(req.query.page.size * (req.query.page.number - 1));
        query.sort(req.query.sort);
    }
    //check for population request in the query string
    if(req.query.populate){
        console.log(req.query.populate);
        for(var field in req.query.populate) {
            query.populate(req.query.populate[field]);
            console.log(req.query.populate[field]);
        }
    }
    query.exec(function(err, collection){
        if(err){
            res.status(500);
            return res.send({reason: err.toString()})
        }
        if (!collection.length) {
            //res.status(404);
            return res.send({noData: true, data: collection})
        }
        res.send({data:collection});


    });
};


// exports.getModelItems = function (req, res, model) {
//     //var select = req.query.sel || model.meta.defaultsel;
    
//     if(req.query.sel === 'qlist'){
//         mFind({'meta.company':req.user.meta.company}, model.meta.defaultsel, res, model);
//     }
//     else {
//         mFind({'meta.company':req.user.meta.company}, req.query.sel, res, model);
//     }


// }



exports.getModelItemsAndPopulate = function (req, res, model, population) {
    
    
    
    var query = model.find({'meta.company':req.user.meta.company});
    
    if (req.query.populate) {
        // foreach key populate
            //query.populate
    }
     
    
    
    query.populate(population)
    query.exec(function(err, collection){
        if(err){
            res.status(500);
            return res.send({reason: err.toString()})
        }
        if (!collection.length) {
            //res.status(404);
            return res.send({noData: true, data: collection})
        }
        res.send({data:collection});
    });

};

exports.getModelItemByIdAndPoplulate = function(req, res, model, population) {
    
    model.findOne({ _id: req.params.id, 'meta.company':req.user.meta.company })
    //.populate('contracts', 'title')
    .populate(population)
    .exec(function(err, object){
        
        if(err){
            res.status(500);
            return res.send({reason: err.toString()})
        }
        if (!object) {
            res.status(404);
            return res.send({noData: true, data: object})
        }
        res.send({data:object});
    });
};

exports.getModelItemById = function (req, res, model) {
    model.findOne({ _id: req.params.id, 'meta.company':req.user.meta.company }).exec(function(err, object){
        
        if(err){
            res.status(500);
            return res.send({reason: err.toString()})
        }
        if (!object) {
            res.status(404);
            return res.send({noData: true, data: object})
        }
        res.send({data:object});
    });
    
};

exports.createModelItem = function (req, res, model) {
    var modelItemData = req.body;
    // set the meta company
    modelItemData.meta = {company: req.user.meta.company};
    var now = Date.now();
    modelItemData.meta.dateCreated = now;
    modelItemData.meta.dateLastMod = now;
    model.create(modelItemData, function (err, modelItem) {
        if (err) {
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send({data: modelItem.toObject()});
    });
};

exports.updateModelItem = function (req, res, model, population) {
    delete req.body._id;
<<<<<<< HEAD
    console.log(model);
    model['meta.dateLastMod'] = Date.now();
=======
    req.body.meta.dateLastMod = Date.now();
>>>>>>> 8024c28d866e39523edeed97009dbada8e7bab3d
    model.findByIdAndUpdate({ _id: req.params.id }, req.body, {new: true}, function (err, modelItem) {
        if (err) {
            console.log(err);
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        
        
        if (population) {
            modelItem.populate(population, function (err, returnItem) {
                res.send({data: returnItem.toObject()});
            });
        } else {
            res.send({data: modelItem.toObject()});
        }
        
        
    });
};

exports.deleteModelItem = function (req, res, model) {
    model.remove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log("inside deleted");
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(204);
    });
};