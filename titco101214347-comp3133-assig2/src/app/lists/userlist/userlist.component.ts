import { Component, OnInit } from '@angular/core';
import { GraphqlService } from '../../services/graphql.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  providers: [GraphqlService]
})

export class UserlistComponent implements OnInit {
  currentUser = [] as any;
  users: any[] = [];

  constructor(private router: Router, private service: GraphqlService) { }

  ngOnInit() {
    this.currentUser = this.service.getSessionUser()
    if (this.currentUser == null) {
      this.router.navigate(['/login']);
    }
    else {
      this.service.getList("users").subscribe((res: any) => {
        this.users = res?.data?.getUsers;
      })
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
