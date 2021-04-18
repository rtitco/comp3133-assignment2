import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  message = ""

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.message = "Register Form Submitted"
  }
}
