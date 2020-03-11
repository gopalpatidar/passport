var mongoose = require('mongoose');
var schema = mongoose.Schema(
    {
        username:     {type: String},
        googleid:     { type: String },
        thumbnail:    {type:String}
    },
    {
        versionKey: false
    }
);

module.exports= mongoose.model('video', schema);