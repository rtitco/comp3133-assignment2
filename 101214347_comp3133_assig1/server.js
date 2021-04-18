var express = require('express');
const mongoose = require('mongoose');

const hotelModel = require('./models/Hotel')
const userModel = require('./models/User')
const bookingModel = require('./models/Booking')

var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(
    `type Query {
        getHotels: [Hotel]
        getBookings: [Booking]
        getUsers: [User]
        getHotel(hotel_name: String, city: String): [Hotel]
    },

    type Mutation {
        addHotel(
            hotel_id: Int,
            hotel_name: String,
            street: String,
            city: String,
            postal_code: String,
            price: Int,
            email: String,
            user_id: Int
        ): Hotel,
        addBooking(
            hotel_id: Int,
            booking_date: String,
            booking_start: String,
            booking_end: String,
            user_id: Int
        ): Booking,
        addUser(
            user_id: Int,
            username: String,
            email: String,
            password: String
        ): User
    },

    type Hotel {
        hotel_id: Int,
        hotel_name: String,
        street: String,
        city: String,
        postal_code: String,
        price: Int,
        email: String,
        user_id: Int
    },
    type Booking {
        hotel_id: Int,
        booking_date: String,
        booking_start: String,
        booking_end: String,
        user_id: Int
    },
    type User {
        user_id: Int,
        username: String,
        email: String,
        password: String
    }`
);

var root = {
    getHotels: () => {
        const HotelList = hotelModel.find({})
        return HotelList
    },
    getBookings: () => {
        const BookingList = bookingModel.find({})
        return BookingList
    },
    getUsers: () => {
        const UserList = userModel.find({})
        return UserList
    },
    getHotel: (args) => {
        const hotelResult = hotelModel.find({ $or: [{ hotel_name: args.hotel_name }, { city: args.city }] })
        return hotelResult
    },
    addUser: (args) => {
        userModel.create(args, (err, res) => {
            if (err) {
                console.log("Error. No duplicates allowed.");
            }
            else {
                console.log("Entry added successfully");
            }
        })
    },
    addBooking: (args) => {
        bookingModel.create(args, (err, res) => {
            if (err) {
                console.log("Booking could not be created.")
            }
            else {
                console.log("Booking success.")
            }
        })
    }
};

mongoose.connect('mongodb+srv://rtitco:cluster_Password1!@cluster0.amhgt.mongodb.net/comp3133-assignment1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000, () => { console.log('Now listening on localhost:4000/graphql') });