const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.String,
        required : true,
        unique: true
    },
    password:{
        type: mongoose.Schema.Types.String,
        required : true
    },
    role:{
        type: mongoose.Schema.Types.String,
        enum: ["GeneralUser","Admin"],
        required : true
    }

})

const User = mongoose.model("User", UserSchema);
module.exports = {User};