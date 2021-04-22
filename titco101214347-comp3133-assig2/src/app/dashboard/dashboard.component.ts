import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../services/graphql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [GraphqlService]
})
export class DashboardComponent implements OnInit {
  currentUser = [] as any;
  firstname = '';

  constructor(private router: Router, private service: GraphqlService) { }

  ngOnInit() {
    this.currentUser = this.service.getSessionUser()
    if (this.currentUser == null) {
      this.router.navigate(['/login']);
    }
    else {
      this.firstname = JSON.parse(this.currentUser).firstname;
      console.log(this.currentUser)
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
