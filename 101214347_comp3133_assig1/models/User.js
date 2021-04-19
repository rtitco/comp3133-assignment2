const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    user_id: Number,
    firstname: String,
    lastname: String,
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
})

const User = mongoose.model("User", UserSchema);
module.exports = User;