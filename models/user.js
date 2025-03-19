const moongose = require ('mongoose');


const userSchema = new moongose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        requred: true,
    }
}, {timestamps : true});


const User = moongose.model("user", userSchema);

module.exports = {
    User,
}