// exports.getModelItems = function (req, res, model) {
//     model.find({'meta.company':req.user.meta.company}).exec(function(err, collection){z
//         if(err){
//             res.status(500);
//             return res.send({reason: err.toString()})
//         }
//         if (!collection.length) {
//             //res.status(404);
//             return res.send({noData: true, data: collection})
//         }
//         res.send({data:collection});
//     });

// };

function mFind(company, select, res, model){
    model.find(company).select(select).exec(function(err, collection){
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
}

exports.getModelItems = function (req, res, model) {
    //var select = req.query.sel || model.meta.defaultsel;
    
    if(req.query.sel === 'qlist'){
        mFind({'meta.company':req.user.meta.company}, model.meta.defaultsel, res, model);
    }
    else {
        mFind({'meta.company':req.user.meta.company}, req.query.sel, res, model);
    }
}


exports.getModelItemsAndPopulate = function (req, res, model, population) {
    model.find({'meta.company':req.user.meta.company})
    .populate(population)
    .exec(function(err, collection){
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

exports.getModelItemById = function (req, res, model, population) {
    model.findOne({ _id: req.params.id, 'meta.company':req.user.meta.company }).exec(function(err, object){
        
        if(err){
            res.status(500);
            return res.send({reason: err.toString()})
        }
        if (!object) {
            res.status(404);
            return res.send({noData: true, data: object})
        }
        if (population) {
            object.populate(population, function(err, object) {
                return res.send({data:object});
            });
        } else {
            return res.send({data:object});
        }
        
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
    model.meta.dateLastMod = Date.now();
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