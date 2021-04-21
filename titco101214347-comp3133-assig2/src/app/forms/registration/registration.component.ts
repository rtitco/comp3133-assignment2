import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GraphqlService } from '../../services/graphql.service';
import { InputvalidationService } from '../../services/inputvalidation.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [GraphqlService]
})

export class RegistrationComponent implements OnInit {
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

  constructor(private service: GraphqlService, private validator: InputvalidationService) { }

  ngOnInit(): void {
  }

  onSubmit() {
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

    if (validFName && validLName && validUName && validEMail && validPWord) {
      this.service.createNewUser(
        this.firstName.value,
        this.lastName.value,
        this.username.value,
        this.email.value,
        this.password.value)
        .subscribe(({ data }) => {
          this.message = "New User Created."
        }, (error) => {
          this.message = "Error creating user."
          console.log("there was an error sending the query", error)
        })
    }
    else{
      this.message = "Error. Please ensure all fields are valid."
    }



  }
}
