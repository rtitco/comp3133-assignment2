import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { FormControl } from '@angular/forms';

const CREATE_USER = gql`
mutation AddUser($firstname: String!, $lastname: String!, $username: String!, $email: String!, $password: String!){
  addUser(
    firstname: $firstname,
    lastname: $lastname,
    username: $username,
    email: $email,
    password: $password
  ){
    firstname
    lastname
  }
}
`

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  message = ''
  firstName = new FormControl('')
  lastName = new FormControl('')
  username = new FormControl('')
  email = new FormControl('')
  password = new FormControl('')

  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        firstname: this.firstName.value,
        lastname: this.lastName.value,
        username: this.username.value,
        email: this.email.value,
        password: this.password.value
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      this.message = "New User Created."
    }, (error) => {
      this.message = "Error creating user."
      console.log("there was an error sending the query", error)
    })
  }
}
