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
    if(req.query.sel === 'qlist'){
        mFind({'meta.company':req.user.meta.company}, model.meta.defaultsel, res, model);
    }
    else {
        mFind({'meta.company':req.user.meta.company}, req.query.sel, res, model);
    }
}


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

exports.updateModelItem = function (req, res, model) {
    delete req.body._id;
    model.meta.dateLastMod = Date.now();
    model.findByIdAndUpdate({ _id: req.params.id }, req.body, {new: true}, function (err, modelItem) {
        if (err) {
            console.log(err);
            res.status(400);
            return res.send({ reason: err.toString() });
        }
        res.send({data: modelItem.toObject()});
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