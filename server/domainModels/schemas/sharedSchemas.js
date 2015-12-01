var mongoose = require('mongoose');

exports.metaSchema =  {
            dateCreated: { type: Date, default: Date.now },
            dateLastMod: {type: Date, default: Date.now},
            company: {type:mongoose.Schema.Types.ObjectId, ref:'Company'} 
};