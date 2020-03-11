var mongoose = require('mongoose');
var schema = mongoose.Schema(
    {
        Gmail:     {type: String},
        firstName: { type: String },
        lastName   : { type: String },
        image:     {type:String},
        passWord :{type:String },
      //  thumbnail:'https://cdn4.iconfinder.com/data/icons/e-commerce-181/512/477_profile__avatar__man_-512.png'
    },
    {
        versionKey: false
    }
);

module.exports= mongoose.model('uservideo', schema);