import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef, gql } from 'apollo-angular';

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


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})

export class UserlistComponent implements OnInit {
  users: any[] = [];
  postsQuery: any;

  constructor(private apollo: Apollo) { }

  ngOnInit() {

    this.postsQuery = this.apollo
      .watchQuery({
        query: GET_USERS
      })
      .valueChanges.subscribe((res: any) => {
        this.users = res?.data?.getUsers;
      })
  }

  refresh() {
    this.postsQuery.refetch()
  }
}
