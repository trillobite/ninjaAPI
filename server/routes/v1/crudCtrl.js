//example query string
// tags <> indicate variables (e.g. <pagesize> should be replaced with an actual number)
//?page[size]=<pageSize>    size of page
//?page[number]=<pageNumber>   page number
//?sort[<searchCriteria>]=<sort order>   sort order should be either '1' for ascending or '2' for descending
//?select=<var1>+<var2>+<var3> select only properties var1, var2, and var3
//http://localhost:3001/api/v1/events/venues?page[size]=2&page[number]=4&sort[capacity]=1&select=price+capacity+name


//example query string
//http://localhost:3001/api/v1/events/contracts?moreThan[price]=3000&like[notes]=this&select=name+description+menuItems+price&populate[menuItems][select]=name+descrpiton

exports.getModelItems = function (req, res, model) {

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
            }
        }
    }
    //create initial query
    if(req.params.id){
        var query = model.findOne({ _id: req.params.id, 'meta.company':req.user.meta.company });
    } else {
        var query = (model.find(where));
    }
    
    //check for 'select' statements in the query string, add to mongoose query if they exist
    if(req.query.select){
        query.select(req.query.select);
    }
    if(req.query.moreThan){
        for(var key in req.query.moreThan){
            query.where(key).gt(req.query.moreThan[key]);
        }
    }
    if(req.query.lessThan){
        for(var key in req.query.lessThan){
            query.where(key).gt(req.query.lessThan[key]);
        }
    }
    //check for paging request in the query string
    if(req.query.page){
        query.limit(req.query.page.size);
        query.skip(req.query.page.size * (req.query.page.number - 1));
        query.sort(req.query.sort);
    }
    //check for population request in the query string
    if(req.query.populate){
        for(var key in req.query.populate) {
            query.populate(key, req.query.populate[key].select);
        }
    }
    console.log(req.query);
    query.exec(function(err, collection){
        if(err){
            res.status(500);
            return res.send({reason: err.toString()})
        }
        // if (!collection.length) {
        //     //res.status(404);
        //     return res.send({noData: true, data: collection})
        // } 
        res.send({data:collection});


    });
};

exports.updateModelItem = function (req, res, model) {
    var query = model.findByIdAndUpdate({ _id: req.params.id }, req.body, {new: true});
    if(req.query.populate){
        for(var key in req.query.populate) {
            query.populate(key, req.query.populate[key].select);
        }
    }
    query.exec(function(err, collection){
        if(err){
            res.status(500);
            return res.send({reason: err.toString()})
        }
        res.send({data:collection});
    });
};

exports.getModelItemsAndPopulate = function (req, res, model, population) {
    var query = model.find({'meta.company':req.user.meta.company});
    
    if (req.query.populate) {
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

exports.getModelItemById = function (req, res, model) {
    var query = model.findOne({ _id: req.params.id, 'meta.company':req.user.meta.company });
    if(req.query.populate){
        for(var key in req.query.populate) {
            query.populate(key, req.query.populate[key].select);
        }
    }
    query.exec(function(err, object){
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

exports.createModelItem = function (req, res, model, population) {
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
        console.log(modelItem);
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
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send(204);
    });
};