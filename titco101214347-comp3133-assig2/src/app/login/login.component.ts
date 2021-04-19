import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { FormControl } from '@angular/forms';

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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = ""
  currentUser: any[] = []

  username = new FormControl('')
  password = new FormControl('')

  constructor(private router: Router, private apollo: Apollo) { }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.apollo
      .watchQuery({
        query: LOGIN_USER,
        variables: {
          username: this.username.value
        }
      })
      .valueChanges.subscribe((res: any) => {
        if (res.data.getUser[0] == null) {
          this.message = "Invalid Username/Password"
        }
        else {
          this.currentUser = res?.data?.getUser[0];

          if (this.password.value === res?.data?.getUser[0].password) {
            this.message = "Login Form Submitted!"
            this.router.navigate(['/dashboard']);
          }
          else {
            this.message = "Invalid Username/Password"
            this.username = new FormControl('')
            this.password = new FormControl('')
          }
        }

      })




  }

}
