const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    user_id: Number,
    username: {
        type: String,
        required: true,
        unique: [true, "Duplicate Username Not Allowed!"]
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Duplicate Email Not Allowed!"]
    },
    password: {
        type: String,
        required: true,
    }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;