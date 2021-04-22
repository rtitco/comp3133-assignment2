import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../../services/graphql.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-hotellist',
  templateUrl: './hotellist.component.html',
  styleUrls: ['./hotellist.component.css'],
  providers: [ GraphqlService ]
})

export class HotellistComponent implements OnInit {
  currentUser = [] as any;
  hotels: any[] = [];

  searchTerm = new FormControl('')

  constructor(private router: Router, private service: GraphqlService) { }

  ngOnInit() {
    this.currentUser = this.service.getSessionUser()
    if(this.currentUser == null){
      this.router.navigate(['/login']);
    }
    else {
      this.service.getList("hotels").subscribe((res: any) => {
        this.hotels = res?.data?.getHotels;
      })
    }
  }

  searchHotels(str: string){
    this.service.getHotel(str).subscribe((res: any) => {
      this.hotels = res?.data?.getHotel;
    })
  }

  logout(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  
}
