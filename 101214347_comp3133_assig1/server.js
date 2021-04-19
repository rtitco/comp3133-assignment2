var express = require('express');
var cors = require('cors');

const mongoose = require('mongoose');
const hotelModel = require('./models/Hotel')
const userModel = require('./models/User')
const bookingModel = require('./models/Booking')

var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
var app = express();

app.use(cors());

var schema = buildSchema(
    `type Query {
        getHotels: [Hotel]
        getBookings: [Booking]
        getUsers: [User]
        getHotel(hotel_name: String, city: String): [Hotel]
        getUser(username: String): [User]
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
            hotel_id: Int!,
            booking_start: String!,
            booking_end: String!,
            user_id: Int!
        ): Booking,

        addUser(
            firstname: String!,
            lastname: String!,
            username: String!,
            email: String!,
            password: String!
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
        user_id: Int,
    },
    type User {
        user_id: Int,
        firstname: String,
        lastname: String,
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
    getUser: (args) => {
        const userResult = userModel.find({ username: args.username })
        return userResult
    },
    addUser: (args) => {
        let user_count = 0
        userModel.countDocuments({}, (err, count) => {
            if (err) {
                console.log("error counting")
            }
            else {
                user_count = count
                let newUser = new userModel({
                    user_id: user_count + 1,
                    firstname: args.firstname,
                    lastname: args.lastname,
                    username: args.username,
                    email: args.email,
                    password: args.password
                })
                newUser.save((err, res) => {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Entry added successfully");
                    }
                })
            }
        })
    },
    addBooking: (args) => {
        let booking_count = 0
        let currentDate = new Date().toISOString().split('T')[0].toString()

        bookingModel.countDocuments({}, (err, count) => {
            if (err) {
                console.log("Error Counting DB")
            }
            else {
                booking_count = count
                let newBooking = new bookingModel({
                    hotel_id: args.hotel_id,
                    booking_date: currentDate,
                    booking_start: args.booking_start,
                    booking_end: args.booking_end,
                    user_id: args.user_id
                })
                console.log(newBooking)
                newBooking.save((err, res) => {
                    if (err) {
                        console.log("Booking could not be created.")
                    }
                    else {
                        console.log("Booking success.", res)
                    }
                })
            }
        })

    }
};

mongoose.connect('mongodb+srv://rtitco:cluster_Password1!@cluster0.amhgt.mongodb.net/comp3133-assignment1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000, () => { console.log('Now listening on localhost:4000/graphql') });