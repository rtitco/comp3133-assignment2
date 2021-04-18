const mongoose = require('mongoose');

var BookingSchema = new mongoose.Schema({
    hotel_id: Number,
    booking_date: String,
    booking_start: String,
    booking_end: String,
    user_id: Number
})

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;