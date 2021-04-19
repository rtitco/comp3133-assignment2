import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-hotellist',
  templateUrl: './hotellist.component.html',
  styleUrls: ['./hotellist.component.css']
})
export class HotellistComponent implements OnInit {
  hotels: any[] = [];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
      {
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
      })
      .valueChanges.subscribe((res: any) => {
        this.hotels = res?.data?.getHotels;
      })
  }

}
