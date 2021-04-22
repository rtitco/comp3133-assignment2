import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

//QUERIES
const GET_BOOKINGS = gql`
query getBookings{
  getBookings{
    booking_start
    booking_end
    user_id
    hotel_id
  }
}
`
const GET_USERS = gql`
query getUsers{
  getUsers{
    user_id
    firstname
    lastname
    email
    username
  }
}
`
const GET_HOTELS = gql`
query getHotels{
  getHotels{
    hotel_id
    hotel_name
    street
    city
    price
    postal_code
    email
  }
}
`
const FIND_HOTEL = gql`
query getHotel( $searchTerm: String ){
  getHotel(searchTerm: $searchTerm){
    hotel_id
    hotel_name
    street
    city
    price
    postal_code
    email
  }
}
`
const LOGIN_USER = gql`
query getUser($username: String!){
  getUser(
    username: $username,
  ){
    user_id
    firstname
    lastname
    email
    username
    password
  }
}
`

//MUTATIONS
const CREATE_BOOKING = gql`
mutation AddUser($hotel_id: Int!, $booking_start: String!, $booking_end: String!, $user_id: Int!){
  addBooking(
    hotel_id: $hotel_id,
    booking_start: $booking_start,
    booking_end: $booking_end,
    user_id: $user_id,
  ){
    hotel_id
    booking_date
    booking_start
    booking_end
    user_id
  }
}
`
const CREATE_USER = gql`
mutation AddUser($firstname: String!, $lastname: String!, $username: String!, $email: String!, $password: String!){
  addUser(
    firstname: $firstname,
    lastname: $lastname,
    username: $username,
    email: $email,
    password: $password
  )
}
`

const UPDATE_USER = gql`
mutation UpdateUser(
  $myid: Int, 
  $firstname: String, 
  $lastname: String, 
  $username: String, 
  $email: String, 
  $password: String
  ){
  updateUser(
    myid: $myid,
    firstname: $firstname,
    lastname: $lastname,
    username: $username,
    email: $email,
    password: $password
  ){
    firstname
    lastname
  }
}
`

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  resultArray: any[] = []

  constructor(private apollo: Apollo) { }

  getSessionUser(){
    return sessionStorage.getItem("currentUser")
  }

  //GET QUERIES
  getList(listType: string){
    let gqlquery: any;

    if (listType == "bookings"){
      gqlquery = GET_BOOKINGS
    }
    else if (listType == "hotels"){
      gqlquery = GET_HOTELS
    }
    else if (listType == "users"){
      gqlquery = GET_USERS
    }

    return this.apollo
    .watchQuery({
      query: gqlquery
    })
    .valueChanges
  }

  getHotel(searchTerm: string){
    return this.apollo
      .watchQuery({
        query: FIND_HOTEL,
        variables: {
          searchTerm: searchTerm
        }
      })
      .valueChanges
  }

  checkLogin(usernameInput: string){
    return this.apollo
      .watchQuery({
        query: LOGIN_USER,
        variables: {
          username: usernameInput
        }
      })
      .valueChanges
  }

  //Mutate Queries
  createNewUser(fname: string, lname: string, username: string, email: string, password: string){
    return this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        firstname: fname,
        lastname: lname,
        username: username,
        email: email,
        password: password
      }
    })
  }

  createNewBooking(hotel_id: number, booking_start: string, booking_end: string, user_id: number){
    return this.apollo.mutate({
      mutation: CREATE_BOOKING,
      variables: {
        hotel_id: hotel_id,
        booking_start: booking_start,
        booking_end: booking_end,
        user_id: user_id
      }
    })
  }

  updateUser(
    myid: number, 
    fname: string, 
    lname: string, 
    username: string, 
    email: string, 
    password: string
    ){

    return this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: {
        myid: myid,
        firstname: fname,
        lastname: lname,
        username: username,
        email: email,
        password: password
      }
    })
  }

}
