const mongoose = require('mongoose');

var HotelSchema = new mongoose.Schema({
    hotel_id: Number,
    hotel_name: String,
    street: String,
    city: String,
    postal_code: String,
    price: Number,
    email: String,
    user_id: Number
})

const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = Hotel;