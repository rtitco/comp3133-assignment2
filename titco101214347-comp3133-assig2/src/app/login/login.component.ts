import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = ""
  submitted = false

  username = ""
  password = ""

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.submitted = true
    this.message = "Login Form Submitted!"
    this.router.navigate(['/dashboard']);
  }

}
