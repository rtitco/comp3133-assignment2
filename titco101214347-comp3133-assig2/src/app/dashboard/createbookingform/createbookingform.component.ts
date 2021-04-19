import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { FormControl } from '@angular/forms';

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

@Component({
  selector: 'app-createbookingform',
  templateUrl: './createbookingform.component.html',
  styleUrls: ['./createbookingform.component.css']
})

export class CreatebookingformComponent implements OnInit {
  message = ""

  //form data
  hotel_id = new FormControl('')
  booking_start = new FormControl('')
  booking_end = new FormControl('')
  user_id = new FormControl('')

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.apollo.mutate({
      mutation: CREATE_BOOKING,
      variables: {
        hotel_id: parseInt(this.hotel_id.value),
        booking_start: this.booking_start.value,
        booking_end: this.booking_end.value,
        user_id: parseInt(this.user_id.value)
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      this.message = "Booking Success"
    }, (error) => {
      this.message = "Error creating booking."
      console.log("there was an error sending the query", error)
    })
  }
}
