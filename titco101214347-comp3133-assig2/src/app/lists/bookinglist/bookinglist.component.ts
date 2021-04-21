import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../../services/graphql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.css'],
  providers: [GraphqlService]
})

export class BookinglistComponent implements OnInit {
  currentUser = [] as any;
  bookings: any[] = [];

  constructor(private router: Router, private service: GraphqlService) { }

  ngOnInit(): void {
    this.currentUser = this.service.getSessionUser()
    if (this.currentUser == null) {
      this.router.navigate(['/login']);
    }
    else {
      this.service.getList("bookings").subscribe((res: any) => {
        this.bookings = res?.data?.getBookings;
      })
    }
  }
  
  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
