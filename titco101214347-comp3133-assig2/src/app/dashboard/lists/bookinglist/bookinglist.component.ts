import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

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


@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.css']
})
export class BookinglistComponent implements OnInit {
  bookings: any[] = [];
  postsQuery: any;

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.postsQuery = this.apollo
    .watchQuery({
      query: GET_BOOKINGS
    })
    .valueChanges.subscribe((res: any) => {
      this.bookings = res?.data?.getBookings;
    })
  }

  refresh() {
    this.postsQuery.refetch()
  }
}
