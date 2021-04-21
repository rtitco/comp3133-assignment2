import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { InputvalidationService } from '../../services/inputvalidation.service';
import { GraphqlService } from '../../services/graphql.service';

@Component({
  selector: 'app-createbookingform',
  templateUrl: './createbookingform.component.html',
  styleUrls: ['./createbookingform.component.css'],
  providers: [GraphqlService]
})

export class CreatebookingformComponent implements OnInit {
  currentUser = [] as any;
  message = ""
  err_hotelID = ""
  err_checkIn = ""
  err_checkOut = ""

  //form data
  hotel_id = new FormControl('')
  booking_start = new FormControl('')
  booking_end = new FormControl('')
  user_id: any

  constructor(private router: Router, private service: GraphqlService, private validator: InputvalidationService) { }

  ngOnInit(): void {
    this.currentUser = this.service.getSessionUser()
    if (this.currentUser == null) {
      this.router.navigate(['/login']);
    }
    else {
      this.user_id = JSON.parse(this.currentUser).user_id
    }
  }

  onSubmit() {
    var validHotel = false
    var validCheckIn = false
    var validCheckOut = false
    let regex_hotelID = new RegExp(/[\d]{1,5}/)

    if (this.hotel_id.value.match(regex_hotelID) == null || this.hotel_id.value == '') {
      this.err_hotelID = "Invalid Hotel Selection"
    }
    else {
      validHotel = true
      this.err_hotelID = ""
    }

    if (this.booking_start.value == '' || this.booking_start.value == null) {
      this.err_checkIn = "Invalid Date"
    }
    else {
      validCheckIn = true
      this.err_checkIn = ""
    }

    if (this.booking_start.value == '' || this.booking_start.value == null) {
      this.err_checkOut = "Invalid Date"
    }
    else {
      validCheckOut = true
      this.err_checkOut = ""
    }


    if (validHotel && validCheckIn && validCheckOut) {
      this.service.createNewBooking(
        parseInt(this.hotel_id.value),
        this.booking_start.value,
        this.booking_end.value,
        parseInt(this.user_id.value)
      )
        .subscribe(({ data }) => {
          console.log('got data', data);
          this.message = "Booking Success"
        }, (error) => {
          this.message = "Error creating booking."
          console.log("there was an error sending the query", error)
        })
    }
    else{
      this.message = "Error. Please ensure all fields are valid."
    }

  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
