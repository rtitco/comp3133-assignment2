import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { GraphqlService } from '../../services/graphql.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [GraphqlService]

})
export class LoginComponent implements OnInit {
  message: string = ""
  currentUser: any[] = []

  username = new FormControl('')
  password = new FormControl('')

  constructor(private router: Router, private service: GraphqlService) { }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.service.checkLogin(this.username.value).subscribe((res: any) => {
      if (res.data.getUser[0] == null) {
        this.message = "Invalid Username/Password"
      }
      else {
        this.currentUser = res?.data?.getUser[0];

        if (this.password.value === res?.data?.getUser[0].password) {
          this.message = "Login Form Submitted!"
          this.currentUser = res?.data?.getUser[0];
          sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser))
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
