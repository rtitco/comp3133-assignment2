import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { GraphqlService } from '../services/graphql.service';
import { InputvalidationService } from '../services/inputvalidation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [GraphqlService]
})

export class ProfileComponent implements OnInit {
  currentUser = [] as any;

  message = ''
  err_FName = ''
  err_LName = ''
  err_UName = ''
  err_EMail = ''
  err_PWord = ''

  firstName = new FormControl('')
  lastName = new FormControl('')
  username = new FormControl('')
  email = new FormControl('')
  password = new FormControl('')

  constructor(private router: Router, private service: GraphqlService, private validator: InputvalidationService) { }

  ngOnInit() {
    this.currentUser = this.service.getSessionUser()
    if (this.currentUser == null) {
      this.router.navigate(['/login']);
    }
    else {
      this.firstName.setValue(JSON.parse(this.currentUser).firstname)
      this.lastName.setValue(JSON.parse(this.currentUser).lastname)
      this.username.setValue(JSON.parse(this.currentUser).username)
      this.email.setValue(JSON.parse(this.currentUser).email)
    }
  }

  onSubmit() {
    //VALIDATION
    var validFName = false
    var validLName = false
    var validUName = false
    var validEMail = false
    var validPWord = false

    if (this.validator.validStringInput(this.firstName.value)) {
      validFName = true
      this.err_FName = ""
    }
    else {
      this.err_FName = "Invalid Name"
    }

    if (this.validator.validStringInput(this.lastName.value)) {
      validLName = true
      this.err_LName = ""
    }
    else {
      this.err_LName = "Invalid Name"
    }

    if (this.validator.validStringInput(this.username.value)) {
      validUName = true
      this.err_UName = ""
    }
    else {
      this.err_UName = "Invalid Name"
    }

    if (this.validator.validEmail(this.email.value)) {
      validEMail = true
      this.err_EMail = ""
    }
    else {
      this.err_EMail = "Invalid Email"
    }

    if (this.validator.validPassword(this.password.value)) {
      validPWord = true
      this.err_PWord = ""
    }
    else {
      this.err_PWord = "Invalid Password"
    }

    //API CALL
    if (validFName && validLName && validUName && validEMail && validPWord) {
      let userID = JSON.parse(this.currentUser).user_id

      this.service.updateUser(
        userID,
        this.firstName.value,
        this.lastName.value,
        this.username.value,
        this.email.value,
        this.password.value
      )
        .subscribe(({ data }) => {
          let updatedUser = {
            email: this.email.value,
            firstname: this.firstName.value,
            lastname: this.lastName.value,
            password: this.password.value,
            user_id: this.currentUser.user_id,
            username: this.username.value,
          }
          sessionStorage.setItem("currentUser", JSON.stringify(updatedUser))
          this.router.navigate(['/dashboard']);
        }
          , (error) => {
            this.message = "Error creating user."
            console.log("there was an error sending the query", error)
          })
    }
    else {
      this.message = "Error. Please ensure all fields are valid."
    }

  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
